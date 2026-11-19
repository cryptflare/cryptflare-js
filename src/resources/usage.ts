import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'

type OrgInput = { organisation?: string }

/** Usage / consumption snapshots. */
export class Usage extends APIResource {
  /** `GET /v1/organisations/:org/usage`. Requires organisation membership (any role; no specific permission). */
  get(
    input: OrgInput & { period?: 'day' | 'week' | 'month' } = {},
    options?: RequestOptions,
  ): Promise<unknown> {
    const org = this.resolveOrg(input)
    const query: Record<string, string> = {}
    if (input.period !== undefined) query['period'] = input.period
    return this.request(
      { method: 'GET', path: `/v1/organisations/${enc(org)}/usage`, query },
      options,
    )
  }
}
