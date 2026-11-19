import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type { WorkspaceListResponse, WorkspaceResponse } from '../types'

type WsScope = { organisation?: string; workspace?: string }

/** Workspaces. Mounted at `/v1/organisations/:org/workspaces`. */
export class Workspaces extends APIResource {
  /** `GET /v1/organisations/:org/workspaces`. Requires `workspaces:read`. */
  list(
    input: { organisation?: string } = {},
    options?: RequestOptions,
  ): Promise<WorkspaceListResponse['data']> {
    return this.requestData<WorkspaceListResponse['data']>(
      { method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/workspaces` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/workspaces`. Requires `workspaces:create`. */
  create(
    input: { organisation?: string; name: string; slug: string },
    options?: RequestOptions,
  ): Promise<WorkspaceResponse['data']> {
    const org = this.resolveOrg(input)
    return this.requestData<WorkspaceResponse['data']>(
      {
        method: 'POST',
        path: `/v1/organisations/${enc(org)}/workspaces`,
        body: { name: input.name, slug: input.slug },
      },
      options,
    )
  }

  /** `GET /v1/organisations/:org/workspaces/:workspace`. Requires `workspaces:read`. */
  get(input: WsScope = {}, options?: RequestOptions): Promise<WorkspaceResponse['data']> {
    const { organisation, workspace } = this.resolveWorkspace(input)
    return this.requestData<WorkspaceResponse['data']>(
      {
        method: 'GET',
        path: `/v1/organisations/${enc(organisation)}/workspaces/${enc(workspace)}`,
      },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/workspaces/:workspace`. Requires `workspaces:delete`. */
  delete(input: WsScope = {}, options?: RequestOptions): Promise<void> {
    const { organisation, workspace } = this.resolveWorkspace(input)
    return this.request<void>(
      {
        method: 'DELETE',
        path: `/v1/organisations/${enc(organisation)}/workspaces/${enc(workspace)}`,
      },
      options,
    )
  }
}
