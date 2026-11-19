import { describe, expect, it } from 'vitest'

import {
  AuthenticationError,
  BadRequestError,
  ConflictError,
  ConnectionError,
  InternalServerError,
  NotFoundError,
  PermissionDeniedError,
  RateLimitError,
  TimeoutError,
  ERRORS,
  UnprocessableEntityError,
} from '@/core/errors'
import { computeBackoffMs, defaultShouldRetry, resolveRetryConfig } from '@/core/retry'

type ApiCtor = new (init: {
  message: string
  status: number
  code?: string | null
}) => InternalServerError

function api(Ctor: ApiCtor, status: number, code?: string): InternalServerError {
  return new Ctor({ message: 'x', status, code: code ?? null })
}

describe('defaultShouldRetry', () => {
  it('retries on network failures', () => {
    expect(defaultShouldRetry(new ConnectionError('x'))).toBe(true)
    expect(defaultShouldRetry(new TimeoutError('x'))).toBe(true)
  })

  it('retries on 408, 429, 500, 502, 503, 504', () => {
    for (const s of [408, 429, 500, 502, 503, 504]) {
      expect(defaultShouldRetry(api(InternalServerError, s))).toBe(true)
    }
  })

  it('does not retry on 400, 401, 403, 404, 422', () => {
    expect(defaultShouldRetry(api(BadRequestError, 400))).toBe(false)
    expect(defaultShouldRetry(api(AuthenticationError, 401))).toBe(false)
    expect(defaultShouldRetry(api(PermissionDeniedError, 403))).toBe(false)
    expect(defaultShouldRetry(api(NotFoundError, 404))).toBe(false)
    expect(defaultShouldRetry(api(UnprocessableEntityError, 422))).toBe(false)
  })

  it('retries 409 only when code is IDEMPOTENCY_KEY_COLLISION', () => {
    expect(defaultShouldRetry(api(ConflictError, 409))).toBe(false)
    expect(defaultShouldRetry(api(ConflictError, 409, ERRORS.IDEMPOTENCY_KEY_COLLISION))).toBe(true)
  })
})

describe('computeBackoffMs', () => {
  it('respects retryAfterMs on RateLimitError, plus a grace second', () => {
    const err = new RateLimitError({ message: 'slow', status: 429, retryAfterMs: 2_000 })
    // Retry-After is whole seconds, so waking at exactly the stated instant
    // can still be inside the window.
    expect(computeBackoffMs(0, 500, 8_000, err)).toBe(3_000)
  })

  it('waits out a Retry-After longer than maxDelayMs', () => {
    // The regression that broke `cf sync`: the reveal limiter answers 429 with
    // "retry in 27s", and clamping that to maxDelayMs (8s) woke the client
    // inside the closed window, so all three attempts failed. maxDelayMs caps
    // invented backoff; it must not override the server.
    const err = new RateLimitError({ message: 'slow', status: 429, retryAfterMs: 27_000 })
    expect(computeBackoffMs(0, 500, 8_000, err)).toBe(28_000)
  })

  it('still bounds the wait by maxRetryAfterMs', () => {
    const err = new RateLimitError({ message: 'slow', status: 429, retryAfterMs: 3_600_000 })
    expect(computeBackoffMs(0, 500, 8_000, err, 60_000)).toBe(60_000)
  })

  it('produces a random value within [0, min(cap, base * 2^attempt)] on transport errors', () => {
    const err = new ConnectionError('x')
    for (let i = 0; i < 50; i += 1) {
      const ms = computeBackoffMs(2, 500, 8_000, err)
      expect(ms).toBeGreaterThanOrEqual(0)
      expect(ms).toBeLessThan(2_000)
    }
  })
})

describe('resolveRetryConfig', () => {
  it('returns single-attempt config when retry is false', () => {
    const cfg = resolveRetryConfig(false)
    expect(cfg.maxAttempts).toBe(1)
    expect(cfg.shouldRetry(new ConnectionError('x'), 0)).toBe(false)
  })

  it('retries a rate limit whose window reopens within the ceiling', () => {
    const cfg = resolveRetryConfig(undefined)
    const err = new RateLimitError({ message: 'slow', status: 429, retryAfterMs: 27_000 })
    expect(cfg.shouldRetry(err, 0)).toBe(true)
  })

  it('gives up rather than sleeping past the ceiling', () => {
    // Sleeping ten minutes inside a call the caller is awaiting is worse than
    // handing them the rate limit to schedule around.
    const cfg = resolveRetryConfig({ maxRetryAfterMs: 60_000 })
    const err = new RateLimitError({ message: 'slow', status: 429, retryAfterMs: 600_000 })
    expect(cfg.shouldRetry(err, 0)).toBe(false)
  })

  it('does not consult a caller predicate once the ceiling is exceeded', () => {
    const cfg = resolveRetryConfig({ maxRetryAfterMs: 5_000, shouldRetry: () => true })
    const err = new RateLimitError({ message: 'slow', status: 429, retryAfterMs: 90_000 })
    expect(cfg.shouldRetry(err, 0)).toBe(false)
  })

  it('applies provided overrides', () => {
    const cfg = resolveRetryConfig({ maxAttempts: 5, initialDelayMs: 100, maxDelayMs: 1_000 })
    expect(cfg.maxAttempts).toBe(5)
    expect(cfg.initialDelayMs).toBe(100)
    expect(cfg.maxDelayMs).toBe(1_000)
  })

  it('falls back to defaults when keys are missing', () => {
    const cfg = resolveRetryConfig({})
    expect(cfg.maxAttempts).toBe(3)
    expect(cfg.initialDelayMs).toBe(500)
    expect(cfg.maxDelayMs).toBe(8_000)
  })
})
