import type { ErrorCode } from './error-codes'
import { readPath, readString } from './guards'

/**
 * Registry of every error code the API can emit. Generated from
 * `@cryptflare/shared/constants/errors` by `scripts/gen-error-codes.mjs`;
 * `tests/core/error-codes.test.ts` fails on drift.
 */
export { ERRORS, type ErrorCode } from './error-codes'

export type ErrorDetail = { path: string; message: string }

type CryptFlareErrorInit = {
  message: string
  code?: ErrorCode | string | null
  status?: number
  requestId?: string | undefined
  retryAfterMs?: number | undefined
  headers?: Record<string, string>
  details?: ErrorDetail[]
  cause?: unknown
}

/** Abstract base for every error the SDK throws. */
export abstract class CryptFlareError extends Error {
  readonly code: ErrorCode | string | null
  readonly status?: number
  readonly requestId?: string
  readonly retryAfterMs?: number
  readonly headers?: Record<string, string>
  readonly details?: ErrorDetail[]

  constructor(init: CryptFlareErrorInit) {
    super(init.message, init.cause !== undefined ? { cause: init.cause } : undefined)
    this.name = new.target.name
    this.code = init.code ?? null
    if (init.status !== undefined) this.status = init.status
    if (init.requestId !== undefined) this.requestId = init.requestId
    if (init.retryAfterMs !== undefined) this.retryAfterMs = init.retryAfterMs
    if (init.headers !== undefined) this.headers = init.headers
    if (init.details !== undefined) this.details = init.details
  }
}

/** Raised before any request leaves the client - bad construct or per-call options. */
export class ConfigurationError extends CryptFlareError {
  constructor(message: string, cause?: unknown) {
    super({ message, code: 'configuration_error', cause })
  }
}

/** Network failure: DNS, TLS, connection refused, or an abort the caller did not ask for. */
export class ConnectionError extends CryptFlareError {
  constructor(message: string, cause?: unknown) {
    super({ message, code: 'connection_error', cause })
  }
}

/**
 * The caller's `AbortSignal` fired, either mid-request or while the SDK was
 * waiting to retry. Never retried. `cause` carries the signal's reason.
 */
export class RequestAbortedError extends CryptFlareError {
  constructor(message: string, cause?: unknown) {
    super({ message, code: 'request_aborted', cause })
  }
}

/**
 * An end-to-end encrypted envelope could not be parsed or decrypted: wrong
 * shape, unsupported version or algorithm, or a key that does not match.
 */
export class EnvelopeError extends CryptFlareError {
  constructor(message: string, cause?: unknown) {
    super({ message, code: 'envelope_invalid', cause })
  }
}

/** Request exceeded the configured `timeoutMs`. */
export class TimeoutError extends CryptFlareError {
  constructor(message: string, cause?: unknown) {
    super({ message, code: 'timeout', cause })
  }
}

/** Server returned a non-2xx response. Concrete subclasses below. */
export abstract class APIError extends CryptFlareError {}

export class BadRequestError extends APIError {} // 400
export class AuthenticationError extends APIError {} // 401
export class PermissionDeniedError extends APIError {} // 403
export class NotFoundError extends APIError {} // 404
export class ConflictError extends APIError {} // 409
export class UnprocessableEntityError extends APIError {} // 422
export class RateLimitError extends APIError {} // 429
export class InternalServerError extends APIError {} // 5xx
export class UnknownAPIError extends APIError {} // anything else

const STATUS_TO_CONSTRUCTOR: Record<number, new (init: CryptFlareErrorInit) => APIError> = {
  400: BadRequestError,
  401: AuthenticationError,
  403: PermissionDeniedError,
  404: NotFoundError,
  409: ConflictError,
  422: UnprocessableEntityError,
  429: RateLimitError,
}

function pickAPIErrorCtor(status: number): new (init: CryptFlareErrorInit) => APIError {
  if (STATUS_TO_CONSTRUCTOR[status]) return STATUS_TO_CONSTRUCTOR[status]
  if (status >= 500 && status < 600) return InternalServerError
  return UnknownAPIError
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
  const status = response.status
  const requestId = response.headers.get('x-request-id') ?? undefined
  const headers = headersToRecord(response.headers)

  let body: unknown = undefined
  try {
    const text = await response.text()
    if (text.length > 0) body = JSON.parse(text)
  } catch {
    // Ignore parse failures - we still surface a typed error using only
    // status + headers below.
  }

  const code = readString(body, 'error')
  const message = readString(body, 'message') ?? `HTTP ${status} from ${requestUrl}`
  const details = readDetails(body)
  const retryAfterMs = parseRetryAfter(response.headers, body)

  const Ctor = pickAPIErrorCtor(status)
  return new Ctor({
    message,
    code: code ?? null,
    status,
    requestId,
    headers,
    ...(retryAfterMs !== undefined ? { retryAfterMs } : {}),
    ...(details ? { details } : {}),
  })
}

function headersToRecord(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {}
  headers.forEach((value, key) => {
    out[key.toLowerCase()] = value
  })
  return out
}

function readDetails(body: unknown): ErrorDetail[] | undefined {
  const raw = readPath(body, 'details')
  if (!Array.isArray(raw)) return undefined
  const out: ErrorDetail[] = []
  for (const item of raw) {
    const path = readString(item, 'path')
    const message = readString(item, 'message')
    if (path !== undefined && message !== undefined) out.push({ path, message })
  }
  return out.length ? out : undefined
}

/**
 * Parses the `Retry-After` header per RFC 9110. Accepts either a delta in
 * seconds or an HTTP-date. Falls back to the `retryAfter` field in the
 * JSON body that the API ships on rate-limit responses.
 */
function parseRetryAfter(headers: Headers, body: unknown): number | undefined {
  const headerValue = headers.get('retry-after')
  if (headerValue) {
    const seconds = Number(headerValue)
    if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1_000
    const date = Date.parse(headerValue)
    if (Number.isFinite(date)) {
      const delta = date - Date.now()
      if (delta > 0) return delta
    }
  }
  const value = readPath(body, 'retryAfter')
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
    return value * 1_000
  }
  return undefined
}
