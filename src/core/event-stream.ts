import { ConnectionError } from './errors';
import { parseSSE, type ServerEvent } from './streaming';

export type EventStreamOptions<T> = {
  /** Maps a raw `ServerEvent` to a typed `T`. Return `null` to skip. */
  parse: (event: ServerEvent) => T | null;
  /** Forwarded so callers can cancel the stream cleanly. */
  signal?: AbortSignal;
};

/**
 * Typed wrapper over `parseSSE`. Resources expose a method that returns
 * `EventStream<T>` and the caller iterates with `for await`. Aborting the
 * supplied signal cancels the underlying response body so the connection
 * is closed without further reads.
 */
export class EventStream<T> implements AsyncIterable<T> {
  private readonly stream: ReadableStream<Uint8Array>;
  private readonly parse: (event: ServerEvent) => T | null;
  private readonly signal: AbortSignal | undefined;
  private cancelled = false;
  /** Last seen `id:` field. Mirrored as `Last-Event-ID` if the caller resubscribes. */
  lastEventId: string | undefined;

  constructor(stream: ReadableStream<Uint8Array>, options: EventStreamOptions<T>) {
    this.stream = stream;
    this.parse = options.parse;
    this.signal = options.signal;

    if (options.signal) {
      const onAbort = () => this.close();
      if (options.signal.aborted) onAbort();
      else options.signal.addEventListener('abort', onAbort, { once: true });
    }
  }

  /** Cancels the underlying stream. Idempotent. */
  close(): void {
    if (this.cancelled) return;
    this.cancelled = true;
    void this.stream.cancel().catch(() => {
      // Cancel after the stream already closed throws; harmless.
    });
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<T> {
    try {
      for await (const event of parseSSE(this.stream)) {
        if (this.cancelled || this.signal?.aborted) break;
        if (event.id !== undefined) this.lastEventId = event.id;
        const parsed = this.parse(event);
        if (parsed !== null) yield parsed;
      }
    } catch (cause) {
      if (cause instanceof ConnectionError) throw cause;
      throw new ConnectionError('Stream parse failed.', cause);
    } finally {
      this.close();
    }
  }
}
