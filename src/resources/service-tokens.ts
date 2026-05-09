import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/service-tokens`;

/** Service tokens. Mounted at `/v1/organisations/:org/service-tokens`. */
export class ServiceTokens extends APIResource {
  list(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'GET', path: base(this.resolveOrg(input)) }, options);
  }

  create(input: OrgInput & { name: string; scopes: string[]; workspace?: string; environment?: string; expiresAt?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = { name: input.name, scopes: input.scopes };
    if (input.workspace !== undefined) body['workspace'] = input.workspace;
    if (input.environment !== undefined) body['environment'] = input.environment;
    if (input.expiresAt !== undefined) body['expiresAt'] = input.expiresAt;
    return this.requestData({ method: 'POST', path: base(org), body }, options);
  }

  update(input: OrgInput & { tokenId: string; name?: string; scopes?: string[] }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = {};
    if (input.name !== undefined) body['name'] = input.name;
    if (input.scopes !== undefined) body['scopes'] = input.scopes;
    return this.requestData({ method: 'PATCH', path: `${base(org)}/${enc(input.tokenId)}`, body }, options);
  }

  toggle(input: OrgInput & { tokenId: string; enabled: boolean }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.requestData({
      method: 'POST',
      path: `${base(org)}/${enc(input.tokenId)}/toggle`,
      body: { enabled: input.enabled },
    }, options);
  }

  revoke(input: OrgInput & { tokenId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({ method: 'DELETE', path: `${base(org)}/${enc(input.tokenId)}` }, options);
  }
}
