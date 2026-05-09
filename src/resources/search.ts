import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

/**
 * Cross-resource search. Returns matches across secrets, pods,
 * environments, and policies in a single call - the dashboard's
 * spotlight bar uses this.
 */
type OrgInput = { organisation?: string };

export type SearchResult = {
  type: 'secret' | 'pod' | 'environment' | 'workspace' | 'policy';
  id: string;
  title: string;
  workspace?: string;
  environment?: string;
  /** Highlighted preview snippet, HTML-escaped. */
  preview?: string;
};

export class Search extends APIResource {
  /** GET /v1/organisations/:org/search?q=... */
  query(input: OrgInput & { q: string; limit?: number }, options?: RequestOptions): Promise<{ data: SearchResult[] }> {
    const org = this.resolveOrg(input);
    const query: Record<string, string> = { q: input.q };
    if (input.limit !== undefined) query['limit'] = String(input.limit);
    return this.request({
      method: 'GET',
      path: `/v1/organisations/${enc(org)}/search`,
      query,
    }, options);
  }
}
