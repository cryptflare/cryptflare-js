import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/analytics`;

/** Request analytics. */
export class Analytics extends APIResource {
  requestHistory(input: OrgInput & { from?: string; to?: string; granularity?: 'hour' | 'day' } = {}, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const query: Record<string, string> = {};
    if (input.from !== undefined) query['from'] = input.from;
    if (input.to !== undefined) query['to'] = input.to;
    if (input.granularity !== undefined) query['granularity'] = input.granularity;
    return this.request({ method: 'GET', path: `${base(org)}/request-history`, query }, options);
  }

  endpointBreakdown(input: OrgInput & { from?: string; to?: string } = {}, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const query: Record<string, string> = {};
    if (input.from !== undefined) query['from'] = input.from;
    if (input.to !== undefined) query['to'] = input.to;
    return this.request({ method: 'GET', path: `${base(org)}/endpoint-breakdown`, query }, options);
  }
}
