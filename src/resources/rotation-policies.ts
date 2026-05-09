import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/rotation-policies`;

/** Rotation policies. */
export class RotationPolicies extends APIResource {
  list(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: base(this.resolveOrg(input)) }, options);
  }

  get(input: OrgInput & { policyId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/${enc(input.policyId)}` }, options);
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
    return this.request({ method: 'PATCH', path: `${base(org)}/${enc(policyId)}`, body }, options);
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

  run(input: OrgInput & { policyId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'POST', path: `${base(org)}/${enc(input.policyId)}/run` }, options);
  }
}
