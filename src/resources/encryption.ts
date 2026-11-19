import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  ByokDisabledResponse,
  ByokEnabledResponse,
  ByokGeneratedKeyResponse,
  ByokStatusResponse,
} from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/encryption`

/** BYOK / customer-managed encryption keys. */
export class Encryption extends APIResource {
  /** `GET /v1/organisations/:org/encryption`. Requires organisation membership (any role; no specific permission). */
  getStatus(input: OrgInput = {}, options?: RequestOptions): Promise<ByokStatusResponse> {
    return this.request<ByokStatusResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}` },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/encryption/enable`.
   * Requires the organisation `owner` role and a plan with BYOK (checked in the handler; no permission middleware).
   */
  enable(
    input: OrgInput & { keyId: string },
    options?: RequestOptions,
  ): Promise<ByokEnabledResponse> {
    const org = this.resolveOrg(input)
    return this.request<ByokEnabledResponse>(
      { method: 'POST', path: `${base(org)}/enable`, body: { keyId: input.keyId } },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/encryption/disable`.
   * Requires the organisation `owner` role (checked in the handler; no permission middleware).
   */
  disable(input: OrgInput = {}, options?: RequestOptions): Promise<ByokDisabledResponse> {
    return this.request<ByokDisabledResponse>(
      { method: 'POST', path: `${base(this.resolveOrg(input))}/disable` },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/encryption/generate`.
   * Requires the organisation `owner` role and a plan with BYOK (checked in the handler; no permission middleware).
   */
  generateKey(
    input: OrgInput & { provider: string; alias?: string },
    options?: RequestOptions,
  ): Promise<ByokGeneratedKeyResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = { provider: input.provider }
    if (input.alias !== undefined) body['alias'] = input.alias
    return this.request<ByokGeneratedKeyResponse>(
      { method: 'POST', path: `${base(org)}/generate`, body },
      options,
    )
  }
}
