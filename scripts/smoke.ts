/// <reference types="node" />
/**
 * Smoke test against a running CryptFlare API. Exercises the SDK end-to-end
 * with a real bearer token so any drift between SDK assumptions (response
 * shapes, error envelopes, cursor format) and actual API output surfaces
 * before publish.
 *
 * Run:
 *   CRYPTFLARE_API_KEY=cf_pat_xxx \
 *   CRYPTFLARE_API_URL=http://localhost:5488 \
 *   CRYPTFLARE_ORG=acme \
 *   pnpm --filter @cryptflare/sdk exec tsx scripts/smoke.ts
 *
 * Optional env:
 *   CRYPTFLARE_WORKSPACE  - workspace slug to exercise list/secrets calls
 *   CRYPTFLARE_ENV        - environment slug
 *   CRYPTFLARE_VERBOSE=1  - print full response payloads
 *
 * Exits non-zero on the first failure. Each step prints a one-line status
 * with elapsed ms so a manual run reads like a checklist.
 */
import { APIError, CryptFlare, CryptFlareError } from '../src';

const apiKey = process.env['CRYPTFLARE_API_KEY'];
const baseUrl = process.env['CRYPTFLARE_API_URL'] ?? 'http://localhost:5488';
const organisation = process.env['CRYPTFLARE_ORG'];
const workspace = process.env['CRYPTFLARE_WORKSPACE'];
const environment = process.env['CRYPTFLARE_ENV'];
const verbose = process.env['CRYPTFLARE_VERBOSE'] === '1';

if (!apiKey) {
  console.error('CRYPTFLARE_API_KEY is required.');
  process.exit(1);
}

const client = new CryptFlare({
  apiKey,
  baseUrl,
  ...(organisation ? { organisation } : {}),
  ...(workspace ? { workspace } : {}),
  ...(environment ? { environment } : {}),
  userAgentSuffix: 'smoke',
  hooks: {
    onRequest: ({ method, path, requestId }) => {
      if (verbose) console.log(`  → ${method} ${path} [${requestId}]`);
    },
    onResponse: ({ status, durationMs }) => {
      if (verbose) console.log(`  ← ${status} (${durationMs}ms)`);
    },
  },
});

type Step = { name: string; run: () => Promise<unknown> };

const steps: Step[] = [
  {
    name: 'me.get() - bearer round-trip',
    run: () => client.me.get(),
  },
  {
    name: 'auth.whoami() - direct token introspection',
    run: () => client.auth.whoami(),
  },
  {
    name: 'organisations.list() - list orgs caller belongs to',
    run: () => client.organisations.list(),
  },
];

if (organisation) {
  steps.push(
    {
      name: 'organisations.get() - resolve default org',
      run: () => client.organisations.get(),
    },
    {
      name: 'workspaces.list() - list workspaces in default org',
      run: () => client.workspaces.list(),
    },
    {
      name: 'tokens.list() - list PATs in default org',
      run: () => client.tokens.list(),
    },
  );
}

if (organisation && workspace && environment) {
  steps.push(
    {
      name: 'environments.list() - list envs',
      run: () => client.environments.list(),
    },
    {
      name: 'pods.list() - list pods',
      run: () => client.pods.list(),
    },
    {
      name: 'secrets.list() - list secrets (CursorPage iter)',
      run: async () => {
        const page = await client.secrets.list();
        const collected: string[] = [];
        let count = 0;
        for await (const secret of page) {
          collected.push(secret.key);
          count += 1;
          if (count >= 3) break;
        }
        return { sample: collected, hasMore: page.hasNextPage };
      },
    },
  );
}

steps.push({
  name: 'error mapping - GET on non-existent path returns NotFoundError',
  run: async () => {
    try {
      await client.runner.send({ method: 'GET', path: '/v1/this-path-does-not-exist' });
      throw new Error('Expected 404 but got success.');
    } catch (err) {
      if (err instanceof APIError && err.status === 404) {
        return { code: err.code, requestId: err.requestId };
      }
      throw err;
    }
  },
});

async function main(): Promise<number> {
  let failed = 0;
  for (const step of steps) {
    const t0 = Date.now();
    try {
      const result = await step.run();
      const ms = Date.now() - t0;
      console.log(`✓ ${step.name} (${ms}ms)`);
      if (verbose) console.log('  ', JSON.stringify(result, null, 2).slice(0, 500));
    } catch (err) {
      const ms = Date.now() - t0;
      failed += 1;
      if (err instanceof CryptFlareError) {
        console.error(`✗ ${step.name} (${ms}ms) - ${err.name}: ${err.message}`);
        if (err instanceof APIError) {
          console.error(`    code=${err.code} status=${err.status} requestId=${err.requestId}`);
        }
      } else {
        console.error(`✗ ${step.name} (${ms}ms) - ${(err as Error).message}`);
      }
    }
  }
  console.log(failed === 0 ? `\nAll ${steps.length} steps passed.` : `\n${failed}/${steps.length} step(s) failed.`);
  return failed === 0 ? 0 : 1;
}

main().then((code) => process.exit(code)).catch((err) => {
  console.error('Unexpected smoke failure:', err);
  process.exit(1);
});
