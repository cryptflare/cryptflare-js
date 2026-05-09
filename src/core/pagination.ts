import type { RequestOptions } from '../types/options';

export type PageEnvelope<T> = {
  data: T[];
  /** Opaque cursor returned by the server. `null` or absent on the last page. */
  nextCursor?: string | null;
  hasMore?: boolean;
};

type Fetcher<T> = (cursor: string | undefined, options: RequestOptions | undefined) => Promise<PageEnvelope<T>>;

/**
 * Cursor-based page wrapper. Iterates lazily so callers paginate without
 * building manual loops:
 *
 *   for await (const secret of client.secrets.list({...})) { ... }
 *
 * Or by hand:
 *
 *   const page = await client.secrets.list({...});
 *   const next = await page.getNextPage();
 *
 * Cursors are opaque - parsing them in client code is forbidden by the
 * cross-language contract. The SDK forwards them verbatim.
 */
export class CursorPage<T> implements AsyncIterable<T> {
  readonly data: T[];
  readonly nextCursor: string | null;
  readonly hasNextPage: boolean;

  private readonly fetcher: Fetcher<T>;
  private readonly initialOptions: RequestOptions | undefined;

  constructor(envelope: PageEnvelope<T>, fetcher: Fetcher<T>, initialOptions?: RequestOptions) {
    this.data = envelope.data;
    this.nextCursor = envelope.nextCursor ?? null;
    this.hasNextPage = envelope.hasMore ?? this.nextCursor !== null;
    this.fetcher = fetcher;
    this.initialOptions = initialOptions;
  }

  /** Fetches the next page or returns `null` when there are no more results. */
  async getNextPage(): Promise<CursorPage<T> | null> {
    if (!this.hasNextPage || this.nextCursor === null) return null;
    const envelope = await this.fetcher(this.nextCursor, this.initialOptions);
    return new CursorPage<T>(envelope, this.fetcher, this.initialOptions);
  }

  /** Async generator over every page following this one (inclusive of self). */
  async *iterPages(): AsyncGenerator<CursorPage<T>> {
    let current: CursorPage<T> | null = this;
    while (current !== null) {
      yield current;
      current = await current.getNextPage();
    }
  }

  /** Default async iterator yields individual records across every page. */
  async *[Symbol.asyncIterator](): AsyncGenerator<T> {
    for await (const page of this.iterPages()) {
      for (const item of page.data) yield item;
    }
  }
}
