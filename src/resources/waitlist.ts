import { APIResource } from './api-resource'
import type { RequestOptions } from '../types/options'
import type { JoinWaitlistResponse } from '../types'

/** Public marketing waitlist. Mounted at `/v1/waitlist`. */
export class Waitlist extends APIResource {
  /** `POST /v1/waitlist`. No authentication required. */
  join(
    body: { email: string; source?: string; metadata?: Record<string, unknown> },
    options?: RequestOptions,
  ): Promise<JoinWaitlistResponse> {
    return this.request<JoinWaitlistResponse>(
      { method: 'POST', path: '/v1/waitlist', body },
      options,
    )
  }
}
