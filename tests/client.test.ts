import { describe, expect, it } from 'vitest';

import { ConfigurationError, CryptFlare, RateLimitError } from '@/index';
import { makeFetchMock } from './helpers/fetch-mock';

const SCOPE = { organisation: 'acme', workspace: 'my-app', environment: 'production' } as const;

describe('CryptFlare', () => {
  it('throws ConfigurationError when no credential is provided', () => {
    const original = { ...process.env };
    delete process.env['CRYPTFLARE_API_KEY'];
    delete process.env['CRYPTFLARE_SERVICE_TOKEN'];
    try {
      expect(() => new CryptFlare({ retry: false })).toThrow(ConfigurationError);
    } finally {
      process.env = original;
    }
  });

  it('attaches Authorization header on every request', async () => {
    const { fetch: f, calls } = makeFetchMock([{ status: 200, body: { id: 'u_1' } }]);
    const client = new CryptFlare({ apiKey: 'cf_pat_abc', fetch: f, retry: false });
    await client.me.get();
    expect(calls[0]?.headers['authorization']).toBe('Bearer cf_pat_abc');
  });

  it('attaches an Idempotency-Key on POST when retries are enabled', async () => {
    const { fetch: f, calls } = makeFetchMock([{ status: 200, body: { id: 's_1', key: 'API_KEY', version: 1, createdBy: 'u', createdAt: 't', updatedAt: 't' } }]);
    const client = new CryptFlare({ apiKey: 'cf_pat_abc', fetch: f });
    await client.secrets.create({ ...SCOPE, key: 'API_KEY', value: 'hunter2' });
    expect(calls[0]?.headers['idempotency-key']).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('does not attach Idempotency-Key when retries are disabled', async () => {
    const { fetch: f, calls } = makeFetchMock([{ status: 200, body: { id: 's_1', key: 'API_KEY', version: 1, createdBy: 'u', createdAt: 't', updatedAt: 't' } }]);
    const client = new CryptFlare({ apiKey: 'cf_pat_abc', fetch: f, retry: false });
    await client.secrets.create({ ...SCOPE, key: 'API_KEY', value: 'hunter2' });
    expect(calls[0]?.headers['idempotency-key']).toBeUndefined();
  });

  it('honours a caller-supplied idempotencyKey', async () => {
    const { fetch: f, calls } = makeFetchMock([{ status: 200, body: { id: 's_1', key: 'API_KEY', version: 1, createdBy: 'u', createdAt: 't', updatedAt: 't' } }]);
    const client = new CryptFlare({ apiKey: 'cf_pat_abc', fetch: f });
    await client.secrets.create({ ...SCOPE, key: 'API_KEY', value: 'hunter2' }, { idempotencyKey: 'static-key-1' });
    expect(calls[0]?.headers['idempotency-key']).toBe('static-key-1');
  });

  it('reuses the same Idempotency-Key across retries', async () => {
    const { fetch: f, calls } = makeFetchMock([
      { status: 503, body: { error: 'INTERNAL', message: 'down' } },
      { status: 200, body: { id: 's_1', key: 'API_KEY', version: 1, createdBy: 'u', createdAt: 't', updatedAt: 't' } },
    ]);
    const client = new CryptFlare({
      apiKey: 'cf_pat_abc',
      fetch: f,
      retry: { maxAttempts: 2, initialDelayMs: 0, maxDelayMs: 0 },
    });
    await client.secrets.create({ ...SCOPE, key: 'API_KEY', value: 'hunter2' });
    expect(calls).toHaveLength(2);
    expect(calls[0]?.headers['idempotency-key']).toBe(calls[1]?.headers['idempotency-key']);
  });

  it('does not retry 401 / 403 / 404 / 422', async () => {
    for (const status of [401, 403, 404, 422]) {
      const { fetch: f, calls } = makeFetchMock([{ status, body: { error: 'X', message: 'no' } }]);
      const client = new CryptFlare({ apiKey: 'cf_pat_abc', fetch: f });
      await expect(client.me.get()).rejects.toBeInstanceOf(Error);
      expect(calls).toHaveLength(1);
    }
  });

  it('retries 503 up to maxAttempts then throws', async () => {
    const { fetch: f, calls } = makeFetchMock([
      { status: 503, body: { error: 'X', message: 'down' } },
      { status: 503, body: { error: 'X', message: 'down' } },
      { status: 503, body: { error: 'X', message: 'down' } },
    ]);
    const client = new CryptFlare({
      apiKey: 'cf_pat_abc',
      fetch: f,
      retry: { maxAttempts: 3, initialDelayMs: 0, maxDelayMs: 0 },
    });
    await expect(client.me.get()).rejects.toThrow();
    expect(calls).toHaveLength(3);
  });

  it('surfaces RateLimitError with retryAfterMs', async () => {
    const { fetch: f } = makeFetchMock([{
      status: 429,
      body: { error: 'RATE_LIMITED', message: 'slow' },
      headers: { 'retry-after': '1' },
    }, {
      status: 429,
      body: { error: 'RATE_LIMITED', message: 'slow' },
      headers: { 'retry-after': '1' },
    }]);
    const client = new CryptFlare({
      apiKey: 'cf_pat_abc',
      fetch: f,
      retry: { maxAttempts: 2, initialDelayMs: 0, maxDelayMs: 0 },
    });
    await expect(client.me.get()).rejects.toBeInstanceOf(RateLimitError);
  });

  it('iterates a paginated list across pages', async () => {
    const page1 = {
      data: [{ id: 's_1', key: 'A', version: 1, createdBy: 'u', createdAt: 't', updatedAt: 't' }],
      nextCursor: 'cursor-2',
      hasMore: true,
    };
    const page2 = {
      data: [{ id: 's_2', key: 'B', version: 1, createdBy: 'u', createdAt: 't', updatedAt: 't' }],
      nextCursor: null,
      hasMore: false,
    };
    const { fetch: f } = makeFetchMock([
      { status: 200, body: page1 },
      { status: 200, body: page2 },
    ]);
    const client = new CryptFlare({ apiKey: 'cf_pat_abc', fetch: f, retry: false });
    const collected: string[] = [];
    for await (const secret of await client.secrets.list(SCOPE)) {
      collected.push(secret.key);
    }
    expect(collected).toEqual(['A', 'B']);
  });

  it('forwards reserved headers as a config error', async () => {
    const { fetch: f } = makeFetchMock([{ status: 200, body: {} }]);
    const client = new CryptFlare({ apiKey: 'cf_pat_abc', fetch: f, retry: false });
    await expect(
      client.me.get({ headers: { Authorization: 'override' } }),
    ).rejects.toBeInstanceOf(ConfigurationError);
  });
});
