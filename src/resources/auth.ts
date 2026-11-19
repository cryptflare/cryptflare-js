import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  AccessStatusResponse,
  AuthMeResponse,
  LoginInput,
  LoginResponse,
  SessionListResponse,
  TotpDisableResponse,
  TotpVerifySetupResponse,
  VerifyOtpInput,
  VerifyOtpResponse,
  VerifyTotpInput,
  WhoAmI,
} from '../types'

/**
 * Authentication flows. Mounted at `/v1/auth`. Most endpoints work
 * without an existing bearer token (OTP request / verify, register).
 * Session-bearing endpoints (sessions, totp setup, account deletion)
 * require a session cookie or PAT.
 */
export class Auth extends APIResource {
  // -- OTP & login ----------------------------------------------------------

  /**
   * `POST /v1/auth/login` - emails a 6-digit OTP. Returns the `requestId`
   * to pass to {@link verifyOtp}. No authentication required.
   */
  requestOtp(body: LoginInput, options?: RequestOptions): Promise<LoginResponse> {
    return this.request<LoginResponse>({ method: 'POST', path: '/v1/auth/login', body }, options)
  }

  /** `POST /v1/auth/verify` - exchanges the OTP for a session. No authentication required. */
  verifyOtp(body: VerifyOtpInput, options?: RequestOptions): Promise<VerifyOtpResponse> {
    return this.request<VerifyOtpResponse>(
      { method: 'POST', path: '/v1/auth/verify', body },
      options,
    )
  }

  /**
   * `POST /v1/auth/verify-totp` - second factor after {@link verifyOtp}. No authentication required.
   *
   * Pass the `pendingLoginToken` that {@link verifyOtp} returned when
   * `requiresTotp` is true. It is single use and expires after 5 minutes.
   * A `userId` is no longer accepted: the API ignores it, because a user id
   * alone let a caller skip the email code.
   *
   * @example
   *   const first = await client.auth.verifyOtp({ requestId, code });
   *   if (first.requiresTotp && first.pendingLoginToken) {
   *     await client.auth.verifyTotp({ pendingLoginToken: first.pendingLoginToken, code: totp });
   *   }
   */
  verifyTotp(body: VerifyTotpInput, options?: RequestOptions): Promise<VerifyOtpResponse> {
    return this.request<VerifyOtpResponse>(
      { method: 'POST', path: '/v1/auth/verify-totp', body },
      options,
    )
  }

  // -- Identity -------------------------------------------------------------

  /**
   * Session-cookie call. Use `client.me.get()` for token-bearer callers.
   * Requires an authenticated user session (no org permission).
   */
  getMe(options?: RequestOptions): Promise<AuthMeResponse> {
    return this.request({ method: 'GET', path: '/v1/auth/me' }, options)
  }

  /** `GET /v1/auth/whoami`. Requires a Bearer API or service token (no specific permission). */
  whoami(options?: RequestOptions): Promise<WhoAmI> {
    return this.request({ method: 'GET', path: '/v1/auth/whoami' }, options)
  }

  /** `GET /v1/auth/access-status`. No authentication required. */
  accessStatus(options?: RequestOptions): Promise<AccessStatusResponse> {
    return this.request<AccessStatusResponse>(
      { method: 'GET', path: '/v1/auth/access-status' },
      options,
    )
  }

  /** `POST /v1/auth/logout`. Requires an authenticated user session (no org permission). */
  logout(options?: RequestOptions): Promise<void> {
    return this.request<void>({ method: 'POST', path: '/v1/auth/logout' }, options)
  }

  /** `GET /v1/auth/notification-preferences`. Requires an authenticated user session (no org permission). */
  notificationPreferences(options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: '/v1/auth/notification-preferences' }, options)
  }

  // -- Sessions -------------------------------------------------------------

  /** `GET /v1/auth/sessions`. Requires an authenticated user session (no org permission). */
  listSessions(options?: RequestOptions): Promise<SessionListResponse> {
    return this.request<SessionListResponse>({ method: 'GET', path: '/v1/auth/sessions' }, options)
  }

  /** `DELETE /v1/auth/sessions/:sessionId`. Requires an authenticated user session (no org permission). */
  revokeSession(input: { sessionId: string }, options?: RequestOptions): Promise<void> {
    return this.request<void>(
      { method: 'DELETE', path: `/v1/auth/sessions/${enc(input.sessionId)}` },
      options,
    )
  }

  // -- TOTP -----------------------------------------------------------------

  /** `POST /v1/auth/totp/setup`. Requires an authenticated user session (no org permission). */
  totpSetup(options?: RequestOptions): Promise<{ secret: string; qrCodeUrl: string }> {
    return this.request({ method: 'POST', path: '/v1/auth/totp/setup' }, options)
  }

  /** `POST /v1/auth/totp/verify-setup`. Requires an authenticated user session (no org permission). */
  totpVerifySetup(
    body: { code: string },
    options?: RequestOptions,
  ): Promise<TotpVerifySetupResponse> {
    return this.request<TotpVerifySetupResponse>(
      { method: 'POST', path: '/v1/auth/totp/verify-setup', body },
      options,
    )
  }

  /** `POST /v1/auth/totp/disable`. Requires an authenticated user session (no org permission). */
  totpDisable(body: { code: string }, options?: RequestOptions): Promise<TotpDisableResponse> {
    return this.request<TotpDisableResponse>(
      { method: 'POST', path: '/v1/auth/totp/disable', body },
      options,
    )
  }

  // -- Destructive ----------------------------------------------------------

  /** `DELETE /v1/auth/account`. Requires an authenticated user session (no org permission). */
  deleteAccount(body: { confirmation: string }, options?: RequestOptions): Promise<void> {
    return this.request<void>({ method: 'DELETE', path: '/v1/auth/account', body }, options)
  }
}
