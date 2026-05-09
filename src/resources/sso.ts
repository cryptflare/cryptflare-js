import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const orgBase = (org: string) => `/v1/organisations/${enc(org)}/sso`;

/**
 * SSO. Auth routes (`/v1/auth/sso/*`) cover the public OIDC handshake;
 * org-scoped routes (`/v1/organisations/:org/sso/*`) cover connection
 * configuration.
 */
export class Sso extends APIResource {
  /** GET /v1/auth/sso/check?domain=... - resolve enabled provider for a domain. */
  checkDomain(input: { domain: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: '/v1/auth/sso/check', query: { domain: input.domain } }, options);
  }

  /** GET /v1/auth/sso/initiate?... */
  initiateLogin(input: { connectionId: string; returnTo?: string }, options?: RequestOptions): Promise<unknown> {
    const query: Record<string, string> = { connectionId: input.connectionId };
    if (input.returnTo !== undefined) query['returnTo'] = input.returnTo;
    return this.request({ method: 'GET', path: '/v1/auth/sso/initiate', query }, options);
  }

  /** GET /v1/auth/sso/callback - finishes the OIDC handshake. */
  oidcCallback(input: { code: string; state: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({
      method: 'GET',
      path: '/v1/auth/sso/callback',
      query: { code: input.code, state: input.state },
    }, options);
  }

  // -- Org-scoped connection management --------------------------------------

  listConnections(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${orgBase(this.resolveOrg(input))}/connections` }, options);
  }

  createConnection(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, ...body } = input;
    void _o;
    return this.request({ method: 'POST', path: `${orgBase(org)}/connections`, body }, options);
  }

  updateConnection(input: OrgInput & { connectionId: string } & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, connectionId, ...body } = input;
    void _o;
    return this.request({ method: 'PATCH', path: `${orgBase(org)}/connections/${enc(connectionId)}`, body }, options);
  }

  deleteConnection(input: OrgInput & { connectionId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({ method: 'DELETE', path: `${orgBase(org)}/connections/${enc(input.connectionId)}` }, options);
  }

  toggleConnection(input: OrgInput & { connectionId: string; enabled: boolean }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${orgBase(org)}/connections/${enc(input.connectionId)}/toggle`,
      body: { enabled: input.enabled },
    }, options);
  }

  testConnection(input: OrgInput & { connectionId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${orgBase(org)}/connections/${enc(input.connectionId)}/test`,
    }, options);
  }

  listMappings(input: OrgInput & { connectionId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'GET',
      path: `${orgBase(org)}/connections/${enc(input.connectionId)}/mappings`,
    }, options);
  }

  createMapping(input: OrgInput & { connectionId: string; externalGroupId: string; role: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${orgBase(org)}/connections/${enc(input.connectionId)}/mappings`,
      body: { externalGroupId: input.externalGroupId, role: input.role },
    }, options);
  }

  deleteMapping(input: OrgInput & { connectionId: string; mappingId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({
      method: 'DELETE',
      path: `${orgBase(org)}/connections/${enc(input.connectionId)}/mappings/${enc(input.mappingId)}`,
    }, options);
  }
}
