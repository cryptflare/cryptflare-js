import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

/** Dashboard widgets snapshot. */
export class Dashboard extends APIResource {
  get(input: { organisation?: string } = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/dashboard` }, options);
  }
}
