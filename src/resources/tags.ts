import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type { OrgTagsResponse, ResourceTagsResponse, TagInput, TagMutationResponse } from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/tags`

/** Tags. */
export class Tags extends APIResource {
  /** `GET /v1/organisations/:org/tags`. Requires `tags:read`. */
  list(
    input: OrgInput & { resourceType?: string; resourceId?: string } = {},
    options?: RequestOptions,
  ): Promise<ResourceTagsResponse> {
    const org = this.resolveOrg(input)
    const query: Record<string, string> = {}
    if (input.resourceType !== undefined) query['resourceType'] = input.resourceType
    if (input.resourceId !== undefined) query['resourceId'] = input.resourceId
    return this.request<ResourceTagsResponse>({ method: 'GET', path: base(org), query }, options)
  }

  /** `GET /v1/organisations/:org/tags/org`. Requires `tags:read`. */
  listOrg(input: OrgInput = {}, options?: RequestOptions): Promise<OrgTagsResponse> {
    return this.request<OrgTagsResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/org` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/tags` - applies `tag` to one resource. Requires `tags:write`. */
  create(input: OrgInput & TagInput, options?: RequestOptions): Promise<TagMutationResponse> {
    const org = this.resolveOrg(input)
    const body: TagInput = {
      resourceType: input.resourceType,
      resourceId: input.resourceId,
      tag: input.tag,
    }
    return this.request<TagMutationResponse>({ method: 'POST', path: base(org), body }, options)
  }

  /**
   * `DELETE /v1/organisations/:org/tags` - removes `tag` from one resource.
   * Tags have no ID; the resource and tag name identify the row. Requires `tags:delete`.
   */
  delete(input: OrgInput & TagInput, options?: RequestOptions): Promise<TagMutationResponse> {
    const org = this.resolveOrg(input)
    const body: TagInput = {
      resourceType: input.resourceType,
      resourceId: input.resourceId,
      tag: input.tag,
    }
    return this.request<TagMutationResponse>({ method: 'DELETE', path: base(org), body }, options)
  }
}
