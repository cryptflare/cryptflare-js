/**
 * Inlined registry of every error code the API can emit. Kept in sync with
 * `@cryptflare/shared/constants/errors` (the API's source of truth).
 */
export const ERRORS = {
  AUTH_INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_SESSION_EXPIRED: 'AUTH_SESSION_EXPIRED',
  AUTH_MISSING_HEADER: 'AUTH_MISSING_HEADER',
  AUTH_PENDING: 'AUTH_PENDING',
  RBAC_FORBIDDEN: 'RBAC_FORBIDDEN',
  RBAC_INSUFFICIENT_ROLE: 'RBAC_INSUFFICIENT_ROLE',
  RBAC_OWNERSHIP_REQUIRED: 'RBAC_OWNERSHIP_REQUIRED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  RESOURCE_GONE: 'RESOURCE_GONE',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  RATE_LIMITED: 'RATE_LIMITED',
  IDEMPOTENCY_KEY_COLLISION: 'IDEMPOTENCY_KEY_COLLISION',
  BILLING_PLAN_LIMIT: 'BILLING_PLAN_LIMIT',
  BILLING_PAYMENT_REQUIRED: 'BILLING_PAYMENT_REQUIRED',
  SECRET_APPROVAL_REQUIRED: 'SECRET_APPROVAL_REQUIRED',
  SECRET_DECRYPTION_FAILED: 'SECRET_DECRYPTION_FAILED',
  POD_MAX_DEPTH_EXCEEDED: 'POD_MAX_DEPTH_EXCEEDED',
  POD_NOT_EMPTY: 'POD_NOT_EMPTY',
  SECRET_LOCKED: 'SECRET_LOCKED',
  BATCH_PARTIAL_FAILURE: 'BATCH_PARTIAL_FAILURE',
  BATCH_TOO_LARGE: 'BATCH_TOO_LARGE',
  SECRET_VALIDATION_FAILED: 'SECRET_VALIDATION_FAILED',
  ROTATION_RULES_INCOMPATIBLE: 'ROTATION_RULES_INCOMPATIBLE',
  SSO_PROVIDER_ERROR: 'SSO_PROVIDER_ERROR',
  SSO_ASSERTION_INVALID: 'SSO_ASSERTION_INVALID',
  SSO_NOT_CONFIGURED: 'SSO_NOT_CONFIGURED',
  SSO_DOMAIN_MISMATCH: 'SSO_DOMAIN_MISMATCH',
  SSO_FORCE_SSO_ENABLED: 'SSO_FORCE_SSO_ENABLED',
  SSO_PLAN_REQUIRED: 'SSO_PLAN_REQUIRED',
  SSO_CALLBACK_FAILED: 'SSO_CALLBACK_FAILED',
  SSO_STATE_INVALID: 'SSO_STATE_INVALID',
  AUTH_TOTP_REQUIRED: 'AUTH_TOTP_REQUIRED',
  AUTH_TOTP_INVALID: 'AUTH_TOTP_INVALID',
  AUTH_TOTP_ALREADY_ENABLED: 'AUTH_TOTP_ALREADY_ENABLED',
  AUTH_TOTP_NOT_ENABLED: 'AUTH_TOTP_NOT_ENABLED',
  AUTH_TOTP_SETUP_EXPIRED: 'AUTH_TOTP_SETUP_EXPIRED',
  ONBOARDING_INCOMPLETE: 'ONBOARDING_INCOMPLETE',
  ONBOARDING_SLUG_TAKEN: 'ONBOARDING_SLUG_TAKEN',
  ONBOARDING_SLUG_INVALID: 'ONBOARDING_SLUG_INVALID',
  ACCESS_RESTRICTED: 'ACCESS_RESTRICTED',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  CONSOLE_NOT_AUTHORIZED: 'CONSOLE_NOT_AUTHORIZED',
  CONSOLE_USER_NOT_FOUND: 'CONSOLE_USER_NOT_FOUND',
  CONSOLE_USER_ALREADY_EXISTS: 'CONSOLE_USER_ALREADY_EXISTS',
  CONSOLE_STEPUP_REQUIRED: 'CONSOLE_STEPUP_REQUIRED',
  EVENTS_DISABLED: 'EVENTS_DISABLED',
  SYNC_DISABLED: 'SYNC_DISABLED',
  SYNC_PROVIDER_ERROR: 'SYNC_PROVIDER_ERROR',
  SYNC_CREDENTIALS_INVALID: 'SYNC_CREDENTIALS_INVALID',
  INTEGRATION_NOT_CONFIGURED: 'INTEGRATION_NOT_CONFIGURED',
  INTEGRATION_PROVIDER_ERROR: 'INTEGRATION_PROVIDER_ERROR',
  INTEGRATION_STATE_INVALID: 'INTEGRATION_STATE_INVALID',
  INTEGRATION_NOT_ALLOWED: 'INTEGRATION_NOT_ALLOWED',
  DYNAMIC_DISABLED: 'DYNAMIC_DISABLED',
  DYNAMIC_PROVIDER_ERROR: 'DYNAMIC_PROVIDER_ERROR',
  DYNAMIC_LEASE_QUOTA_EXCEEDED: 'DYNAMIC_LEASE_QUOTA_EXCEEDED',
  DYNAMIC_LEASE_EXHAUSTED: 'DYNAMIC_LEASE_EXHAUSTED',
  DYNAMIC_TTL_INVALID: 'DYNAMIC_TTL_INVALID',
  DYNAMIC_LEASE_IRREVOCABLE: 'DYNAMIC_LEASE_IRREVOCABLE',
  DYNAMIC_WRAP_NOT_FOUND: 'DYNAMIC_WRAP_NOT_FOUND',
  DYNAMIC_WRAP_EXPIRED: 'DYNAMIC_WRAP_EXPIRED',
  SERVICE_TOKEN_IP_BLOCKED: 'SERVICE_TOKEN_IP_BLOCKED',
  AUDIT_CHAIN_BROKEN: 'AUDIT_CHAIN_BROKEN',
  REPORT_GENERATION_FAILED: 'REPORT_GENERATION_FAILED',
  TAG_ALREADY_EXISTS: 'TAG_ALREADY_EXISTS',
  TAG_NOT_FOUND: 'TAG_NOT_FOUND',
  TAG_INVALID: 'TAG_INVALID',
  MCP_NOT_GRANTED: 'MCP_NOT_GRANTED',
  MCP_SESSION_NOT_FOUND: 'MCP_SESSION_NOT_FOUND',
  MCP_SESSION_TOKEN_MISMATCH: 'MCP_SESSION_TOKEN_MISMATCH',
  MCP_SESSION_REQUIRED: 'MCP_SESSION_REQUIRED',
  MCP_TOOL_QUOTA_EXCEEDED: 'MCP_TOOL_QUOTA_EXCEEDED',
  MCP_CODE_MODE_UNAVAILABLE: 'MCP_CODE_MODE_UNAVAILABLE',
  MCP_CODE_MODE_EXECUTION_FAILED: 'MCP_CODE_MODE_EXECUTION_FAILED',
  MCP_OAUTH_INVALID_CLIENT: 'MCP_OAUTH_INVALID_CLIENT',
  MCP_OAUTH_INVALID_GRANT: 'MCP_OAUTH_INVALID_GRANT',
  MCP_OAUTH_UNSUPPORTED_GRANT: 'MCP_OAUTH_UNSUPPORTED_GRANT',
  MCP_OAUTH_TOKEN_EXPIRED: 'MCP_OAUTH_TOKEN_EXPIRED',
  MCP_OAUTH_TOKEN_INVALID: 'MCP_OAUTH_TOKEN_INVALID',
  CLAIM_CODE_INVALID: 'CLAIM_CODE_INVALID',
  CLAIM_CODE_USED: 'CLAIM_CODE_USED',
  CLAIM_CODE_EXPIRED: 'CLAIM_CODE_EXPIRED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  INTERNAL_AUTH_FAILED: 'INTERNAL_AUTH_FAILED',
} as const;

export type ErrorCode = (typeof ERRORS)[keyof typeof ERRORS];

export type ErrorDetail = { path: string; message: string };

type CryptFlareErrorInit = {
  message: string;
  code?: ErrorCode | string | null;
  status?: number;
  requestId?: string;
  retryAfterMs?: number;
  headers?: Record<string, string>;
  details?: ErrorDetail[];
  cause?: unknown;
};

/** Abstract base for every error the SDK throws. */
export abstract class CryptFlareError extends Error {
  readonly code: ErrorCode | string | null;
  readonly status?: number;
  readonly requestId?: string;
  readonly retryAfterMs?: number;
  readonly headers?: Record<string, string>;
  readonly details?: ErrorDetail[];

  constructor(init: CryptFlareErrorInit) {
    super(init.message, init.cause !== undefined ? { cause: init.cause } : undefined);
    this.name = new.target.name;
    this.code = init.code ?? null;
    if (init.status !== undefined) this.status = init.status;
    if (init.requestId !== undefined) this.requestId = init.requestId;
    if (init.retryAfterMs !== undefined) this.retryAfterMs = init.retryAfterMs;
    if (init.headers !== undefined) this.headers = init.headers;
    if (init.details !== undefined) this.details = init.details;
  }
}

/** Raised before any request leaves the client - bad construct or per-call options. */
export class ConfigurationError extends CryptFlareError {
  constructor(message: string, cause?: unknown) {
    super({ message, code: 'configuration_error', cause });
  }
}

/** Network failure: DNS, TLS, connection refused, abort signalled by the runtime. */
export class ConnectionError extends CryptFlareError {
  constructor(message: string, cause?: unknown) {
    super({ message, code: 'connection_error', cause });
  }
}

/** Request exceeded the configured `timeoutMs`. */
export class TimeoutError extends CryptFlareError {
  constructor(message: string, cause?: unknown) {
    super({ message, code: 'timeout', cause });
  }
}

/** Server returned a non-2xx response. Concrete subclasses below. */
export abstract class APIError extends CryptFlareError {}

export class BadRequestError extends APIError {}             // 400
export class AuthenticationError extends APIError {}         // 401
export class PermissionDeniedError extends APIError {}       // 403
export class NotFoundError extends APIError {}               // 404
export class ConflictError extends APIError {}               // 409
export class UnprocessableEntityError extends APIError {}    // 422
export class RateLimitError extends APIError {}              // 429
export class InternalServerError extends APIError {}         // 5xx
export class UnknownAPIError extends APIError {}             // anything else

const STATUS_TO_CONSTRUCTOR: Record<number, new (init: CryptFlareErrorInit) => APIError> = {
  400: BadRequestError,
  401: AuthenticationError,
  403: PermissionDeniedError,
  404: NotFoundError,
  409: ConflictError,
  422: UnprocessableEntityError,
  429: RateLimitError,
};

function pickAPIErrorCtor(status: number): new (init: CryptFlareErrorInit) => APIError {
  if (STATUS_TO_CONSTRUCTOR[status]) return STATUS_TO_CONSTRUCTOR[status];
  if (status >= 500 && status < 600) return InternalServerError;
  return UnknownAPIError;
}

/**
 * Parses an `ApiException`-shaped response body. The API's contract
 * (`apps/api/src/lib/api-exception.ts`) returns `{ error, message, status,
 * details?, requestId, retryAfter? }`. Anything that fails to JSON-parse
 * still produces a typed APIError - we never lose the status, just the
 * structured fields.
 */
export async function mapResponseToError(
  response: Response,
  requestUrl: string,
): Promise<APIError> {
  const status = response.status;
  const requestId = response.headers.get('x-request-id') ?? undefined;
  const headers = headersToRecord(response.headers);

  let body: unknown = undefined;
  try {
    const text = await response.text();
    if (text.length > 0) body = JSON.parse(text);
  } catch {
    // Ignore parse failures - we still surface a typed error using only
    // status + headers below.
  }

  const code = readString(body, 'error');
  const message = readString(body, 'message')
    ?? `HTTP ${status} from ${requestUrl}`;
  const details = readDetails(body);
  const retryAfterMs = parseRetryAfter(response.headers, body);

  const Ctor = pickAPIErrorCtor(status);
  return new Ctor({
    message,
    code: code ?? null,
    status,
    requestId,
    headers,
    ...(retryAfterMs !== undefined ? { retryAfterMs } : {}),
    ...(details ? { details } : {}),
  });
}

function headersToRecord(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  headers.forEach((value, key) => { out[key.toLowerCase()] = value; });
  return out;
}

function readString(body: unknown, key: string): string | undefined {
  if (body && typeof body === 'object' && key in body) {
    const value = (body as Record<string, unknown>)[key];
    if (typeof value === 'string') return value;
  }
  return undefined;
}

function readDetails(body: unknown): ErrorDetail[] | undefined {
  if (!body || typeof body !== 'object' || !('details' in body)) return undefined;
  const raw = (body as Record<string, unknown>)['details'];
  if (!Array.isArray(raw)) return undefined;
  const out: ErrorDetail[] = [];
  for (const item of raw) {
    if (item && typeof item === 'object' && 'path' in item && 'message' in item) {
      const path = (item as Record<string, unknown>)['path'];
      const message = (item as Record<string, unknown>)['message'];
      if (typeof path === 'string' && typeof message === 'string') {
        out.push({ path, message });
      }
    }
  }
  return out.length ? out : undefined;
}

/**
 * Parses the `Retry-After` header per RFC 9110. Accepts either a delta in
 * seconds or an HTTP-date. Falls back to the `retryAfter` field in the
 * JSON body that the API ships on rate-limit responses.
 */
function parseRetryAfter(headers: Headers, body: unknown): number | undefined {
  const headerValue = headers.get('retry-after');
  if (headerValue) {
    const seconds = Number(headerValue);
    if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1_000;
    const date = Date.parse(headerValue);
    if (Number.isFinite(date)) {
      const delta = date - Date.now();
      if (delta > 0) return delta;
    }
  }
  if (body && typeof body === 'object' && 'retryAfter' in body) {
    const value = (body as Record<string, unknown>)['retryAfter'];
    if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
      return value * 1_000;
    }
  }
  return undefined;
}

