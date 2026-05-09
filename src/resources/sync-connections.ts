import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/sync-connections`;

/** Outbound secret-sync connections. */
export class SyncConnections extends APIResource {
  list(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: base(this.resolveOrg(input)) }, options);
  }

  get(input: OrgInput & { connectionId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/${enc(input.connectionId)}` }, options);
  }

  create(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, ...body } = input;
    void _o;
    return this.request({ method: 'POST', path: base(org), body }, options);
  }

  update(input: OrgInput & { connectionId: string } & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, connectionId, ...body } = input;
    void _o;
    return this.request({ method: 'PATCH', path: `${base(org)}/${enc(connectionId)}`, body }, options);
  }

  delete(input: OrgInput & { connectionId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({ method: 'DELETE', path: `${base(org)}/${enc(input.connectionId)}` }, options);
  }

  confirmHandshake(input: OrgInput & { connectionId: string; nonce: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/${enc(input.connectionId)}/handshake`,
      body: { nonce: input.nonce },
    }, options);
  }

  getFederation(input: OrgInput & { connectionId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'GET',
      path: `${base(org)}/${enc(input.connectionId)}/federation`,
    }, options);
  }

  trigger(input: OrgInput & { connectionId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'POST', path: `${base(org)}/${enc(input.connectionId)}/sync` }, options);
  }

  listLogs(input: OrgInput & { connectionId: string; cursor?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const query: Record<string, string> = {};
    if (input.cursor !== undefined) query['cursor'] = input.cursor;
    return this.request({
      method: 'GET',
      path: `${base(org)}/${enc(input.connectionId)}/logs`,
      query,
    }, options);
  }

  getDrift(input: OrgInput & { connectionId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/${enc(input.connectionId)}/drift` }, options);
  }

  getQueue(input: OrgInput & { connectionId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/${enc(input.connectionId)}/queue` }, options);
  }
}
