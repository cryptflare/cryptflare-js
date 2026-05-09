import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/tags`;

/** Tags. */
export class Tags extends APIResource {
  list(input: OrgInput & { resourceType?: string; resourceId?: string } = {}, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const query: Record<string, string> = {};
    if (input.resourceType !== undefined) query['resourceType'] = input.resourceType;
    if (input.resourceId !== undefined) query['resourceId'] = input.resourceId;
    return this.request({ method: 'GET', path: base(org), query }, options);
  }

  listOrg(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/all` }, options);
  }

  create(input: OrgInput & { name: string; colour?: string; resourceType?: string; resourceId?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = { name: input.name };
    if (input.colour !== undefined) body['colour'] = input.colour;
    if (input.resourceType !== undefined) body['resourceType'] = input.resourceType;
    if (input.resourceId !== undefined) body['resourceId'] = input.resourceId;
    return this.request({ method: 'POST', path: base(org), body }, options);
  }

  delete(input: OrgInput & { tagId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({ method: 'DELETE', path: `${base(org)}/${enc(input.tagId)}` }, options);
  }
}
