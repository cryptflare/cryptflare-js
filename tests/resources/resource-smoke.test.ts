import { describe, expect, it } from 'vitest';

import { CryptFlare } from '@/index';
import { makeFetchMock } from '../helpers/fetch-mock';

const SCOPE = { organisation: 'acme', workspace: 'my-app', environment: 'production' };

/**
 * One round-trip per resource. Verifies the URL the SDK emits matches the
 * route table in `apps/api/src/versions/v1.ts`. Does NOT assert response
 * shape - that is covered by the per-resource tests added under task 102
 * once schemas are centralised.
 */
describe('resources URL surface', () => {
  function makeClient(responses: Array<{ status: number; body?: unknown }>) {
    const { fetch: f, calls } = makeFetchMock(responses.map((r) => ({ status: r.status, body: r.body ?? {} })));
    const client = new CryptFlare({ apiKey: 'cf_pat_abc', fetch: f, retry: false });
    return { client, calls };
  }

  it('organisations.list -> GET /v1/organisations', async () => {
    const { client, calls } = makeClient([{ status: 200 }]);
    await client.organisations.list();
    expect(calls[0]?.url).toContain('/v1/organisations');
    expect(calls[0]?.method).toBe('GET');
  });

  it('workspaces.list -> GET /v1/organisations/:org/workspaces', async () => {
    const { client, calls } = makeClient([{ status: 200 }]);
    await client.workspaces.list({ organisation: 'acme' });
    expect(calls[0]?.url).toContain('/v1/organisations/acme/workspaces');
  });

  it('environments.list -> nested under workspace', async () => {
    const { client, calls } = makeClient([{ status: 200 }]);
    await client.environments.list({ organisation: 'acme', workspace: 'my-app' });
    expect(calls[0]?.url).toContain('/v1/organisations/acme/workspaces/my-app/environments');
  });

  it('pods.list -> nested under environment', async () => {
    const { client, calls } = makeClient([{ status: 200 }]);
    await client.pods.list(SCOPE);
    expect(calls[0]?.url).toContain('/v1/organisations/acme/workspaces/my-app/environments/production/pods');
  });

  it('me.get -> GET /v1/auth/whoami', async () => {
    const { client, calls } = makeClient([{ status: 200, body: { id: 'u_1' } }]);
    await client.me.get();
    expect(calls[0]?.url).toContain('/v1/auth/whoami');
    expect(calls[0]?.method).toBe('GET');
  });

  it('serviceTokens.create -> POST /v1/organisations/:org/service-tokens', async () => {
    const { client, calls } = makeClient([{ status: 200 }]);
    await client.serviceTokens.create({ organisation: 'acme', name: 'ci', scopes: ['secrets:read'] });
    expect(calls[0]?.method).toBe('POST');
    expect(calls[0]?.url).toContain('/v1/organisations/acme/service-tokens');
  });

  it('rotationPolicies.run -> POST /v1/organisations/:org/rotation-policies/:id/run', async () => {
    const { client, calls } = makeClient([{ status: 200 }]);
    await client.rotationPolicies.run({ organisation: 'acme', policyId: 'pol_1' });
    expect(calls[0]?.url).toContain('/v1/organisations/acme/rotation-policies/pol_1/run');
  });

  it('billing.createCheckout -> POST /v1/organisations/:org/billing/checkout', async () => {
    const { client, calls } = makeClient([{ status: 200, body: { url: 'https://stripe' } }]);
    await client.billing.createCheckout({
      organisation: 'acme',
      plan: 'team',
      successUrl: 'https://x',
      cancelUrl: 'https://y',
    });
    expect(calls[0]?.url).toContain('/v1/organisations/acme/billing/checkout');
  });

  it('audit.list -> GET /v1/organisations/:org/audit with cursor', async () => {
    const { client, calls } = makeClient([{ status: 200 }]);
    await client.audit.list({ organisation: 'acme', cursor: 'abc' });
    expect(calls[0]?.url).toContain('/v1/organisations/acme/audit');
    expect(calls[0]?.url).toContain('cursor=abc');
  });

  it('status.getStatus -> GET /v1/status (no auth scope)', async () => {
    const { client, calls } = makeClient([{ status: 200 }]);
    await client.status.getStatus();
    expect(calls[0]?.url).toContain('/v1/status');
  });

  it('waitlist.join -> POST /v1/waitlist', async () => {
    const { client, calls } = makeClient([{ status: 200 }]);
    await client.waitlist.join({ email: 'a@b' });
    expect(calls[0]?.method).toBe('POST');
    expect(calls[0]?.url).toContain('/v1/waitlist');
  });

  it('cli.requestDeviceCode -> POST /v1/cli/device', async () => {
    const { client, calls } = makeClient([{ status: 200 }]);
    await client.cli.requestDeviceCode({ clientName: 'cf' });
    expect(calls[0]?.url).toContain('/v1/cli/device');
  });

  it('integrations.registerAws threads org slug', async () => {
    const { client, calls } = makeClient([{ status: 200 }]);
    await client.integrations.registerAws({ organisation: 'acme', accountId: '1234' } as never);
    expect(calls[0]?.url).toContain('/v1/organisations/acme/integrations/aws/register');
  });

  it('uses default organisation when constructor sets it', async () => {
    const { fetch: f, calls } = makeFetchMock([{ status: 200, body: {} }]);
    const client = new CryptFlare({ apiKey: 'cf_pat_abc', fetch: f, retry: false, organisation: 'defaultorg' });
    await client.organisations.get();
    expect(calls[0]?.url).toContain('/v1/organisations/defaultorg');
  });
});
