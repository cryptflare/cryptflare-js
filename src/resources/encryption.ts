import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/encryption`;

/** BYOK / customer-managed encryption keys. */
export class Encryption extends APIResource {
  getStatus(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/status` }, options);
  }

  enable(input: OrgInput & { keyId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'POST', path: `${base(org)}/enable`, body: { keyId: input.keyId } }, options);
  }

  disable(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: `${base(this.resolveOrg(input))}/disable` }, options);
  }

  generateKey(input: OrgInput & { provider: string; alias?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = { provider: input.provider };
    if (input.alias !== undefined) body['alias'] = input.alias;
    return this.request({ method: 'POST', path: `${base(org)}/keys`, body }, options);
  }
}
