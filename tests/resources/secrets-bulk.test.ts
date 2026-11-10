/**
 * Pins the bulk secret contract against apps/api/src/routes/secrets:
 * paged reveal, and batch methods that return their finished result.
 */

import { describe, it, expect } from 'vitest';

import { CryptFlare } from '../../src/index';
import { makeFetchMock } from '../helpers/fetch-mock';

const SCOPE = { organisation: 'org_1', workspace: 'api', environment: 'dev' };
const BASE = '/v1/organisations/org_1/workspaces/api/environments/dev/secrets';

function client(responses: Array<{ status?: number; body: unknown }>) {
  const { fetch, calls } = makeFetchMock(responses.map((r) => ({ status: r.status ?? 200, body: r.body })));
  return { client: new CryptFlare({ apiKey: 'cf_pat_x', fetch, retry: false }), calls };
}

function revealPage(keys: string[], nextCursor: string | null) {
  return {
    body: {
      data: {
        secrets: keys.map((key) => ({ key, value: `v-${key}`, version: 1 })),
        missing: [],
        encoding: 'utf-8',
        nextCursor,
      },
    },
  };
}

const BATCH_RESULT = {
  jobId: 'job_1',
  status: 'completed',
  itemCount: 1,
  results: [{ key: 'API_KEY', status: 'created', version: 1 }],
  summary: { created: 1, updated: 0, deleted: 0, skipped: 0, errors: 0, total: 1 },
};

describe('secrets.revealMany', () => {
  it('sends limit and cursor in the body', async () => {
    const { client: c, calls } = client([revealPage([], null)]);
    await c.secrets.revealMany({ ...SCOPE, limit: 250, cursor: 'DB_URL' });

    expect(new URL(calls[0]!.url).pathname).toBe(`${BASE}/reveal`);
    expect(JSON.parse(String(calls[0]!.body))).toEqual({ limit: 250, cursor: 'DB_URL' });
  });

  it('never puts key names in the URL', async () => {
    const { client: c, calls } = client([revealPage(['SECRET_NAME'], null)]);
    await c.secrets.revealMany({ ...SCOPE, keys: ['SECRET_NAME'] });

    expect(calls[0]!.url).not.toContain('SECRET_NAME');
  });

  it('unwraps the data envelope and exposes nextCursor', async () => {
    const { client: c } = client([revealPage(['A_KEY'], 'A_KEY')]);
    const res = await c.secrets.revealMany(SCOPE);

    expect(res.secrets).toEqual([{ key: 'A_KEY', value: 'v-A_KEY', version: 1 }]);
    expect(res.nextCursor).toBe('A_KEY');
  });
});

describe('secrets.revealAll', () => {
  it('follows nextCursor until the last page', async () => {
    const { client: c, calls } = client([
      revealPage(['A_KEY', 'B_KEY'], 'B_KEY'),
      revealPage(['C_KEY'], null),
    ]);
    const secrets = await c.secrets.revealAll(SCOPE);

    expect(secrets.map((s) => s.key)).toEqual(['A_KEY', 'B_KEY', 'C_KEY']);
    expect(JSON.parse(String(calls[0]!.body))).toEqual({});
    expect(JSON.parse(String(calls[1]!.body))).toEqual({ cursor: 'B_KEY' });
  });

  it('stops after one page against a server that predates paging', async () => {
    const { client: c, calls } = client([
      { body: { data: { secrets: [{ key: 'A_KEY', value: 'v', version: 1 }], missing: [], encoding: 'utf-8' } } },
    ]);
    const secrets = await c.secrets.revealAll(SCOPE);

    expect(secrets).toHaveLength(1);
    expect(calls).toHaveLength(1);
  });

  it('stops when the server returns the same cursor twice', async () => {
    const { client: c, calls } = client([
      revealPage(['A_KEY'], 'A_KEY'),
      revealPage(['A_KEY'], 'A_KEY'),
    ]);
    await c.secrets.revealAll(SCOPE);

    expect(calls).toHaveLength(2);
  });

  it('passes pod and format through to every page', async () => {
    const { client: c, calls } = client([revealPage(['A_KEY'], 'A_KEY'), revealPage([], null)]);
    await c.secrets.revealAll({ ...SCOPE, podId: 'pod_1', format: 'base64' });

    expect(JSON.parse(String(calls[1]!.body))).toEqual({ podId: 'pod_1', format: 'base64', cursor: 'A_KEY' });
  });
});

describe('secrets batch methods', () => {
  it('batchCreate returns the finished result without polling', async () => {
    const { client: c, calls } = client([{ body: { data: BATCH_RESULT } }]);
    const result = await c.secrets.batchCreate({ ...SCOPE, secrets: [{ key: 'API_KEY', value: 'v' }] });

    expect(result.status).toBe('completed');
    expect(result.results[0]).toEqual({ key: 'API_KEY', status: 'created', version: 1 });
    expect(calls).toHaveLength(1);
    expect(new URL(calls[0]!.url).pathname).toBe(`${BASE}/batch/create`);
  });

  it('batchCreate sends description and metadata with each item', async () => {
    const { client: c, calls } = client([{ body: { data: BATCH_RESULT } }]);
    await c.secrets.batchCreate({
      ...SCOPE,
      secrets: [{ key: 'API_KEY', value: 'v', description: 'Stripe', metadata: { source: 'cli' } }],
    });

    expect(JSON.parse(String(calls[0]!.body))).toEqual({
      secrets: [{ key: 'API_KEY', value: 'v', description: 'Stripe', metadata: { source: 'cli' } }],
    });
  });

  it('batchUpdate posts to /batch/update and unwraps the result', async () => {
    const { client: c, calls } = client([{ body: { data: BATCH_RESULT } }]);
    const result = await c.secrets.batchUpdate({ ...SCOPE, secrets: [{ key: 'API_KEY', value: 'v2' }] });

    expect(new URL(calls[0]!.url).pathname).toBe(`${BASE}/batch/update`);
    expect(result.summary.total).toBe(1);
  });

  it('batchDelete posts the keys to /batch/delete', async () => {
    const { client: c, calls } = client([{ body: { data: BATCH_RESULT } }]);
    await c.secrets.batchDelete({ ...SCOPE, keys: ['API_KEY'] });

    expect(new URL(calls[0]!.url).pathname).toBe(`${BASE}/batch/delete`);
    expect(JSON.parse(String(calls[0]!.body))).toEqual({ keys: ['API_KEY'] });
  });
});
