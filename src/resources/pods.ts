import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type { PodListResponse, PodResponse, PodWithAncestorsResponse } from '../types'

type PodScope = { organisation?: string; workspace?: string; environment?: string }

const podsBase = (org: string, ws: string, env: string): string =>
  `/v1/organisations/${enc(org)}/workspaces/${enc(ws)}/environments/${enc(env)}/pods`

/** Pods. Mounted at `/v1/organisations/:org/workspaces/:ws/environments/:env/pods`. */
export class Pods extends APIResource {
  /** `GET /v1/organisations/:org/workspaces/:ws/environments/:env/pods`. Requires `secrets:list`. */
  list(input: PodScope = {}, options?: RequestOptions): Promise<PodListResponse['data']> {
    const { organisation, workspace, environment } = this.resolveScope(input)
    return this.requestData<PodListResponse['data']>(
      { method: 'GET', path: podsBase(organisation, workspace, environment) },
      options,
    )
  }

  /** `GET /v1/organisations/:org/workspaces/:ws/environments/:env/pods/:id`. Requires `secrets:list`. */
  get(
    input: PodScope & { id: string },
    options?: RequestOptions,
  ): Promise<PodWithAncestorsResponse['data']> {
    const { organisation, workspace, environment } = this.resolveScope(input)
    return this.requestData<PodWithAncestorsResponse['data']>(
      {
        method: 'GET',
        path: `${podsBase(organisation, workspace, environment)}/${enc(input.id)}`,
      },
      options,
    )
  }

  /** `POST /v1/organisations/:org/workspaces/:ws/environments/:env/pods`. Requires `secrets:write`. */
  create(
    input: PodScope & { name: string; slug: string; parentId?: string | null },
    options?: RequestOptions,
  ): Promise<PodResponse['data']> {
    const { organisation, workspace, environment } = this.resolveScope(input)
    const body: Record<string, unknown> = { name: input.name, slug: input.slug }
    if (input.parentId !== undefined) body['parentId'] = input.parentId
    return this.requestData<PodResponse['data']>(
      { method: 'POST', path: podsBase(organisation, workspace, environment), body },
      options,
    )
  }

  /** `PATCH /v1/organisations/:org/workspaces/:ws/environments/:env/pods/:id`. Requires `secrets:write`. */
  update(
    input: PodScope & { id: string; name?: string; slug?: string },
    options?: RequestOptions,
  ): Promise<PodResponse['data']> {
    const { organisation, workspace, environment } = this.resolveScope(input)
    const body: Record<string, unknown> = {}
    if (input.name !== undefined) body['name'] = input.name
    if (input.slug !== undefined) body['slug'] = input.slug
    return this.requestData<PodResponse['data']>(
      {
        method: 'PATCH',
        path: `${podsBase(organisation, workspace, environment)}/${enc(input.id)}`,
        body,
      },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/workspaces/:ws/environments/:env/pods/:id`. Requires `secrets:delete`. */
  delete(
    input: PodScope & { id: string; cascade?: boolean },
    options?: RequestOptions,
  ): Promise<void> {
    const { organisation, workspace, environment } = this.resolveScope(input)
    return this.request<void>(
      {
        method: 'DELETE',
        path: `${podsBase(organisation, workspace, environment)}/${enc(input.id)}`,
        query: input.cascade !== undefined ? { cascade: input.cascade } : undefined,
      },
      options,
    )
  }
}
