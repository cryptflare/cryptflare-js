import { APIResource } from './api-resource';
import type { RequestOptions } from '../types/options';

/**
 * Public OIDC discovery endpoints. Mounted at `/.well-known/*` (the API
 * mounts the OIDC router at root). Useful for upstream identity providers
 * federating into CryptFlare.
 */
export class WellKnown extends APIResource {
  openidConfiguration(options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: '/.well-known/openid-configuration' }, options);
  }

  jwks(options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: '/.well-known/jwks' }, options);
  }
}
