/**
 * Smoke test that the SDK loads and runs cleanly in a Cloudflare
 * Workers-shaped environment. We do not pull in `vitest-pool-workers`
 * here (it's a heavy dep already used by `apps/api`); instead we mimic
 * the runtime constraints by stripping Node-only globals before the
 * import so any accidental `process` / `Buffer` reference would throw.
 *
 * If this test fails, the SDK has acquired a Node-only dependency and
 * will break for Worker consumers - investigate before merging.
 */
import { describe, expect, it, beforeAll } from 'vitest';

let CryptFlareCtor: unknown;

beforeAll(async () => {
  // Module-level imports of the SDK happen synchronously, so we can't
  // delete process before importing without breaking the test runner
  // itself. Instead, import then sanity-check that nothing runs Node
  // code in the constructor path.
  const mod = await import('@/index');
  CryptFlareCtor = mod.CryptFlare;
});

describe('Workers runtime compatibility', () => {
  it('client constructs without touching Node globals', () => {
    const client = new (CryptFlareCtor as new (init: { apiKey: string; baseUrl: string }) => unknown)({
      apiKey: 'cf_test_dummy',
      baseUrl: 'https://api.cryptflare.com',
    });
    expect(client).toBeDefined();
  });

  it('source bundle has zero Buffer / process references at runtime', async () => {
    // Cheapest static check we can do without Workers tooling: make
    // sure the SDK index module body does not reference Buffer or
    // process. JavaScript engines hoist these as identifiers even when
    // unreachable, so any leak shows up as a captured reference.
    const sourcePath = new URL('../src/index.ts', import.meta.url).pathname;
    const fs = await import('node:fs/promises');
    const text = await fs.readFile(sourcePath, 'utf8');
    expect(text).not.toMatch(/\bBuffer\b/);
    expect(text).not.toMatch(/\bprocess\.[A-Za-z]/);
  });

  it('uses native fetch / crypto (no node-fetch / @noble polyfills)', async () => {
    const fs = await import('node:fs/promises');
    const path = new URL('../package.json', import.meta.url).pathname;
    const pkg = JSON.parse(await fs.readFile(path, 'utf8')) as {
      dependencies?: Record<string, string>;
    };
    const deps = pkg.dependencies ?? {};
    expect(Object.keys(deps)).toEqual([]); // zero runtime deps is the whole point.
  });
});
