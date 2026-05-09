import { APIResource } from './api-resource';
import type { RequestOptions, WhoAmI } from '../types';

/**
 * Identity resource. `me.get()` round-trips the bearer credential and
 * returns the calling principal. Useful for verifying credentials at
 * boot, surfacing the active org / role in dashboards, and as a smoke
 * test in CI.
 */
export class Me extends APIResource {
  /** GET /v1/auth/whoami. Returns the principal attached to the bearer token. */
  get(options?: RequestOptions): Promise<WhoAmI> {
    return this.request<WhoAmI>({ method: 'GET', path: '/v1/auth/whoami' }, options);
  }
}
