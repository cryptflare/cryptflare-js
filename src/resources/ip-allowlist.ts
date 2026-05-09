import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/ip-allowlist`;

/** IP allowlist for an org or token. */
export class IpAllowlist extends APIResource {
  get(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: base(this.resolveOrg(input)) }, options);
  }

  set(input: OrgInput & { cidrs: string[] }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'PUT', path: base(org), body: { cidrs: input.cidrs } }, options);
  }
}
