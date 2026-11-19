import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type { IpAllowlistResponse } from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/ip-allowlist`

/** IP allowlist for an org or token. */
export class IpAllowlist extends APIResource {
  /** `GET /v1/organisations/:org/ip-allowlist`. Requires `org:read`. */
  get(input: OrgInput = {}, options?: RequestOptions): Promise<IpAllowlistResponse> {
    return this.request<IpAllowlistResponse>(
      { method: 'GET', path: base(this.resolveOrg(input)) },
      options,
    )
  }

  /** `PUT /v1/organisations/:org/ip-allowlist`. Requires `org:update`. */
  set(
    input: OrgInput & { cidrs: string[] },
    options?: RequestOptions,
  ): Promise<IpAllowlistResponse> {
    const org = this.resolveOrg(input)
    return this.request<IpAllowlistResponse>(
      { method: 'PUT', path: base(org), body: { cidrs: input.cidrs } },
      options,
    )
  }
}
