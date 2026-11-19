import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  CliApproveInput,
  CliApproveResponse,
  CliCheckResponse,
  CliDeviceInput,
  CliTokenInput,
  CliTokenResponse,
} from '../types'

/**
 * CLI device-flow auth. Mounted at `/v1/cli`. Used by `packages/cli` to
 * exchange a device code for a session token without local browser login.
 */
export class Cli extends APIResource {
  /**
   * `POST /v1/cli/device`. No authentication required. What the client says
   * about itself (name, version, computer, operating system) is shown to the
   * person before they approve.
   */
  requestDeviceCode(
    body: CliDeviceInput,
    options?: RequestOptions,
  ): Promise<{
    deviceCode: string
    userCode: string
    verificationUrl: string
    interval: number
    expiresIn: number
  }> {
    return this.request({ method: 'POST', path: '/v1/cli/device', body }, options)
  }

  /** `GET /v1/cli/check/:userCode` - whether a user code can still be approved. No authentication required. */
  checkDeviceCode(
    input: { userCode: string },
    options?: RequestOptions,
  ): Promise<CliCheckResponse> {
    return this.request<CliCheckResponse>(
      {
        method: 'GET',
        path: `/v1/cli/check/${enc(input.userCode)}`,
      },
      options,
    )
  }

  /** `POST /v1/cli/approve` - approves a pending device code. Requires an authenticated user session. */
  approveDevice(body: CliApproveInput, options?: RequestOptions): Promise<CliApproveResponse> {
    return this.request<CliApproveResponse>(
      { method: 'POST', path: '/v1/cli/approve', body },
      options,
    )
  }

  /**
   * `POST /v1/cli/token` - polls for the token once the device code is
   * approved. Until then the API answers with an error (pending, expired).
   * No authentication required.
   */
  pollToken(body: CliTokenInput, options?: RequestOptions): Promise<CliTokenResponse> {
    return this.request<CliTokenResponse>({ method: 'POST', path: '/v1/cli/token', body }, options)
  }
}
