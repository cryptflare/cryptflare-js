import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type { RolePermissionsResponse, UpdateRolePermissionResponse } from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/role-permissions`

/** Role permissions matrix. */
export class RolePermissions extends APIResource {
  /** `GET /v1/organisations/:org/role-permissions`. Requires `org:read`. */
  get(input: OrgInput = {}, options?: RequestOptions): Promise<RolePermissionsResponse> {
    return this.request<RolePermissionsResponse>(
      { method: 'GET', path: base(this.resolveOrg(input)) },
      options,
    )
  }

  /** `PATCH /v1/organisations/:org/role-permissions`. Requires `org:update`. */
  toggle(
    input: OrgInput & { role: string; permission: string; enabled: boolean },
    options?: RequestOptions,
  ): Promise<UpdateRolePermissionResponse> {
    const org = this.resolveOrg(input)
    return this.request<UpdateRolePermissionResponse>(
      {
        method: 'PATCH',
        path: base(org),
        body: { role: input.role, permission: input.permission, enabled: input.enabled },
      },
      options,
    )
  }
}
