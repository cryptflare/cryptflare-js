import { APIResource } from './api-resource';
import type { RequestOptions } from '../types/options';

/** Org invitations. Mounted at `/v1/invitations`. Auth-free preview. */
export class Invitations extends APIResource {
  /** GET /v1/invitations/preview?token=... */
  preview(input: { token: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: '/v1/invitations/preview', query: { token: input.token } }, options);
  }

  /** POST /v1/invitations/accept. */
  accept(body: { token: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/invitations/accept', body }, options);
  }
}
