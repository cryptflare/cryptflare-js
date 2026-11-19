import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  SsoCheckResponse,
  SsoConnectionListResponse,
  SsoConnectionResponse,
  SsoConnectionToggleResponse,
  SsoGroupMappingListResponse,
  SsoGroupMappingResponse,
  SsoTestResponse,
} from '../types'

type OrgInput = { organisation?: string }
const orgBase = (org: string) => `/v1/organisations/${enc(org)}/sso`

/**
 * SSO. Auth routes (`/v1/auth/sso/*`) cover the public OIDC handshake;
 * org-scoped routes (`/v1/organisations/:org/sso/*`) cover connection
 * configuration.
 */
export class Sso extends APIResource {
  /** GET /v1/auth/sso/check?domain=... - resolve enabled provider for a domain. No authentication required. */
  checkDomain(input: { domain: string }, options?: RequestOptions): Promise<SsoCheckResponse> {
    return this.request<SsoCheckResponse>(
      { method: 'GET', path: '/v1/auth/sso/check', query: { domain: input.domain } },
      options,
    )
  }

  /** GET /v1/auth/sso/initiate?... No authentication required. */
  initiateLogin(
    input: { connectionId: string; returnTo?: string },
    options?: RequestOptions,
  ): Promise<unknown> {
    const query: Record<string, string> = { connectionId: input.connectionId }
    if (input.returnTo !== undefined) query['returnTo'] = input.returnTo
    return this.request({ method: 'GET', path: '/v1/auth/sso/initiate', query }, options)
  }

  /**
   * `GET /v1/auth/sso/callback/oidc` - finishes the OIDC handshake. The API
   * answers with a 302 redirect to the vault app, so there is no JSON body.
   * No authentication required.
   */
  oidcCallback(input: { code: string; state: string }, options?: RequestOptions): Promise<unknown> {
    return this.request(
      {
        method: 'GET',
        path: '/v1/auth/sso/callback/oidc',
        query: { code: input.code, state: input.state },
      },
      options,
    )
  }

  // -- Org-scoped connection management --------------------------------------

  /** `GET /v1/organisations/:org/sso`. Requires `sso:read`. */
  listConnections(
    input: OrgInput = {},
    options?: RequestOptions,
  ): Promise<SsoConnectionListResponse> {
    return this.request<SsoConnectionListResponse>(
      { method: 'GET', path: `${orgBase(this.resolveOrg(input))}` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/sso`. Requires `sso:manage`. */
  createConnection(
    input: OrgInput & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<SsoConnectionResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, ...body } = input
    void _o
    return this.request<SsoConnectionResponse>(
      { method: 'POST', path: `${orgBase(org)}`, body },
      options,
    )
  }

  /** `PATCH /v1/organisations/:org/sso/:connectionId`. Requires `sso:manage`. */
  updateConnection(
    input: OrgInput & { connectionId: string } & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<SsoConnectionResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, connectionId, ...body } = input
    void _o
    return this.request<SsoConnectionResponse>(
      { method: 'PATCH', path: `${orgBase(org)}/${enc(connectionId)}`, body },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/sso/:connectionId`. Requires `sso:manage`. */
  deleteConnection(
    input: OrgInput & { connectionId: string },
    options?: RequestOptions,
  ): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      { method: 'DELETE', path: `${orgBase(org)}/${enc(input.connectionId)}` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/sso/:connectionId/toggle`. Requires `sso:manage`. */
  toggleConnection(
    input: OrgInput & { connectionId: string; enabled: boolean },
    options?: RequestOptions,
  ): Promise<SsoConnectionToggleResponse> {
    const org = this.resolveOrg(input)
    return this.request<SsoConnectionToggleResponse>(
      {
        method: 'POST',
        path: `${orgBase(org)}/${enc(input.connectionId)}/toggle`,
        body: { enabled: input.enabled },
      },
      options,
    )
  }

  /** `POST /v1/organisations/:org/sso/:connectionId/test`. Requires `sso:manage`. */
  testConnection(
    input: OrgInput & { connectionId: string },
    options?: RequestOptions,
  ): Promise<SsoTestResponse> {
    const org = this.resolveOrg(input)
    return this.request<SsoTestResponse>(
      {
        method: 'POST',
        path: `${orgBase(org)}/${enc(input.connectionId)}/test`,
      },
      options,
    )
  }

  /** `GET /v1/organisations/:org/sso/:connectionId/mappings`. Requires `sso:read`. */
  listMappings(
    input: OrgInput & { connectionId: string },
    options?: RequestOptions,
  ): Promise<SsoGroupMappingListResponse> {
    const org = this.resolveOrg(input)
    return this.request<SsoGroupMappingListResponse>(
      {
        method: 'GET',
        path: `${orgBase(org)}/${enc(input.connectionId)}/mappings`,
      },
      options,
    )
  }

  /** `POST /v1/organisations/:org/sso/:connectionId/mappings`. Requires `sso:manage`. */
  createMapping(
    input: OrgInput & { connectionId: string; externalGroupId: string; role: string },
    options?: RequestOptions,
  ): Promise<SsoGroupMappingResponse> {
    const org = this.resolveOrg(input)
    return this.request<SsoGroupMappingResponse>(
      {
        method: 'POST',
        path: `${orgBase(org)}/${enc(input.connectionId)}/mappings`,
        body: { externalGroupId: input.externalGroupId, role: input.role },
      },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/sso/:connectionId/mappings/:mappingId`. Requires `sso:manage`. */
  deleteMapping(
    input: OrgInput & { connectionId: string; mappingId: string },
    options?: RequestOptions,
  ): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      {
        method: 'DELETE',
        path: `${orgBase(org)}/${enc(input.connectionId)}/mappings/${enc(input.mappingId)}`,
      },
      options,
    )
  }
}
