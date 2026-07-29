/**
 * Pins the dynamic-secrets request contract against the API routes.
 *
 * `issueLease` used to POST to `/leases` with the config id in the body. No
 * such route exists - `/leases` is the GET listing - so issuing a lease through
 * the SDK never worked. `renewLease` sent `ttlSeconds` where the API reads
 * `increment`; zod strips unknown keys, so the extension was silently dropped
 * and every renewal quietly used the server default.
 *
 * Neither was caught by the cross-language parity audit, which compares the
 * SDKs to each other rather than to the API. These assertions compare against
 * the routes as defined in apps/api/src/routes/dynamic-secrets/index.ts.
 */

import { describe, it, expect } from 'vitest';

import { CryptFlare } from '../../src/index';
import { makeFetchMock } from '../helpers/fetch-mock';

const ORG = 'org_1';
const BASE = `/v1/organisations/${ORG}/dynamic-secrets`;

function client(status = 200, body: unknown = {}) {
  const { fetch, calls } = makeFetchMock([{ status, body }]);
  return { client: new CryptFlare({ apiKey: 'cf_pat_x', fetch, retry: false, organisation: ORG }), calls };
}

describe('dynamic secrets request contract', () => {
  it('issues a lease against /configs/:configId/lease', async () => {
    const { client: c, calls } = client(201, { leaseId: 'l_1' });
    await c.dynamicSecrets.issueLease({ configId: 'cfg_1' });

    expect(new URL(calls[0]!.url).pathname).toBe(`${BASE}/configs/cfg_1/lease`);
    expect(calls[0]!.method).toBe('POST');
  });

  it('puts ttl in the body, not ttlSeconds', async () => {
    const { client: c, calls } = client(201, {});
    await c.dynamicSecrets.issueLease({ configId: 'cfg_1', ttl: 900 });

    const body = JSON.parse(String(calls[0]!.body));
    expect(body).toEqual({ ttl: 900 });
    // The old field name would be stripped by the server's schema, so a
    // requested TTL would silently become the default.
    expect(body).not.toHaveProperty('ttlSeconds');
  });

  it('does not send the config id in the body - it belongs in the path', async () => {
    const { client: c, calls } = client(201, {});
    await c.dynamicSecrets.issueLease({ configId: 'cfg_1', ttl: 60 });
    expect(JSON.parse(String(calls[0]!.body))).not.toHaveProperty('configId');
  });

  it('supports response wrapping', async () => {
    const { client: c, calls } = client(201, {});
    await c.dynamicSecrets.issueLease({ configId: 'cfg_1', wrap: { ttl: 60 } });
    expect(JSON.parse(String(calls[0]!.body))).toEqual({ wrap: { ttl: 60 } });
  });

  it('omits an unset ttl rather than sending undefined', async () => {
    const { client: c, calls } = client(201, {});
    await c.dynamicSecrets.issueLease({ configId: 'cfg_1' });
    expect(JSON.parse(String(calls[0]!.body))).toEqual({});
  });

  it('renews with increment, not ttlSeconds', async () => {
    const { client: c, calls } = client(200, {});
    await c.dynamicSecrets.renewLease({ leaseId: 'l_1', increment: 300 });

    expect(new URL(calls[0]!.url).pathname).toBe(`${BASE}/leases/l_1/renew`);
    const body = JSON.parse(String(calls[0]!.body));
    expect(body).toEqual({ increment: 300 });
    expect(body).not.toHaveProperty('ttlSeconds');
  });

  it('encodes ids that would otherwise break the path', async () => {
    const { client: c, calls } = client(201, {});
    await c.dynamicSecrets.issueLease({ configId: 'cfg/../evil' });
    expect(new URL(calls[0]!.url).pathname).toContain('cfg%2F..%2Fevil');
  });

  it('keeps the remaining lease routes on their documented paths', async () => {
    for (const [run, expected, method] of [
      [(c: CryptFlare) => c.dynamicSecrets.listLeases({}), `${BASE}/leases`, 'GET'],
      [(c: CryptFlare) => c.dynamicSecrets.getLease({ leaseId: 'l_1' }), `${BASE}/leases/l_1`, 'GET'],
      [(c: CryptFlare) => c.dynamicSecrets.revokeLease({ leaseId: 'l_1' }), `${BASE}/leases/l_1`, 'DELETE'],
      [(c: CryptFlare) => c.dynamicSecrets.listConfigs({}), `${BASE}/configs`, 'GET'],
    ] as const) {
      const { client: c, calls } = client(200, {});
      await run(c);
      expect(new URL(calls[0]!.url).pathname).toBe(expected);
      expect(calls[0]!.method).toBe(method);
    }
  });
});
