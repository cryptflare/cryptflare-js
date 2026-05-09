import { APIResource } from './api-resource';
import type { RequestOptions } from '../types/options';

/** Public marketing waitlist. Mounted at `/v1/waitlist`. */
export class Waitlist extends APIResource {
  join(body: { email: string; source?: string; metadata?: Record<string, unknown> }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/waitlist', body }, options);
  }
}
