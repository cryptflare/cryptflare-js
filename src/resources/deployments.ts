import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/deployments`;

/** Deployment events log. */
export class Deployments extends APIResource {
  list(input: OrgInput & { cursor?: string } = {}, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const query: Record<string, string> = {};
    if (input.cursor !== undefined) query['cursor'] = input.cursor;
    return this.request({ method: 'GET', path: base(org), query }, options);
  }

  get(input: OrgInput & { deploymentId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/${enc(input.deploymentId)}` }, options);
  }

  start(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, ...body } = input;
    void _o;
    return this.request({ method: 'POST', path: base(org), body }, options);
  }

  update(input: OrgInput & { deploymentId: string } & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, deploymentId, ...body } = input;
    void _o;
    return this.request({ method: 'PATCH', path: `${base(org)}/${enc(deploymentId)}`, body }, options);
  }
}
