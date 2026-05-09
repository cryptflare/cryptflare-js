import { ConnectionError, TimeoutError } from './errors';

/**
 * Single point of contact with `fetch`. Composes a per-call abort signal
 * (timeout) with the caller-supplied signal so either can cancel the
 * request, and translates platform errors into typed SDK errors so the
 * retry loop branches on a stable taxonomy.
 */
export async function performFetch(
  fetchImpl: typeof fetch,
  url: string,
  init: RequestInit,
  options: { timeoutMs: number; signal?: AbortSignal },
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error('SDK timeout reached')), options.timeoutMs);

  // The caller's signal forwards aborts into our own controller so the
  // user-facing AbortSignal cancels in-flight retries cleanly.
  const userSignal = options.signal;
  const onUserAbort = () => controller.abort(userSignal?.reason ?? new Error('Caller aborted'));
  if (userSignal) {
    if (userSignal.aborted) onUserAbort();
    else userSignal.addEventListener('abort', onUserAbort);
  }

  try {
    return await fetchImpl(url, { ...init, signal: controller.signal });
  } catch (cause) {
    if (controller.signal.aborted) {
      const reason = controller.signal.reason;
      const isTimeout = reason instanceof Error && reason.message.includes('timeout');
      if (isTimeout) {
        throw new TimeoutError(`Request to ${url} timed out after ${options.timeoutMs}ms.`, cause);
      }
      throw new ConnectionError(`Request to ${url} was aborted.`, cause);
    }
    throw new ConnectionError(`Network error talking to ${url}: ${describe(cause)}`, cause);
  } finally {
    clearTimeout(timer);
    userSignal?.removeEventListener('abort', onUserAbort);
  }
}

function describe(value: unknown): string {
  if (value instanceof Error) return value.message;
  if (typeof value === 'string') return value;
  return 'unknown error';
}
