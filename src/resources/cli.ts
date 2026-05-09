import { APIResource } from './api-resource';
import type { RequestOptions } from '../types/options';

/**
 * CLI device-flow auth. Mounted at `/v1/cli`. Used by `packages/cli` to
 * exchange a device code for a session token without local browser login.
 */
export class Cli extends APIResource {
  requestDeviceCode(body: { clientName?: string }, options?: RequestOptions): Promise<{ deviceCode: string; userCode: string; verificationUrl: string; interval: number; expiresIn: number }> {
    return this.request({ method: 'POST', path: '/v1/cli/device', body }, options);
  }

  checkDeviceCode(input: { userCode: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({
      method: 'GET',
      path: '/v1/cli/device/check',
      query: { userCode: input.userCode },
    }, options);
  }

  approveDevice(body: { userCode: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/cli/device/approve', body }, options);
  }

  pollToken(body: { deviceCode: string }, options?: RequestOptions): Promise<{ token?: string; status: 'pending' | 'authorised' | 'expired' | 'denied' }> {
    return this.request({ method: 'POST', path: '/v1/cli/device/poll', body }, options);
  }
}
