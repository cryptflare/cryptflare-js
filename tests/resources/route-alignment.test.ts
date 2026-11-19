import { describe, expect, it } from 'vitest'

import { CryptFlare } from '@/index'
import { makeFetchMock } from '@tests/helpers/fetch-mock'
import type { RecordedRequest } from '@tests/helpers/fetch-mock'

const BASE = 'https://api.cryptflare.com'
const ORG = `${BASE}/v1/organisations/acme`

/**
 * Method, URL and body for every resource method whose route was realigned
 * with `apps/api/src/routes/**`. Each expectation is the route the API
 * mounts, so a drift on either side fails here first.
 */
function makeClient(body: unknown = {}) {
  const { fetch: f, calls } = makeFetchMock([{ status: 200, body }])
  const client = new CryptFlare({
    apiKey: 'cf_pat_abc',
    fetch: f,
    retry: false,
    organisation: 'acme',
  })
  return { client, calls }
}

function only(calls: RecordedRequest[]): RecordedRequest {
  expect(calls).toHaveLength(1)
  const call = calls[0]
  if (!call) throw new Error('no request recorded')
  return call
}

function jsonBody(call: RecordedRequest): unknown {
  return call.body === undefined ? undefined : JSON.parse(call.body)
}

describe('auth', () => {
  it('requestOtp -> POST /v1/auth/login', async () => {
    const { client, calls } = makeClient({ requestId: 'r1' })
    await client.auth.requestOtp({ email: 'a@b.co', turnstileToken: 't' })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${BASE}/v1/auth/login`)
    expect(jsonBody(call)).toEqual({ email: 'a@b.co', turnstileToken: 't' })
  })

  it('verifyOtp -> POST /v1/auth/verify', async () => {
    const { client, calls } = makeClient()
    await client.auth.verifyOtp({ requestId: 'r1', code: '123456' })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${BASE}/v1/auth/verify`)
    expect(jsonBody(call)).toEqual({ requestId: 'r1', code: '123456' })
  })

  it('verifyTotp -> POST /v1/auth/verify-totp', async () => {
    const { client, calls } = makeClient()
    await client.auth.verifyTotp({ pendingLoginToken: 'plt_1', code: '654321' })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${BASE}/v1/auth/verify-totp`)
    expect(jsonBody(call)).toEqual({ pendingLoginToken: 'plt_1', code: '654321' })
  })
})

describe('cli', () => {
  it('checkDeviceCode -> GET /v1/cli/check/:userCode', async () => {
    const { client, calls } = makeClient({ valid: true })
    await client.cli.checkDeviceCode({ userCode: 'ABCD-EFGH' })
    const call = only(calls)
    expect(call.method).toBe('GET')
    expect(call.url).toBe(`${BASE}/v1/cli/check/ABCD-EFGH`)
    expect(call.body).toBeUndefined()
  })

  it('approveDevice -> POST /v1/cli/approve', async () => {
    const { client, calls } = makeClient({ success: true })
    await client.cli.approveDevice({ userCode: 'ABCD-EFGH' })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${BASE}/v1/cli/approve`)
    expect(jsonBody(call)).toEqual({ userCode: 'ABCD-EFGH' })
  })

  it('pollToken -> POST /v1/cli/token', async () => {
    const { client, calls } = makeClient()
    await client.cli.pollToken({ deviceCode: '00000000-0000-4000-8000-000000000000' })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${BASE}/v1/cli/token`)
    expect(jsonBody(call)).toEqual({ deviceCode: '00000000-0000-4000-8000-000000000000' })
  })
})

describe('integrations', () => {
  const byId: Array<[string, (c: CryptFlare) => Promise<unknown>, string]> = [
    [
      'awsFederation',
      (c) => c.integrations.awsFederation({ integrationId: 'int_1' }),
      'aws-federation',
    ],
    [
      'listAwsSecrets',
      (c) => c.integrations.listAwsSecrets({ integrationId: 'int_1' }),
      'aws-secrets',
    ],
    [
      'gcpFederation',
      (c) => c.integrations.gcpFederation({ integrationId: 'int_1' }),
      'gcp-federation',
    ],
    [
      'listGcpSecrets',
      (c) => c.integrations.listGcpSecrets({ integrationId: 'int_1' }),
      'gcp-secrets',
    ],
    [
      'listAzureVaults',
      (c) => c.integrations.listAzureVaults({ integrationId: 'int_1' }),
      'vaults',
    ],
    [
      'listCloudflareWorkers',
      (c) => c.integrations.listCloudflareWorkers({ integrationId: 'int_1' }),
      'workers',
    ],
    [
      'listK8sNamespaces',
      (c) => c.integrations.listK8sNamespaces({ integrationId: 'int_1' }),
      'namespaces',
    ],
    [
      'listNetlifySites',
      (c) => c.integrations.listNetlifySites({ integrationId: 'int_1' }),
      'sites',
    ],
    [
      'listRailwayProjects',
      (c) => c.integrations.listRailwayProjects({ integrationId: 'int_1' }),
      'railway-projects',
    ],
    [
      'listVercelProjects',
      (c) => c.integrations.listVercelProjects({ integrationId: 'int_1' }),
      'projects',
    ],
    [
      'listRepositories',
      (c) => c.integrations.listRepositories({ integrationId: 'int_1' }),
      'repositories',
    ],
  ]

  for (const [name, call, suffix] of byId) {
    it(`${name} -> GET /integrations/:id/${suffix}`, async () => {
      const { client, calls } = makeClient({ data: [] })
      await call(client)
      const req = only(calls)
      expect(req.method).toBe('GET')
      expect(req.url).toBe(`${ORG}/integrations/int_1/${suffix}`)
      expect(req.body).toBeUndefined()
    })
  }

  it('listRepositories forwards q and limit as query params', async () => {
    const { client, calls } = makeClient({ data: [] })
    await client.integrations.listRepositories({ integrationId: 'int_1', q: 'api', limit: 20 })
    expect(only(calls).url).toBe(`${ORG}/integrations/int_1/repositories?q=api&limit=20`)
  })

  it('registerAzure -> POST /integrations/azure/consent-url with no body', async () => {
    const { client, calls } = makeClient({ data: { url: 'https://login', state: 's' } })
    await client.integrations.registerAzure()
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${ORG}/integrations/azure/consent-url`)
    expect(call.body).toBeUndefined()
  })

  it('githubCallback -> POST /integrations/github/callback with installationId and state', async () => {
    const { client, calls } = makeClient({ data: {} })
    await client.integrations.githubCallback({ installationId: 42, state: 'signed' })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${ORG}/integrations/github/callback`)
    expect(jsonBody(call)).toEqual({ installationId: 42, state: 'signed' })
  })
})

describe('onboarding', () => {
  it('verifyCheckout -> POST /v1/onboarding/verify-checkout', async () => {
    const { client, calls } = makeClient({
      verified: true,
      pending: false,
      plan: 'pro',
      subscriptionId: null,
    })
    await client.onboarding.verifyCheckout({ sessionId: 'cs_1' })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${BASE}/v1/onboarding/verify-checkout`)
    expect(jsonBody(call)).toEqual({ sessionId: 'cs_1' })
  })
})

describe('organisations', () => {
  it('checkSlug -> GET /v1/organisations/check-slug/:slug and returns the bare body', async () => {
    const { client, calls } = makeClient({ available: true })
    const result = await client.organisations.checkSlug({ slug: 'new-co' })
    const call = only(calls)
    expect(call.method).toBe('GET')
    expect(call.url).toBe(`${BASE}/v1/organisations/check-slug/new-co`)
    expect(result).toEqual({ available: true })
  })

  it('toggleFeature -> POST /v1/organisations/:org/features with feature and enabled', async () => {
    const { client, calls } = makeClient({ success: true, feature: 'ai', enabled: true })
    const result = await client.organisations.toggleFeature({ feature: 'ai', enabled: true })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${ORG}/features`)
    expect(jsonBody(call)).toEqual({ feature: 'ai', enabled: true })
    expect(result).toEqual({ success: true, feature: 'ai', enabled: true })
  })

  it('getFeatures returns the bare flags body', async () => {
    const flags = { aiEnabled: true, eventsEnabled: false }
    const { client, calls } = makeClient(flags)
    const result = await client.organisations.getFeatures()
    expect(only(calls).url).toBe(`${ORG}/features`)
    expect(result).toEqual(flags)
  })

  it('resendInvitation returns the bare success body', async () => {
    const { client, calls } = makeClient({ success: true, emailSent: true })
    const result = await client.organisations.resendInvitation({ id: 'inv_1' })
    expect(only(calls).url).toBe(`${ORG}/members/invitations/inv_1/resend`)
    expect(result).toEqual({ success: true, emailSent: true })
  })
})

describe('rotationPolicies', () => {
  const scope = { workspace: 'my-app', environment: 'production', key: 'DB_URL' }
  const path = `${ORG}/my-app/production/DB_URL/rotation-policy`

  it('get -> GET /v1/organisations/:org/:ws/:env/:key/rotation-policy', async () => {
    const { client, calls } = makeClient({ data: null })
    const result = await client.rotationPolicies.get(scope)
    const call = only(calls)
    expect(call.method).toBe('GET')
    expect(call.url).toBe(path)
    expect(result).toEqual({ data: null })
  })

  it('create -> POST /v1/organisations/:org/:ws/:env/:key/rotation-policy', async () => {
    const { client, calls } = makeClient({ data: {} })
    await client.rotationPolicies.create({ ...scope, intervalDays: 30, generateLength: 40 })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(path)
    expect(jsonBody(call)).toEqual({ intervalDays: 30, generateLength: 40 })
  })
})

describe('sso', () => {
  it('oidcCallback -> GET /v1/auth/sso/callback/oidc', async () => {
    const { client, calls } = makeClient()
    await client.sso.oidcCallback({ code: 'c', state: 's' })
    const call = only(calls)
    expect(call.method).toBe('GET')
    expect(call.url).toBe(`${BASE}/v1/auth/sso/callback/oidc?code=c&state=s`)
  })
})

describe('status', () => {
  it('checkUnsubscribe -> POST /v1/status/unsubscribe/check', async () => {
    const { client, calls } = makeClient({ email: 'a@b.co', subscribed: true })
    await client.status.checkUnsubscribe({ token: 'tok' })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${BASE}/v1/status/unsubscribe/check`)
    expect(jsonBody(call)).toEqual({ token: 'tok' })
  })
})

describe('tokens', () => {
  it('create sends the workspace and environment the API requires', async () => {
    const created = {
      id: 't1',
      name: 'ci',
      token: 'cf_pat_x',
      tokenPrefix: 'cf_pat_',
      scopes: ['secrets:read'],
      expiresAt: null,
      ipAllowlist: null,
      createdAt: '2026-01-01T00:00:00Z',
    }
    const { client, calls } = makeClient({ data: created })
    await client.tokens.create({
      name: 'ci',
      workspaceId: 'ws_1',
      scopes: ['secrets:read'],
      environment: 'live',
    })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${ORG}/tokens`)
    expect(jsonBody(call)).toEqual({
      name: 'ci',
      workspaceId: 'ws_1',
      scopes: ['secrets:read'],
      environment: 'live',
    })
  })

  it('createClaimLink -> POST /v1/organisations/:org/tokens/claim-links', async () => {
    const link = { id: 'cl_1', url: 'https://x', expiresAt: '2026-01-01T00:00:00Z' }
    const { client, calls } = makeClient({ data: link })
    const result = await client.tokens.createClaimLink({
      name: 'ci',
      workspaceId: 'ws_1',
      scopes: ['secrets:read'],
      environment: 'live',
      expiresInMinutes: 10,
    })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${ORG}/tokens/claim-links`)
    expect(jsonBody(call)).toEqual({
      name: 'ci',
      workspaceId: 'ws_1',
      scopes: ['secrets:read'],
      environment: 'live',
      expiresInMinutes: 10,
    })
    expect(result).toEqual(link)
  })

  it('redeemClaim -> POST /v1/tokens/claim', async () => {
    const { client, calls } = makeClient({ data: { id: 't1' } })
    await client.tokens.redeemClaim({ code: 'abc' })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${BASE}/v1/tokens/claim`)
    expect(jsonBody(call)).toEqual({ code: 'abc' })
  })

  it('toggle returns the bare success body', async () => {
    const { client, calls } = makeClient({ success: true })
    const result = await client.tokens.toggle({ tokenId: 't1', enabled: false })
    expect(only(calls).url).toBe(`${ORG}/tokens/t1/toggle`)
    expect(result).toEqual({ success: true })
  })
})

describe('serviceTokens', () => {
  it('toggle returns the bare success body', async () => {
    const { client, calls } = makeClient({ success: true })
    const result = await client.serviceTokens.toggle({ tokenId: 'st_1', enabled: true })
    expect(only(calls).url).toBe(`${ORG}/service-tokens/st_1/toggle`)
    expect(result).toEqual({ success: true })
  })
})

describe('wellKnown', () => {
  it('jwks -> GET /.well-known/jwks.json', async () => {
    const { client, calls } = makeClient({ keys: [] })
    await client.wellKnown.jwks()
    const call = only(calls)
    expect(call.method).toBe('GET')
    expect(call.url).toBe(`${BASE}/.well-known/jwks.json`)
  })
})

describe('billing', () => {
  it('confirmSession sends the sessionId', async () => {
    const { client, calls } = makeClient({ pending: false, plan: 'pro' })
    await client.billing.confirmSession({ sessionId: 'cs_123' })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${ORG}/billing/confirm-session`)
    expect(jsonBody(call)).toEqual({ sessionId: 'cs_123' })
  })
})

describe('tags', () => {
  const tag = { resourceType: 'secret' as const, resourceId: 'sec_1', tag: 'prod' }

  it('create -> POST /tags with resourceType, resourceId and tag', async () => {
    const { client, calls } = makeClient({ data: tag })
    await client.tags.create(tag)
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${ORG}/tags`)
    expect(jsonBody(call)).toEqual(tag)
  })

  it('delete -> DELETE /tags with resourceType, resourceId and tag', async () => {
    const { client, calls } = makeClient({ data: tag })
    await client.tags.delete(tag)
    const call = only(calls)
    expect(call.method).toBe('DELETE')
    expect(call.url).toBe(`${ORG}/tags`)
    expect(jsonBody(call)).toEqual(tag)
  })
})

describe('support', () => {
  it('uploadAttachment sends multipart form data with a file field', async () => {
    const stored = { key: 'tickets/t1/x-log.txt', name: 'log.txt', size: 5, type: 'text/plain' }
    const { client, calls } = makeClient({ data: stored })
    const result = await client.support.uploadAttachment({
      ticketId: 't1',
      file: new Blob(['hello'], { type: 'text/plain' }),
      filename: 'log.txt',
    })
    const call = only(calls)
    expect(call.method).toBe('POST')
    expect(call.url).toBe(`${ORG}/support/t1/upload`)
    // fetch writes the multipart boundary itself, so the SDK must not pin a content type.
    expect(call.headers['content-type']).toBeUndefined()
    expect(call.body).toBeUndefined()
    const file = call.formData?.get('file')
    expect(file).toBeInstanceOf(Blob)
    expect((file as File).name).toBe('log.txt')
    expect(await (file as Blob).text()).toBe('hello')
    expect(result).toEqual(stored)
  })
})
