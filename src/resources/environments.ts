import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type { EnvironmentListResponse, EnvironmentResponse, ResolvePathResponse } from '../types'

type EnvScope = { organisation?: string; workspace?: string; environment?: string }

const wsBase = (org: string, ws: string) =>
  `/v1/organisations/${enc(org)}/workspaces/${enc(ws)}/environments`

/** Environments. Mounted at `/v1/organisations/:org/workspaces/:ws/environments`. */
export class Environments extends APIResource {
  /** `GET /v1/organisations/:org/workspaces/:ws/environments`. Requires `environments:read`. */
  list(
    input: { organisation?: string; workspace?: string } = {},
    options?: RequestOptions,
  ): Promise<EnvironmentListResponse['data']> {
    const { organisation, workspace } = this.resolveWorkspace(input)
    return this.requestData<EnvironmentListResponse['data']>(
      { method: 'GET', path: wsBase(organisation, workspace) },
      options,
    )
  }

  /** `POST /v1/organisations/:org/workspaces/:ws/environments`. Requires `environments:create`. */
  create(
    input: { organisation?: string; workspace?: string; name: string; slug: string },
    options?: RequestOptions,
  ): Promise<EnvironmentResponse['data']> {
    const { organisation, workspace } = this.resolveWorkspace(input)
    return this.requestData<EnvironmentResponse['data']>(
      {
        method: 'POST',
        path: wsBase(organisation, workspace),
        body: { name: input.name, slug: input.slug },
      },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/workspaces/:ws/environments/:environment`. Requires `environments:delete`. */
  delete(input: EnvScope = {}, options?: RequestOptions): Promise<void> {
    const { organisation, workspace, environment } = this.resolveScope(input)
    return this.request<void>(
      {
        method: 'DELETE',
        path: `${wsBase(organisation, workspace)}/${enc(environment)}`,
      },
      options,
    )
  }

  /** GET /v1/organisations/:org/workspaces/:ws/environments/:env/resolve?path=... Requires `secrets:list`. */
  resolvePath(
    input: EnvScope & { path: string },
    options?: RequestOptions,
  ): Promise<ResolvePathResponse['data']> {
    const { organisation, workspace, environment } = this.resolveScope(input)
    return this.requestData<ResolvePathResponse['data']>(
      {
        method: 'GET',
        path: `${wsBase(organisation, workspace)}/${enc(environment)}/resolve-path`,
        query: { path: input.path },
      },
      options,
    )
  }
}
