/** Public types backed by the vendored `auth` schemas. */
import type {
  LoginBody as _LoginBody,
  LoginResponse as _LoginResponse,
  MeResponse as _MeResponse,
  AccessStatusResponse as _SDK_AccessStatusResponse,
  SessionListResponse as _SDK_SessionListResponse,
  TotpDisableResponse as _SDK_TotpDisableResponse,
  TotpCodeBody as _TotpCodeBody,
  TotpSetupResponse as _TotpSetupResponse,
  TotpVerifySetupResponse as _TotpVerifySetupResponse,
  VerifyBody as _VerifyBody,
  VerifyResponse as _VerifyResponse,
  VerifyTotpBody as _VerifyTotpBody,
  WhoamiResponse as _WhoamiResponse,
} from '../_vendored/schemas/auth'

/**
 * Token identity from `GET /v1/auth/whoami` (`client.auth.whoami()`,
 * `client.me.get()`). Same shape as {@link AuthWhoamiResponse}.
 */
export type WhoAmI = _WhoamiResponse
export type LoginInput = _LoginBody
export type LoginResponse = _LoginResponse
export type VerifyOtpInput = _VerifyBody
export type VerifyOtpResponse = _VerifyResponse
/**
 * Body of `auth.verifyTotp()`: the `pendingLoginToken` from `verifyOtp()` plus
 * the TOTP or recovery code. The deprecated `userId` field is not accepted.
 */
export type VerifyTotpInput = Omit<_VerifyTotpBody, 'userId' | 'pendingLoginToken'> & {
  pendingLoginToken: NonNullable<_VerifyTotpBody['pendingLoginToken']>
}
export type TotpCodeInput = _TotpCodeBody
export type TotpSetupResponse = _TotpSetupResponse
export type TotpVerifySetupResponse = _TotpVerifySetupResponse
export type AuthMeResponse = _MeResponse
export type AuthWhoamiResponse = _WhoamiResponse
export type AccessStatusResponse = _SDK_AccessStatusResponse
export type SessionListResponse = _SDK_SessionListResponse
export type TotpDisableResponse = _SDK_TotpDisableResponse
