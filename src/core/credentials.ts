import { ConfigurationError } from './errors';
import type { ClientOptions, Credential } from '../types/options';

const ENV_KEYS = ['CRYPTFLARE_API_KEY', 'CRYPTFLARE_SERVICE_TOKEN'] as const;

/**
 * Resolves the construct-time credential. Exactly one of `apiKey`,
 * `serviceToken`, or `getToken` must be supplied; alternatively, when none
 * are passed, falls back to env vars in `node` / `bun` / `deno` runtimes.
 * Workers do not expose `process.env` in the global scope, so an explicit
 * option is required there - returns `null` here and the constructor
 * surfaces the configuration error.
 */
export function resolveCredential(options: ClientOptions): Credential {
  const supplied = [
    options.apiKey !== undefined,
    options.serviceToken !== undefined,
    options.getToken !== undefined,
  ].filter(Boolean).length;

  if (supplied > 1) {
    throw new ConfigurationError(
      'Pass exactly one of `apiKey`, `serviceToken`, or `getToken` - they are mutually exclusive.',
    );
  }

  if (options.apiKey !== undefined) {
    assertNonEmpty(options.apiKey, 'apiKey');
    return { kind: 'apiKey', value: options.apiKey };
  }
  if (options.serviceToken !== undefined) {
    assertNonEmpty(options.serviceToken, 'serviceToken');
    return { kind: 'serviceToken', value: options.serviceToken };
  }
  if (options.getToken !== undefined) {
    return { kind: 'getToken', value: options.getToken };
  }

  // Env-var fallback. `process` is not on the global scope in browsers or
  // Workers; access via `globalThis` plus a structural cast keeps the SDK
  // from depending on @types/node and from throwing ReferenceError on
  // edge runtimes that lack `process` entirely.
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  if (proc?.env) {
    for (const key of ENV_KEYS) {
      const value = proc.env[key];
      if (typeof value === 'string' && value.length > 0) {
        return key === 'CRYPTFLARE_API_KEY'
          ? { kind: 'apiKey', value }
          : { kind: 'serviceToken', value };
      }
    }
  }

  throw new ConfigurationError(
    'No credential supplied. Pass `apiKey`, `serviceToken`, or `getToken`, or set CRYPTFLARE_API_KEY / CRYPTFLARE_SERVICE_TOKEN.',
  );
}

/** Resolves `getToken` once per request; returns `value` directly otherwise. */
export async function fetchBearerToken(credential: Credential): Promise<string> {
  if (credential.kind === 'getToken') {
    const value = await credential.value();
    assertNonEmpty(value, 'getToken result');
    return value;
  }
  return credential.value;
}

function assertNonEmpty(value: string, label: string): void {
  if (typeof value !== 'string' || value.length === 0) {
    throw new ConfigurationError(`${label} must be a non-empty string.`);
  }
}
