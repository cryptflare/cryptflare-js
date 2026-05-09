import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/dynamic-secrets`;

/** Vault-style dynamic secrets: configs + leases. */
export class DynamicSecrets extends APIResource {
  listConfigs(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/configs` }, options);
  }

  getConfig(input: OrgInput & { configId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/configs/${enc(input.configId)}` }, options);
  }

  createConfig(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, ...body } = input;
    void _o;
    return this.request({ method: 'POST', path: `${base(org)}/configs`, body }, options);
  }

  updateConfig(input: OrgInput & { configId: string } & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, configId, ...body } = input;
    void _o;
    return this.request({ method: 'PATCH', path: `${base(org)}/configs/${enc(configId)}`, body }, options);
  }

  validateConfig(input: OrgInput & { configId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'POST', path: `${base(org)}/configs/${enc(input.configId)}/validate` }, options);
  }

  deleteConfig(input: OrgInput & { configId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({ method: 'DELETE', path: `${base(org)}/configs/${enc(input.configId)}` }, options);
  }

  // -- Leases ----------------------------------------------------------------

  issueLease(input: OrgInput & { configId: string; ttlSeconds?: number; metadata?: Record<string, unknown> }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = { configId: input.configId };
    if (input.ttlSeconds !== undefined) body['ttlSeconds'] = input.ttlSeconds;
    if (input.metadata !== undefined) body['metadata'] = input.metadata;
    return this.request({ method: 'POST', path: `${base(org)}/leases`, body }, options);
  }

  renewLease(input: OrgInput & { leaseId: string; ttlSeconds?: number }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = {};
    if (input.ttlSeconds !== undefined) body['ttlSeconds'] = input.ttlSeconds;
    return this.request({ method: 'POST', path: `${base(org)}/leases/${enc(input.leaseId)}/renew`, body }, options);
  }

  listLeases(input: OrgInput & { cursor?: string; configId?: string } = {}, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const query: Record<string, string> = {};
    if (input.cursor !== undefined) query['cursor'] = input.cursor;
    if (input.configId !== undefined) query['configId'] = input.configId;
    return this.request({ method: 'GET', path: `${base(org)}/leases`, query }, options);
  }

  getLease(input: OrgInput & { leaseId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/leases/${enc(input.leaseId)}` }, options);
  }

  revokeLease(input: OrgInput & { leaseId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({ method: 'DELETE', path: `${base(org)}/leases/${enc(input.leaseId)}` }, options);
  }

  forceRevokeLease(input: OrgInput & { leaseId: string; reason?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = {};
    if (input.reason !== undefined) body['reason'] = input.reason;
    return this.request({
      method: 'POST',
      path: `${base(org)}/leases/${enc(input.leaseId)}/force-revoke`,
      body,
    }, options);
  }

  unwrapCredentials(input: OrgInput & { leaseId: string; wrapToken: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/leases/${enc(input.leaseId)}/unwrap`,
      body: { wrapToken: input.wrapToken },
    }, options);
  }

  getAnalytics(input: OrgInput & { configId?: string; periodDays?: number } = {}, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const query: Record<string, string | number> = {};
    if (input.configId !== undefined) query['configId'] = input.configId;
    if (input.periodDays !== undefined) query['periodDays'] = input.periodDays;
    return this.request({ method: 'GET', path: `${base(org)}/analytics`, query }, options);
  }
}
