import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';
import type { WhoAmI } from '../types';

/**
 * Authentication flows. Mounted at `/v1/auth`. Most endpoints work
 * without an existing bearer token (OTP request / verify, register).
 * Session-bearing endpoints (sessions, totp setup, account deletion)
 * require a session cookie or PAT.
 */
export class Auth extends APIResource {
  // -- OTP & login ----------------------------------------------------------

  requestOtp(body: { email: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/auth/otp/request', body }, options);
  }

  verifyOtp(body: { email: string; code: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/auth/otp/verify', body }, options);
  }

  verifyTotp(body: { code: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/auth/totp/verify', body }, options);
  }

  // -- Identity -------------------------------------------------------------

  /** Session-cookie call. Use `client.me.get()` for token-bearer callers. */
  getMe(options?: RequestOptions): Promise<WhoAmI> {
    return this.request({ method: 'GET', path: '/v1/auth/me' }, options);
  }

  whoami(options?: RequestOptions): Promise<WhoAmI> {
    return this.request({ method: 'GET', path: '/v1/auth/whoami' }, options);
  }

  accessStatus(options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: '/v1/auth/access-status' }, options);
  }

  logout(options?: RequestOptions): Promise<void> {
    return this.request<void>({ method: 'POST', path: '/v1/auth/logout' }, options);
  }

  notificationPreferences(options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: '/v1/auth/notification-preferences' }, options);
  }

  // -- Sessions -------------------------------------------------------------

  listSessions(options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: '/v1/auth/sessions' }, options);
  }

  revokeSession(input: { sessionId: string }, options?: RequestOptions): Promise<void> {
    return this.request<void>({ method: 'DELETE', path: `/v1/auth/sessions/${enc(input.sessionId)}` }, options);
  }

  // -- TOTP -----------------------------------------------------------------

  totpSetup(options?: RequestOptions): Promise<{ secret: string; qrCodeUrl: string }> {
    return this.request({ method: 'POST', path: '/v1/auth/totp/setup' }, options);
  }

  totpVerifySetup(body: { code: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/auth/totp/verify-setup', body }, options);
  }

  totpDisable(body: { code: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/auth/totp/disable', body }, options);
  }

  // -- Destructive ----------------------------------------------------------

  deleteAccount(body: { confirmation: string }, options?: RequestOptions): Promise<void> {
    return this.request<void>({ method: 'DELETE', path: '/v1/auth/account', body }, options);
  }
}
