import { VERSION } from '../version';

export type Runtime = 'node' | 'bun' | 'deno' | 'workers' | 'browser' | 'unknown';

/**
 * Detects the JavaScript runtime the SDK is executing in. Used by the
 * User-Agent header and the browser-refusal check at construct time. The
 * checks are ordered most-specific first so a Bun process is reported as
 * `bun`, not `node`, even though `process` is defined in both.
 */
export function detectRuntime(): Runtime {
  const g = globalThis as Record<string, unknown>;

  if (typeof g['Bun'] !== 'undefined') return 'bun';
  if (typeof g['Deno'] !== 'undefined') return 'deno';

  // Cloudflare Workers and similar edge runtimes expose a navigator.userAgent
  // string starting with "Cloudflare-Workers" but no `process` object.
  const nav = g['navigator'] as { userAgent?: string } | undefined;
  if (
    typeof nav?.userAgent === 'string'
    && /Cloudflare-Workers|Vercel-Edge|Netlify Edge|workerd/i.test(nav.userAgent)
  ) {
    return 'workers';
  }

  // Heuristic for browsers: window + document. Workers has neither; Node
  // has neither. Excluding the workers branch above, this is reliable.
  if (typeof g['window'] !== 'undefined' && typeof g['document'] !== 'undefined') {
    return 'browser';
  }

  if (typeof g['process'] !== 'undefined' && typeof (g['process'] as { versions?: { node?: string } }).versions?.node === 'string') {
    return 'node';
  }

  return 'unknown';
}

/**
 * Builds the SDK's User-Agent header. Format:
 *   `cryptflare-sdk-ts/<version> (<runtime>; <extra>)`
 * The `extra` portion is supplied by the embedding application (e.g. the
 * CLI passes `cli/0.1.0`) so analytics and rate-limit logs can attribute
 * traffic to the right surface.
 */
export function getUserAgent(suffix?: string): string {
  const runtime = detectRuntime();
  const base = `cryptflare-sdk-ts/${VERSION} (${runtime})`;
  return suffix ? `${base} ${suffix}` : base;
}
