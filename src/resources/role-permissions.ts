import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/role-permissions`;

/** Role permissions matrix. */
export class RolePermissions extends APIResource {
  get(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: base(this.resolveOrg(input)) }, options);
  }

  toggle(input: OrgInput & { role: string; permission: string; enabled: boolean }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'PATCH',
      path: base(org),
      body: { role: input.role, permission: input.permission, enabled: input.enabled },
    }, options);
  }
}
