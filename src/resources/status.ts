import { APIResource } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  StatusResponse,
  StatusSubscribeResponse,
  StatusUnsubscribeCheckResponse,
  StatusUnsubscribeResponse,
} from '../types'

/**
 * Public status page API. Mounted at `/v1/status`. No auth required for
 * `getStatus`; subscription endpoints accept anonymous email opt-in.
 */
export class Status extends APIResource {
  /** `GET /v1/status`. No authentication required. */
  getStatus(options?: RequestOptions): Promise<StatusResponse> {
    return this.request<StatusResponse>({ method: 'GET', path: '/v1/status' }, options)
  }

  /** `POST /v1/status/subscribe`. No authentication required. */
  subscribe(
    body: { email: string; components?: string[] },
    options?: RequestOptions,
  ): Promise<StatusSubscribeResponse> {
    return this.request<StatusSubscribeResponse>(
      { method: 'POST', path: '/v1/status/subscribe', body },
      options,
    )
  }

  /** `POST /v1/status/unsubscribe`. No authentication required. */
  unsubscribe(
    body: { token: string },
    options?: RequestOptions,
  ): Promise<StatusUnsubscribeResponse> {
    return this.request<StatusUnsubscribeResponse>(
      { method: 'POST', path: '/v1/status/unsubscribe', body },
      options,
    )
  }

  /** `POST /v1/status/unsubscribe/check` - reads the subscription behind an unsubscribe token. No authentication required. */
  checkUnsubscribe(
    body: { token: string },
    options?: RequestOptions,
  ): Promise<StatusUnsubscribeCheckResponse> {
    return this.request<StatusUnsubscribeCheckResponse>(
      { method: 'POST', path: '/v1/status/unsubscribe/check', body },
      options,
    )
  }
}
