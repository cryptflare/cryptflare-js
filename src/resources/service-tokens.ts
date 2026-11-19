import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  CreatedServiceTokenResponse,
  ServiceTokenItemResponse,
  ServiceTokenListResponse,
  ServiceTokenSuccessResponse,
} from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/service-tokens`

/** Service tokens. Mounted at `/v1/organisations/:org/service-tokens`. */
export class ServiceTokens extends APIResource {
  /** `GET /v1/organisations/:org/service-tokens`. Requires `service_tokens:read`. */
  list(input: OrgInput = {}, options?: RequestOptions): Promise<ServiceTokenListResponse['data']> {
    return this.requestData<ServiceTokenListResponse['data']>(
      { method: 'GET', path: base(this.resolveOrg(input)) },
      options,
    )
  }

  /** `POST /v1/organisations/:org/service-tokens`. Requires `service_tokens:create`. */
  create(
    input: OrgInput & {
      name: string
      scopes: string[]
      workspace?: string
      environment?: string
      expiresAt?: string
    },
    options?: RequestOptions,
  ): Promise<CreatedServiceTokenResponse['data']> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = { name: input.name, scopes: input.scopes }
    if (input.workspace !== undefined) body['workspace'] = input.workspace
    if (input.environment !== undefined) body['environment'] = input.environment
    if (input.expiresAt !== undefined) body['expiresAt'] = input.expiresAt
    return this.requestData<CreatedServiceTokenResponse['data']>(
      { method: 'POST', path: base(org), body },
      options,
    )
  }

  /** `PATCH /v1/organisations/:org/service-tokens/:tokenId`. Requires `service_tokens:create`. */
  update(
    input: OrgInput & { tokenId: string; name?: string; scopes?: string[] },
    options?: RequestOptions,
  ): Promise<ServiceTokenItemResponse['data']> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {}
    if (input.name !== undefined) body['name'] = input.name
    if (input.scopes !== undefined) body['scopes'] = input.scopes
    return this.requestData<ServiceTokenItemResponse['data']>(
      { method: 'PATCH', path: `${base(org)}/${enc(input.tokenId)}`, body },
      options,
    )
  }

  /** `POST /v1/organisations/:org/service-tokens/:tokenId/toggle`. Requires `service_tokens:create`. */
  toggle(
    input: OrgInput & { tokenId: string; enabled: boolean },
    options?: RequestOptions,
  ): Promise<ServiceTokenSuccessResponse> {
    const org = this.resolveOrg(input)
    return this.request<ServiceTokenSuccessResponse>(
      {
        method: 'POST',
        path: `${base(org)}/${enc(input.tokenId)}/toggle`,
        body: { enabled: input.enabled },
      },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/service-tokens/:tokenId`. Requires `service_tokens:revoke`. */
  revoke(input: OrgInput & { tokenId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      { method: 'DELETE', path: `${base(org)}/${enc(input.tokenId)}` },
      options,
    )
  }
}
