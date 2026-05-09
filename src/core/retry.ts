import {
  APIError,
  ConflictError,
  ConnectionError,
  CryptFlareError,
  ERRORS,
  RateLimitError,
  TimeoutError,
} from './errors';
import type { RetryOptions } from '../types/options';

export const DEFAULT_RETRY: Required<Omit<RetryOptions, 'shouldRetry'>> = {
  maxAttempts: 3,
  initialDelayMs: 500,
  maxDelayMs: 8_000,
};

/**
 * The retry matrix from `docs/standards/sdk/index.md`. The umbrella spec
 * mandates these exact statuses across every official SDK; the audit in
 * task 107 reads `packages/sdk/shared/retry-matrix.json` and verifies it
 * agrees with the constants here.
 */
const RETRYABLE_STATUSES = new Set<number>([408, 429, 500, 502, 503, 504]);

/**
 * Decides whether an error is worth another attempt. Network-level errors
 * (`ConnectionError`, `TimeoutError`) always retry; HTTP errors retry only
 * when the status sits in `RETRYABLE_STATUSES`. The `409` carve-out is
 * intentional: only `IDEMPOTENCY_KEY_COLLISION` retries (the server has
 * already told us a different body shipped under the same key, but the
 * SDK regenerates the key per attempt only when the caller chose
 * auto-idempotency, so this is a safe retry).
 */
export function defaultShouldRetry(error: CryptFlareError): boolean {
  if (error instanceof ConnectionError || error instanceof TimeoutError) return true;
  if (!(error instanceof APIError)) return false;
  if (error.status === undefined) return false;
  if (RETRYABLE_STATUSES.has(error.status)) return true;
  if (error instanceof ConflictError && error.code === ERRORS.IDEMPOTENCY_KEY_COLLISION) {
    return true;
  }
  return false;
}

/**
 * Computes the delay before attempt N. Honours `Retry-After` when the
 * server set it (rate limits, planned maintenance), otherwise uses full
 * jitter exponential backoff:
 *
 *   delay = random(0, min(cap, base * 2 ^ attempt))
 *
 * Full jitter (vs equal jitter or no jitter) prevents thundering-herd
 * retries when a fleet of clients hits a transient outage in lockstep.
 */
export function computeBackoffMs(
  attempt: number,
  initialDelayMs: number,
  maxDelayMs: number,
  error: CryptFlareError,
): number {
  if (error instanceof RateLimitError && typeof error.retryAfterMs === 'number') {
    return Math.min(error.retryAfterMs, maxDelayMs);
  }
  const exp = initialDelayMs * 2 ** attempt;
  const cap = Math.min(maxDelayMs, exp);
  return Math.floor(Math.random() * cap);
}

export function resolveRetryConfig(
  retry: RetryOptions | false | undefined,
): { maxAttempts: number; initialDelayMs: number; maxDelayMs: number; shouldRetry: (e: CryptFlareError, attempt: number) => boolean } {
  if (retry === false) {
    return {
      maxAttempts: 1,
      initialDelayMs: DEFAULT_RETRY.initialDelayMs,
      maxDelayMs: DEFAULT_RETRY.maxDelayMs,
      shouldRetry: () => false,
    };
  }
  return {
    maxAttempts: retry?.maxAttempts ?? DEFAULT_RETRY.maxAttempts,
    initialDelayMs: retry?.initialDelayMs ?? DEFAULT_RETRY.initialDelayMs,
    maxDelayMs: retry?.maxDelayMs ?? DEFAULT_RETRY.maxDelayMs,
    shouldRetry: retry?.shouldRetry ?? defaultShouldRetry,
  };
}

export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const onAbort = () => {
      cleanup();
      reject(new ConnectionError('Aborted while waiting to retry.'));
    };

    function cleanup() {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    }

    if (signal?.aborted) onAbort();
    else signal?.addEventListener('abort', onAbort);
  });
}
