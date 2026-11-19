import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type { DataRegionStatusResponse, SetDataRegionResponse } from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/data-region`

/** Org-level data residency. */
export class DataResidency extends APIResource {
  /** `POST /v1/organisations/:org/data-region`. Requires `org:update`. */
  setRegion(
    input: OrgInput & { region: string },
    options?: RequestOptions,
  ): Promise<SetDataRegionResponse> {
    const org = this.resolveOrg(input)
    return this.request<SetDataRegionResponse>(
      { method: 'POST', path: `${base(org)}`, body: { region: input.region } },
      options,
    )
  }

  /** `GET /v1/organisations/:org/data-region/status`. Requires `org:read`. */
  getStatus(input: OrgInput = {}, options?: RequestOptions): Promise<DataRegionStatusResponse> {
    return this.request<DataRegionStatusResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/status` },
      options,
    )
  }
}
