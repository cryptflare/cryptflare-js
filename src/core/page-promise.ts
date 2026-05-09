import type { CursorPage } from './pagination';

/**
 * A `Promise<CursorPage<T>>` that also implements `AsyncIterable<T>`.
 *
 * Lets callers either await + paginate manually, or skip the await and
 * iterate items directly. Both shapes are correct.
 *
 * ```ts
 * // 1. As a Promise - await first, then paginate.
 * const page = await client.secrets.list();
 * for (const secret of page.data) ...
 *
 * // 2. As an iterable - flat, transparent across all pages.
 * for await (const secret of client.secrets.list()) ...
 * ```
 *
 * Without this wrapper, callers had to write
 * `for await (const x of (await client.secrets.list()))` because plain
 * `Promise<AsyncIterable>` is not itself iterable.
 */
export class PagePromise<T> extends Promise<CursorPage<T>> implements AsyncIterable<T> {
  static get [Symbol.species]() {
    // Inherited Promise methods (`then`, `catch`, `finally`) build new
    // promises - returning the base Promise constructor here keeps them
    // as plain promises, not PagePromise. The page promise contract only
    // applies to the original list() call.
    return Promise;
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<T> {
    const page = await this;
    yield* page;
  }
}
