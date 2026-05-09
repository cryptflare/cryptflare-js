/**
 * Browser-safe SDK entry. Re-exports the minimal surface that's safe to
 * ship to a public website / SPA: read endpoints, error classes, types,
 * and webhook verification.
 *
 * We deliberately exclude:
 *   - Service-token credential mode (long-lived secrets must never reach
 *     the browser; use a backend proxy with short-lived session tokens).
 *   - File-system / config-file helpers that don't exist in browsers.
 *
 * Consumers import via:
 *   import { CryptFlare } from '@cryptflare/sdk/browser';
 *
 * The `package.json` `exports` map points this entry at `./dist/browser.js`
 * so bundlers pick it up automatically when they resolve the `browser`
 * condition.
 */

export { CryptFlare } from './client';
export { VERSION as version } from './version';

export {
  APIError,
  AuthenticationError,
  BadRequestError,
  ConfigurationError,
  ConflictError,
  ConnectionError,
  CryptFlareError,
  ERRORS,
  InternalServerError,
  NotFoundError,
  PermissionDeniedError,
  RateLimitError,
  TimeoutError,
  UnknownAPIError,
  UnprocessableEntityError,
} from './core/errors';
export type { ErrorCode, ErrorDetail } from './core/errors';

export { CursorPage } from './core/pagination';
export type { PageEnvelope } from './core/pagination';
export { PagePromise } from './core/page-promise';

export { verifyWebhook, WebhookVerificationError } from './core/webhooks';
export type { VerifyOptions as VerifyWebhookOptions } from './core/webhooks';
export { WEBHOOK_EVENT_TYPES, isKnownEventType } from './types/webhooks';
export type { WebhookEvent, WebhookEventPayloads, WebhookEventType } from './types/webhooks';

export { LocalKeyring, isEnvelope, seal, unseal } from './core/crypto';
export type { Envelope, Keyring } from './core/crypto';

export type {
  ClientOptions,
  HttpMethod,
  RequestOptions,
} from './types/options';

export type {
  EnvironmentItem,
  PodItem,
  Scope,
  SecretListItem,
  SecretRevealResponse,
  WhoAmI,
  WorkspaceItem,
} from './types';
