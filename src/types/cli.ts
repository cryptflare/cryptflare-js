/** Public types backed by the vendored `cli` schemas. */
import type {
  CliApproveBody as _CliApproveBody,
  CliApproveResponse as _CliApproveResponse,
  CliDeviceBody as _CliDeviceBody,
  CliDeviceResponse as _CliDeviceResponse,
  CliTokenBody as _CliTokenBody,
  CliTokenResponse as _CliTokenResponse,
  CliCheckResponse as _SDK_CliCheckResponse,
} from '../_vendored/schemas/cli'

export type CliDeviceResponse = _CliDeviceResponse
export type CliTokenInput = _CliTokenBody
export type CliTokenResponse = _CliTokenResponse
export type CliApproveInput = _CliApproveBody
export type CliApproveResponse = _CliApproveResponse
export type CliCheckResponse = _SDK_CliCheckResponse
export type CliDeviceInput = _CliDeviceBody
