import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/tokens`;

/** Personal access tokens. Mounted at `/v1/organisations/:org/tokens`. */
export class Tokens extends APIResource {
  list(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'GET', path: base(this.resolveOrg(input)) }, options);
  }

  create(input: OrgInput & { name: string; scopes: string[]; expiresAt?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = { name: input.name, scopes: input.scopes };
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
    return this.request<void>({
      method: 'DELETE',
      path: `${base(org)}/${enc(input.tokenId)}`,
    }, options);
  }

  /** POST /v1/tokens/claim - create a one-time claim link. */
  createClaimLink(body: { tokenId: string; expiresInSeconds?: number }, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'POST', path: '/v1/tokens/claim', body }, options);
  }

  /** POST /v1/tokens/redeem - redeem a claim link. */
  redeemClaim(body: { code: string }, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'POST', path: '/v1/tokens/redeem', body }, options);
  }
}
