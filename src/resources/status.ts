import { APIResource } from './api-resource';
import type { RequestOptions } from '../types/options';

/**
 * Public status page API. Mounted at `/v1/status`. No auth required for
 * `getStatus`; subscription endpoints accept anonymous email opt-in.
 */
export class Status extends APIResource {
  getStatus(options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: '/v1/status' }, options);
  }

  subscribe(body: { email: string; components?: string[] }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/status/subscribe', body }, options);
  }

  unsubscribe(body: { token: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/status/unsubscribe', body }, options);
  }

  checkUnsubscribe(body: { token: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/status/check-unsubscribe', body }, options);
  }
}
