import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/policies`;

/** Policies, templates, access requests + grants. */
export class Policies extends APIResource {
  list(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: base(this.resolveOrg(input)) }, options);
  }

  create(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, ...body } = input;
    void _o;
    return this.request({ method: 'POST', path: base(org), body }, options);
  }

  update(input: OrgInput & { policyId: string } & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, policyId, ...body } = input;
    void _o;
    return this.request({ method: 'PUT', path: `${base(org)}/${enc(policyId)}`, body }, options);
  }

  toggle(input: OrgInput & { policyId: string; enabled: boolean }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/${enc(input.policyId)}/toggle`,
      body: { enabled: input.enabled },
    }, options);
  }

  delete(input: OrgInput & { policyId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({ method: 'DELETE', path: `${base(org)}/${enc(input.policyId)}` }, options);
  }

  simulate(input: OrgInput & { policyId: string; subject: Record<string, unknown> }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/${enc(input.policyId)}/simulate`,
      body: { subject: input.subject },
    }, options);
  }

  export(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/export` }, options);
  }

  import(input: OrgInput & { policies: unknown[] }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'POST', path: `${base(org)}/import`, body: { policies: input.policies } }, options);
  }

  listLibrary(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/library` }, options);
  }

  getTemplate(input: OrgInput & { templateId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/library/${enc(input.templateId)}` }, options);
  }

  applyTemplate(input: OrgInput & { templateId: string } & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, templateId, ...body } = input;
    void _o;
    return this.request({
      method: 'POST',
      path: `${base(org)}/library/${enc(templateId)}/apply`,
      body,
    }, options);
  }

  listTeamPolicies(input: OrgInput & { teamId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/teams/${enc(input.teamId)}` }, options);
  }

  // -- Access requests -------------------------------------------------------

  listAccessRequests(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/access-requests` }, options);
  }

  createAccessRequest(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, ...body } = input;
    void _o;
    return this.request({ method: 'POST', path: `${base(org)}/access-requests`, body }, options);
  }

  approveAccessRequest(input: OrgInput & { requestId: string; reason?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = {};
    if (input.reason !== undefined) body['reason'] = input.reason;
    return this.request({
      method: 'POST',
      path: `${base(org)}/access-requests/${enc(input.requestId)}/approve`,
      body,
    }, options);
  }

  denyAccessRequest(input: OrgInput & { requestId: string; reason?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = {};
    if (input.reason !== undefined) body['reason'] = input.reason;
    return this.request({
      method: 'POST',
      path: `${base(org)}/access-requests/${enc(input.requestId)}/deny`,
      body,
    }, options);
  }

  // -- Access grants ---------------------------------------------------------

  listAccessGrants(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/access-grants` }, options);
  }

  revokeAccessGrant(input: OrgInput & { grantId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/access-grants/${enc(input.grantId)}/revoke`,
    }, options);
  }
}
