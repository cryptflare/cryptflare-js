import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/teams`;

/** Teams. Mounted at `/v1/organisations/:org/teams`. */
export class Teams extends APIResource {
  list(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: base(this.resolveOrg(input)) }, options);
  }

  create(input: OrgInput & { name: string; slug: string; description?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = { name: input.name, slug: input.slug };
    if (input.description !== undefined) body['description'] = input.description;
    return this.request({ method: 'POST', path: base(org), body }, options);
  }

  get(input: OrgInput & { teamId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/${enc(input.teamId)}` }, options);
  }

  update(input: OrgInput & { teamId: string; name?: string; description?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = {};
    if (input.name !== undefined) body['name'] = input.name;
    if (input.description !== undefined) body['description'] = input.description;
    return this.request({ method: 'PATCH', path: `${base(org)}/${enc(input.teamId)}`, body }, options);
  }

  delete(input: OrgInput & { teamId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({ method: 'DELETE', path: `${base(org)}/${enc(input.teamId)}` }, options);
  }

  listMembers(input: OrgInput & { teamId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/${enc(input.teamId)}/members` }, options);
  }

  addMember(input: OrgInput & { teamId: string; userId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/${enc(input.teamId)}/members`,
      body: { userId: input.userId },
    }, options);
  }

  removeMember(input: OrgInput & { teamId: string; userId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({
      method: 'DELETE',
      path: `${base(org)}/${enc(input.teamId)}/members/${enc(input.userId)}`,
    }, options);
  }

  listPolicies(input: OrgInput & { teamId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/${enc(input.teamId)}/policies` }, options);
  }

  addPolicy(input: OrgInput & { teamId: string; policyId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/${enc(input.teamId)}/policies`,
      body: { policyId: input.policyId },
    }, options);
  }

  deletePolicy(input: OrgInput & { teamId: string; policyId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({
      method: 'DELETE',
      path: `${base(org)}/${enc(input.teamId)}/policies/${enc(input.policyId)}`,
    }, options);
  }
}
