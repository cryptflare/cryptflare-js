import type { CryptFlareError } from '../core/errors';

/** HTTP verbs the SDK emits. Mutating verbs auto-attach an idempotency key. */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Resolved credential. The SDK accepts exactly one of these at construct
 * time. The constructor throws `ConfigurationError` when zero or multiple
 * are supplied.
 */
export type Credential =
  | { kind: 'apiKey'; value: string }
  | { kind: 'serviceToken'; value: string }
  | { kind: 'getToken'; value: () => string | Promise<string> };

export type RetryOptions = {
  /** Total attempts including the first. Default 3. */
  maxAttempts?: number;
  /** Base of the exponential backoff in ms. Default 500. */
  initialDelayMs?: number;
  /** Cap on backoff in ms. Default 8_000. */
  maxDelayMs?: number;
  /**
   * Predicate evaluated before each retry. When provided, overrides the
   * default retry-matrix decision. Return true to retry, false to give up.
   */
  shouldRetry?: (error: CryptFlareError, attempt: number) => boolean;
};

export type RequestEvent = {
  method: HttpMethod;
  path: string;
  url: string;
  /** Always pre-redacted - no `Authorization` value reaches the hook. */
  headers: Record<string, string>;
  attempt: number;
  requestId: string;
};

export type ResponseEvent = {
  method: HttpMethod;
  path: string;
  url: string;
  status: number;
  durationMs: number;
  requestId: string;
};

export type RetryEvent = {
  attempt: number;
  delayMs: number;
  error: CryptFlareError;
};

export type ClientHooks = {
  onRequest?: (event: RequestEvent) => void | Promise<void>;
  onResponse?: (event: ResponseEvent) => void | Promise<void>;
  onRetry?: (event: RetryEvent) => void | Promise<void>;
};

export type ClientOptions = {
  /** Personal access token. Mutually exclusive with `serviceToken` and `getToken`. */
  apiKey?: string;
  /** Service token. Mutually exclusive with `apiKey` and `getToken`. */
  serviceToken?: string;
  /** Async credential resolver. Use for refreshable tokens. */
  getToken?: () => string | Promise<string>;

  /** Default organisation slug used when methods omit it. */
  organisation?: string;
  /** Default workspace slug used when methods omit it. */
  workspace?: string;
  /** Default environment slug used when methods omit it. */
  environment?: string;

  /** Override base URL. Defaults to https://api.cryptflare.com. */
  baseUrl?: string;
  /** Per-request timeout in ms. Defaults to 60_000. */
  timeoutMs?: number;
  /** Retry policy. Pass `false` to disable retries entirely. */
  retry?: RetryOptions | false;
  /** Custom fetch (tests, proxies, edge runtimes). Defaults to globalThis.fetch. */
  fetch?: typeof fetch;
  /** Lifecycle hooks. */
  hooks?: ClientHooks;
  /** Required to construct from a browser context. */
  dangerouslyAllowBrowser?: boolean;
  /** Appended to the default User-Agent string. */
  userAgentSuffix?: string;
};

/**
 * Per-call overrides. Anything set here wins over the equivalent option on
 * the client. Reserved headers (`Authorization`, `User-Agent`,
 * `Idempotency-Key`, `Content-Type`) cannot be overridden via `headers`.
 */
export type RequestOptions = {
  signal?: AbortSignal;
  timeoutMs?: number;
  headers?: Record<string, string>;
  /** Override the auto-generated idempotency key for one mutating call. */
  idempotencyKey?: string;
  /** Disable retries for this single call. */
  retry?: RetryOptions | false;
};
