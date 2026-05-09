import { fetchBearerToken } from './credentials';
import {
  ConfigurationError,
  CryptFlareError,
  mapResponseToError,
} from './errors';
import { normaliseHeaders, redactHeaders } from './headers';
import { isMutatingVerb, newIdempotencyKey } from './idempotency';
import { computeBackoffMs, resolveRetryConfig, sleep } from './retry';
import { getUserAgent } from './runtime';
import { performFetch } from './transport';
import type {
  Credential,
  ClientHooks,
  HttpMethod,
  RequestOptions,
  RetryOptions,
} from '../types/options';

const RESERVED_HEADERS = new Set([
  'authorization',
  'user-agent',
  'idempotency-key',
  'content-type',
]);

export type RequestDescriptor = {
  method: HttpMethod;
  /** Path relative to `baseUrl`, including any leading `/v1/`. Query is encoded separately. */
  path: string;
  /** Query parameters. Arrays repeat the key; nullish values are dropped. */
  query?: Record<string, string | number | boolean | null | undefined | Array<string | number | boolean>>;
  /** JSON body. Stringified once, only when present. */
  body?: unknown;
};

export type RequestRunnerConfig = {
  baseUrl: string;
  timeoutMs: number;
  retry: RetryOptions | false;
  fetchImpl: typeof fetch;
  credential: Credential;
  hooks: ClientHooks;
  userAgentSuffix?: string;
};

/**
 * The single place fetch is called. Everything in `core/` and every
 * resource method funnels into `runRequest()` so retry, idempotency,
 * error mapping, and hook redaction are guaranteed once and only once.
 */
export class RequestRunner {
  constructor(private readonly config: RequestRunnerConfig) {}

  async send<T>(descriptor: RequestDescriptor, callOptions?: RequestOptions): Promise<T> {
    const url = this.buildUrl(descriptor);
    const retry = resolveRetryConfig(callOptions?.retry ?? this.config.retry);
    const idempotencyKey = this.resolveIdempotencyKey(descriptor.method, callOptions);
    const timeoutMs = callOptions?.timeoutMs ?? this.config.timeoutMs;
    const requestId = newIdempotencyKey(); // reused as a client-side correlation id only

    let lastError: CryptFlareError | undefined;
    for (let attempt = 0; attempt < retry.maxAttempts; attempt += 1) {
      try {
        const headers = await this.buildHeaders(descriptor.method, callOptions, idempotencyKey, requestId);
        await safeHook(this.config.hooks.onRequest, {
          method: descriptor.method,
          path: descriptor.path,
          url,
          headers: redactHeaders(headers),
          attempt,
          requestId,
        });

        const startedAt = Date.now();
        const response = await performFetch(
          this.config.fetchImpl,
          url,
          this.buildInit(descriptor, headers),
          { timeoutMs, ...(callOptions?.signal !== undefined ? { signal: callOptions.signal } : {}) },
        );
        const durationMs = Date.now() - startedAt;

        await safeHook(this.config.hooks.onResponse, {
          method: descriptor.method,
          path: descriptor.path,
          url,
          status: response.status,
          durationMs,
          requestId: response.headers.get('x-request-id') ?? requestId,
        });

        if (response.ok) return await parseResponse<T>(response);

        const error = await mapResponseToError(response, url);
        lastError = error;
        if (!retry.shouldRetry(error, attempt) || attempt === retry.maxAttempts - 1) {
          throw error;
        }
        await this.delayBeforeRetry(attempt, retry, error, callOptions);
      } catch (err) {
        if (err instanceof CryptFlareError) {
          lastError = err;
          if (!retry.shouldRetry(err, attempt) || attempt === retry.maxAttempts - 1) {
            throw err;
          }
          await this.delayBeforeRetry(attempt, retry, err, callOptions);
          continue;
        }
        throw err;
      }
    }

    // Defensive: the loop only exits via `throw` or `return`, but typing
    // requires a final statement.
    throw lastError ?? new ConfigurationError('Retry loop exited without an error or response.');
  }

  /**
   * Streaming variant of `send`. Skips JSON parsing and retries because
   * once the response body is committed, retrying would replay only the
   * bytes already buffered. Caller is responsible for closing the stream
   * (the `EventStream` wrapper does this automatically on iteration end
   * or abort).
   */
  async stream(descriptor: RequestDescriptor, callOptions?: RequestOptions): Promise<ReadableStream<Uint8Array>> {
    const url = this.buildUrl(descriptor);
    const idempotencyKey = this.resolveIdempotencyKey(descriptor.method, callOptions);
    const timeoutMs = callOptions?.timeoutMs ?? this.config.timeoutMs;
    const requestId = newIdempotencyKey();

    const headers = await this.buildHeaders(descriptor.method, callOptions, idempotencyKey, requestId);
    headers['accept'] = 'text/event-stream';

    await safeHook(this.config.hooks.onRequest, {
      method: descriptor.method,
      path: descriptor.path,
      url,
      headers: redactHeaders(headers),
      attempt: 0,
      requestId,
    });

    const response = await performFetch(
      this.config.fetchImpl,
      url,
      this.buildInit(descriptor, headers),
      { timeoutMs, ...(callOptions?.signal !== undefined ? { signal: callOptions.signal } : {}) },
    );

    if (!response.ok) {
      const error = await mapResponseToError(response, url);
      throw error;
    }
    if (!response.body) {
      throw new ConfigurationError(`Streaming request to ${url} returned no body.`);
    }
    return response.body;
  }

  private buildUrl(descriptor: RequestDescriptor): string {
    const trimmedBase = this.config.baseUrl.replace(/\/+$/, '');
    const path = descriptor.path.startsWith('/') ? descriptor.path : `/${descriptor.path}`;
    const url = `${trimmedBase}${path}`;
    if (!descriptor.query) return url;

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(descriptor.query)) {
      if (value === undefined || value === null) continue;
      if (Array.isArray(value)) {
        for (const item of value) params.append(key, String(item));
      } else {
        params.set(key, String(value));
      }
    }
    const qs = params.toString();
    return qs.length === 0 ? url : `${url}?${qs}`;
  }

  private buildInit(descriptor: RequestDescriptor, headers: Record<string, string>): RequestInit {
    const init: RequestInit = { method: descriptor.method, headers };
    if (descriptor.body !== undefined && descriptor.method !== 'GET') {
      init.body = JSON.stringify(descriptor.body);
    }
    return init;
  }

  private async buildHeaders(
    method: HttpMethod,
    callOptions: RequestOptions | undefined,
    idempotencyKey: string | undefined,
    requestId: string,
  ): Promise<Record<string, string>> {
    const userHeaders = normaliseHeaders(callOptions?.headers);
    for (const reserved of RESERVED_HEADERS) {
      if (userHeaders[reserved] !== undefined) {
        throw new ConfigurationError(`Header "${reserved}" is reserved by the SDK and cannot be overridden.`);
      }
    }

    const token = await fetchBearerToken(this.config.credential);
    const headers: Record<string, string> = {
      ...userHeaders,
      accept: 'application/json',
      'content-type': 'application/json',
      'user-agent': getUserAgent(this.config.userAgentSuffix),
      authorization: `Bearer ${token}`,
      'x-cryptflare-request-id': requestId,
    };

    if (idempotencyKey !== undefined && method !== 'GET') {
      headers['idempotency-key'] = idempotencyKey;
    }

    return headers;
  }

  private resolveIdempotencyKey(
    method: HttpMethod,
    callOptions: RequestOptions | undefined,
  ): string | undefined {
    if (!isMutatingVerb(method)) return undefined;
    if (callOptions?.idempotencyKey !== undefined) return callOptions.idempotencyKey;
    // Auto-generate only when retries are enabled. Without retries the
    // server's idempotency cache buys nothing; emitting a key would still
    // be harmless but adds bytes.
    const retryDisabled = callOptions?.retry === false || this.config.retry === false;
    if (retryDisabled) return undefined;
    return newIdempotencyKey();
  }

  private async delayBeforeRetry(
    attempt: number,
    retry: ReturnType<typeof resolveRetryConfig>,
    error: CryptFlareError,
    callOptions: RequestOptions | undefined,
  ): Promise<void> {
    const delayMs = computeBackoffMs(attempt, retry.initialDelayMs, retry.maxDelayMs, error);
    await safeHook(this.config.hooks.onRetry, {
      attempt,
      delayMs,
      error,
    });
    await sleep(delayMs, callOptions?.signal);
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('json')) return undefined as T;
  const text = await response.text();
  if (text.length === 0) return undefined as T;
  return JSON.parse(text) as T;
}

async function safeHook<T>(hook: ((event: T) => void | Promise<void>) | undefined, event: T): Promise<void> {
  if (!hook) return;
  try {
    await hook(event);
  } catch {
    // Hook failures must never break a request. Drop quietly; the caller
    // can wire their own error reporting from inside the hook.
  }
}
