import type { CursorPage, PageEnvelope } from '../core/pagination';
import { CursorPage as CursorPageImpl } from '../core/pagination';
import { PagePromise } from '../core/page-promise';
import type { RequestRunner, RequestDescriptor } from '../core/request';
import type { RequestOptions } from '../types/options';

/**
 * Base class every resource extends. Resources own one job: build a
 * `RequestDescriptor` and forward it to the runner. They never call
 * `fetch`, never compose headers, never branch on retry policy. Anything
 * cross-cutting belongs in `core/`.
 */
export type ResourceDefaults = {
  organisation?: string;
  workspace?: string;
  environment?: string;
};

export abstract class APIResource {
  protected readonly runner: RequestRunner;
  protected readonly defaults: ResourceDefaults;

  constructor(runner: RequestRunner, defaults: ResourceDefaults) {
    this.runner = runner;
    this.defaults = defaults;
  }

  protected request<T>(descriptor: RequestDescriptor, options?: RequestOptions): Promise<T> {
    return this.runner.send<T>(descriptor, options);
  }

  /**
   * Sends a request whose JSON response is wrapped in `{ data: T }` and
   * returns just the inner `T`. Most non-paginated CryptFlare endpoints
   * envelope their payload this way; using `request<T>()` directly would
   * leak the wrapper to callers.
   */
  protected async requestData<T>(descriptor: RequestDescriptor, options?: RequestOptions): Promise<T> {
    const response = await this.runner.send<{ data: T }>(descriptor, options);
    return response.data;
  }

  protected requestStream(descriptor: RequestDescriptor, options?: RequestOptions): Promise<ReadableStream<Uint8Array>> {
    return this.runner.stream(descriptor, options);
  }

  /**
   * Helper for paginated GET endpoints. The fetcher closure threads the
   * current cursor into the descriptor and calls `request<PageEnvelope<T>>`
   * so every resource gets the same iteration semantics for free.
   */
  protected paginate<T>(
    build: (cursor: string | undefined) => RequestDescriptor,
    options?: RequestOptions,
  ): PagePromise<T> {
    const fetcher = async (cursor: string | undefined, opts: RequestOptions | undefined) => {
      const descriptor = build(cursor);
      return await this.runner.send<PageEnvelope<T>>(descriptor, opts);
    };
    return new PagePromise<T>(async (resolve, reject) => {
      try {
        const initial = await fetcher(undefined, options);
        resolve(new CursorPageImpl<T>(initial, fetcher, options));
      } catch (err) {
        reject(err);
      }
    });
  }

  protected resolveScope(input: { organisation?: string; workspace?: string; environment?: string }): {
    organisation: string;
    workspace: string;
    environment: string;
  } {
    const organisation = input.organisation ?? this.defaults.organisation;
    const workspace = input.workspace ?? this.defaults.workspace;
    const environment = input.environment ?? this.defaults.environment;
    if (!organisation || !workspace || !environment) {
      throw new Error(
        'organisation, workspace, and environment slugs are required - pass them per call or set defaults on the client.',
      );
    }
    return { organisation, workspace, environment };
  }

  protected resolveOrg(input: { organisation?: string }): string {
    const organisation = input.organisation ?? this.defaults.organisation;
    if (!organisation) {
      throw new Error('An organisation slug is required - pass it per call or set a default on the client.');
    }
    return organisation;
  }

  protected resolveWorkspace(input: { organisation?: string; workspace?: string }): {
    organisation: string;
    workspace: string;
  } {
    const organisation = this.resolveOrg(input);
    const workspace = input.workspace ?? this.defaults.workspace;
    if (!workspace) {
      throw new Error('A workspace slug is required - pass it per call or set a default on the client.');
    }
    return { organisation, workspace };
  }
}

export const enc = encodeURIComponent;
