import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  DynamicAnalyticsResponse,
  DynamicConfigCreatedResponse,
  DynamicConfigListResponse,
  DynamicConfigResponse,
  DynamicConfigUpdatedResponse,
  DynamicConfigValidationResponse,
  DynamicLeaseDetailResponse,
  DynamicLeaseForceRevokedResponse,
  DynamicLeaseIssuedResponse,
  DynamicLeaseListResponse,
  DynamicLeaseRenewedResponse,
  DynamicUnwrapResponse,
} from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/dynamic-secrets`

/** Vault-style dynamic secrets: configs + leases. */
export class DynamicSecrets extends APIResource {
  /** `GET /v1/organisations/:org/dynamic-secrets/configs`. Requires `dynamic_secrets:read`. */
  listConfigs(input: OrgInput = {}, options?: RequestOptions): Promise<DynamicConfigListResponse> {
    return this.request<DynamicConfigListResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/configs` },
      options,
    )
  }

  /** `GET /v1/organisations/:org/dynamic-secrets/configs/:configId`. Requires `dynamic_secrets:read`. */
  getConfig(
    input: OrgInput & { configId: string },
    options?: RequestOptions,
  ): Promise<DynamicConfigResponse> {
    const org = this.resolveOrg(input)
    return this.request<DynamicConfigResponse>(
      { method: 'GET', path: `${base(org)}/configs/${enc(input.configId)}` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/dynamic-secrets/configs`. Requires `dynamic_secrets:manage`. */
  createConfig(
    input: OrgInput & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<DynamicConfigCreatedResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, ...body } = input
    void _o
    return this.request<DynamicConfigCreatedResponse>(
      { method: 'POST', path: `${base(org)}/configs`, body },
      options,
    )
  }

  /** `PATCH /v1/organisations/:org/dynamic-secrets/configs/:configId`. Requires `dynamic_secrets:manage`. */
  updateConfig(
    input: OrgInput & { configId: string } & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<DynamicConfigUpdatedResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, configId, ...body } = input
    void _o
    return this.request<DynamicConfigUpdatedResponse>(
      { method: 'PATCH', path: `${base(org)}/configs/${enc(configId)}`, body },
      options,
    )
  }

  /** `POST /v1/organisations/:org/dynamic-secrets/configs/:configId/validate`. Requires `dynamic_secrets:manage`. */
  validateConfig(
    input: OrgInput & { configId: string },
    options?: RequestOptions,
  ): Promise<DynamicConfigValidationResponse> {
    const org = this.resolveOrg(input)
    return this.request<DynamicConfigValidationResponse>(
      { method: 'POST', path: `${base(org)}/configs/${enc(input.configId)}/validate` },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/dynamic-secrets/configs/:configId`. Requires `dynamic_secrets:manage`. */
  deleteConfig(input: OrgInput & { configId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      { method: 'DELETE', path: `${base(org)}/configs/${enc(input.configId)}` },
      options,
    )
  }

  // -- Leases ----------------------------------------------------------------

  /**
   * POST /configs/:configId/lease - mints a fresh upstream credential.
   *
   * Previously posted to `/leases` with the config id in the body. No such
   * route exists - `/leases` is the GET listing - so issuing a lease through
   * the SDK never worked. The config id belongs in the path, and the body
   * carries only `ttl` and `wrap`.
   *
   * `ttl` is in seconds and is clamped server-side to
   * min(max_ttl, system_max_ttl, remaining lifetime of the parent token).
   * Requires `dynamic_secrets:issue`.
   */
  issueLease(
    input: OrgInput & { configId: string; ttl?: number; wrap?: { ttl?: number } },
    options?: RequestOptions,
  ): Promise<DynamicLeaseIssuedResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {}
    if (input.ttl !== undefined) body['ttl'] = input.ttl
    if (input.wrap !== undefined) body['wrap'] = input.wrap
    return this.request<DynamicLeaseIssuedResponse>(
      { method: 'POST', path: `${base(org)}/configs/${enc(input.configId)}/lease`, body },
      options,
    )
  }

  /**
   * POST /leases/:leaseId/renew - extends a lease.
   *
   * The extension field is `increment`, not `ttlSeconds`. Zod strips unknown
   * keys, so the previous name was dropped silently and every renewal used the
   * server default - a request for a specific extension appeared to succeed
   * while being ignored.
   * Requires `dynamic_secrets:issue`.
   */
  renewLease(
    input: OrgInput & { leaseId: string; increment?: number },
    options?: RequestOptions,
  ): Promise<DynamicLeaseRenewedResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {}
    if (input.increment !== undefined) body['increment'] = input.increment
    return this.request<DynamicLeaseRenewedResponse>(
      { method: 'POST', path: `${base(org)}/leases/${enc(input.leaseId)}/renew`, body },
      options,
    )
  }

  /** `GET /v1/organisations/:org/dynamic-secrets/leases`. Requires `dynamic_secrets:read`. */
  listLeases(
    input: OrgInput & { cursor?: string; configId?: string } = {},
    options?: RequestOptions,
  ): Promise<DynamicLeaseListResponse> {
    const org = this.resolveOrg(input)
    const query: Record<string, string> = {}
    if (input.cursor !== undefined) query['cursor'] = input.cursor
    if (input.configId !== undefined) query['configId'] = input.configId
    return this.request<DynamicLeaseListResponse>(
      { method: 'GET', path: `${base(org)}/leases`, query },
      options,
    )
  }

  /** `GET /v1/organisations/:org/dynamic-secrets/leases/:leaseId`. Requires `dynamic_secrets:read`. */
  getLease(
    input: OrgInput & { leaseId: string },
    options?: RequestOptions,
  ): Promise<DynamicLeaseDetailResponse> {
    const org = this.resolveOrg(input)
    return this.request<DynamicLeaseDetailResponse>(
      { method: 'GET', path: `${base(org)}/leases/${enc(input.leaseId)}` },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/dynamic-secrets/leases/:leaseId`. Requires `dynamic_secrets:issue`. */
  revokeLease(input: OrgInput & { leaseId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      { method: 'DELETE', path: `${base(org)}/leases/${enc(input.leaseId)}` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/dynamic-secrets/leases/:leaseId/force-revoke`. Requires `dynamic_secrets:manage`. */
  forceRevokeLease(
    input: OrgInput & { leaseId: string; reason?: string },
    options?: RequestOptions,
  ): Promise<DynamicLeaseForceRevokedResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {}
    if (input.reason !== undefined) body['reason'] = input.reason
    return this.request<DynamicLeaseForceRevokedResponse>(
      {
        method: 'POST',
        path: `${base(org)}/leases/${enc(input.leaseId)}/force-revoke`,
        body,
      },
      options,
    )
  }

  /** `POST /v1/organisations/:org/dynamic-secrets/unwrap/:wrapToken`. Requires `dynamic_secrets:issue`. */
  unwrapCredentials(
    input: OrgInput & { leaseId: string; wrapToken: string },
    options?: RequestOptions,
  ): Promise<DynamicUnwrapResponse> {
    const org = this.resolveOrg(input)
    return this.request<DynamicUnwrapResponse>(
      {
        method: 'POST',
        path: `${base(org)}/unwrap/${enc(input.wrapToken)}`,
        body: { wrapToken: input.wrapToken },
      },
      options,
    )
  }

  /** `GET /v1/organisations/:org/dynamic-secrets/analytics`. Requires `dynamic_secrets:read`. */
  getAnalytics(
    input: OrgInput & { configId?: string; periodDays?: number } = {},
    options?: RequestOptions,
  ): Promise<DynamicAnalyticsResponse> {
    const org = this.resolveOrg(input)
    const query: Record<string, string | number> = {}
    if (input.configId !== undefined) query['configId'] = input.configId
    if (input.periodDays !== undefined) query['periodDays'] = input.periodDays
    return this.request<DynamicAnalyticsResponse>(
      { method: 'GET', path: `${base(org)}/analytics`, query },
      options,
    )
  }
}
