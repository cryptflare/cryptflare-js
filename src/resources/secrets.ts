import type { PagePromise } from '../core/page-promise';
import { APIResource } from './api-resource';
import type {
  BatchOperationResponse,
  BatchResult,
  RequestOptions,
  Scope,
  SecretCreateInput,
  SecretCreateResponse,
  SecretListItem,
  SecretMoveInput,
  SecretMoveResponse,
  SecretRevealResponse,
  SecretRollbackInput,
  SecretRollbackResponse,
  SecretRotateInput,
  SecretRotateResponse,
  SecretSettings,
  SecretVersion,
  SecretVersionsResponse,
  UpdateSecretSettingsInput,
  SecretRevealManyResponse,
} from '../types';

type ListInput = Scope & {
  podId?: string | null;
  cursor?: string;
};

type KeyInput = Scope & { key: string };

type RevealManyInput = {
  keys?: string[];
  podId?: string | null;
  format?: 'utf-8' | 'base64';
  /** Secrets per page when revealing a whole environment. */
  limit?: number;
  /** `nextCursor` from the previous page. */
  cursor?: string;
};

/** Upper bound on pages `revealAll` will follow, as a guard against a cursor loop. */
const MAX_REVEAL_PAGES = 1000;

type BatchCreateInput = Scope & {
  secrets: Array<{
    key: string;
    value: string;
    podId?: string | null;
    description?: string | null;
    metadata?: Record<string, string> | null;
  }>;
};

type BatchUpdateInput = Scope & {
  secrets: Array<{ key: string; value: string }>;
};

type BatchDeleteInput = Scope & { keys: string[] };

/**
 * Secrets resource. Methods map 1:1 to the routes mounted under
 *   /v1/organisations/:org/workspaces/:ws/environments/:env/secrets
 * Each method returns a typed payload; pagination uses `CursorPage` so
 * callers can `for await (const secret of secrets.list({...}))`.
 */
export class Secrets extends APIResource {
  /** GET / - list metadata; iterates pages automatically. */
  list(input: ListInput = {}, options?: RequestOptions): PagePromise<SecretListItem> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.paginate<SecretListItem>((cursor) => ({
      method: 'GET',
      path: basePath(organisation, workspace, environment),
      query: {
        ...(input.podId !== undefined ? { podId: input.podId === null ? 'root' : input.podId } : {}),
        ...(cursor ? { cursor } : input.cursor ? { cursor: input.cursor } : {}),
      },
    }), options);
  }

  /** GET /:key - reveal (decrypt). Server returns `{ data: {...} }`; SDK unwraps. */
  reveal(input: KeyInput, options?: RequestOptions): Promise<SecretRevealResponse> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.requestData<SecretRevealResponse>({
      method: 'GET',
      path: `${basePath(organisation, workspace, environment)}/${encodeURIComponent(input.key)}`,
    }, options);
  }

  /**
   * POST /reveal - decrypt many secrets in one request.
   *
   * Prefer this over looping `reveal()`: each single reveal is a full request
   * to decrypt one value.
   *
   * With `keys` (up to 100) it reveals exactly those. Without, it returns
   * one page of the environment and a `nextCursor`; pass that back as
   * `cursor` for the next page, or use {@link revealAll} to walk them all.
   *
   * The reveal budget is counted in secrets per minute per credential,
   * separately from the single-reveal limit.
   *
   * Keys travel in the body, never the query string, so they cannot land in
   * access logs or proxy history.
   */
  revealMany(
    input: Scope & RevealManyInput = {} as Scope,
    options?: RequestOptions,
  ): Promise<SecretRevealManyResponse> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.requestData<SecretRevealManyResponse>({
      method: 'POST',
      path: `${basePath(organisation, workspace, environment)}/reveal`,
      body: {
        ...(input.keys ? { keys: input.keys } : {}),
        ...(input.podId !== undefined ? { podId: input.podId } : {}),
        ...(input.format ? { format: input.format } : {}),
        ...(input.limit !== undefined ? { limit: input.limit } : {}),
        ...(input.cursor ? { cursor: input.cursor } : {}),
      },
    }, options);
  }

  /**
   * Reveals every secret in an environment, following `nextCursor` until the
   * server reports no more pages.
   *
   * @example
   * const secrets = await client.secrets.revealAll({ workspace: 'api', environment: 'dev' });
   * for (const { key, value } of secrets) process.env[key] = value;
   */
  async revealAll(
    input: Scope & Omit<RevealManyInput, 'keys' | 'cursor'> = {} as Scope,
    options?: RequestOptions,
  ): Promise<SecretRevealResponse[]> {
    const secrets: SecretRevealResponse[] = [];
    let cursor: string | undefined;

    for (let page = 0; page < MAX_REVEAL_PAGES; page += 1) {
      const res = await this.revealMany({ ...input, ...(cursor ? { cursor } : {}) }, options);
      secrets.push(...res.secrets);
      // A cursor that does not advance would loop forever against a
      // misbehaving server; stop rather than spin.
      if (!res.nextCursor || res.nextCursor === cursor) return secrets;
      cursor = res.nextCursor;
    }

    // Returning what was collected would hand back a silently truncated
    // environment, which is worse than failing.
    throw new Error(`revealAll stopped after ${MAX_REVEAL_PAGES} pages without reaching the end`);
  }

  /** POST / - create. */
  create(input: Scope & SecretCreateInput, options?: RequestOptions): Promise<SecretCreateResponse> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    const { key, value, podId, description, metadata } = input;
    return this.request<SecretCreateResponse>({
      method: 'POST',
      path: basePath(organisation, workspace, environment),
      body: {
        key,
        value,
        ...(podId !== undefined ? { podId } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(metadata !== undefined ? { metadata } : {}),
      },
    }, options);
  }

  /** POST /:key/rotate - new version. */
  rotate(input: KeyInput & SecretRotateInput, options?: RequestOptions): Promise<SecretRotateResponse> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.request<SecretRotateResponse>({
      method: 'POST',
      path: `${basePath(organisation, workspace, environment)}/${encodeURIComponent(input.key)}/rotate`,
      body: { value: input.value },
    }, options);
  }

  /** POST /:key/rollback. */
  rollback(input: KeyInput & SecretRollbackInput, options?: RequestOptions): Promise<SecretRollbackResponse> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.request<SecretRollbackResponse>({
      method: 'POST',
      path: `${basePath(organisation, workspace, environment)}/${encodeURIComponent(input.key)}/rollback`,
      body: { version: input.version },
    }, options);
  }

  /** PATCH /:key/move - relocate to a different pod. */
  move(input: KeyInput & SecretMoveInput, options?: RequestOptions): Promise<SecretMoveResponse> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.request<SecretMoveResponse>({
      method: 'PATCH',
      path: `${basePath(organisation, workspace, environment)}/${encodeURIComponent(input.key)}/move`,
      body: { podId: input.podId },
    }, options);
  }

  /** DELETE /:key. */
  delete(input: KeyInput, options?: RequestOptions): Promise<void> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.request<void>({
      method: 'DELETE',
      path: `${basePath(organisation, workspace, environment)}/${encodeURIComponent(input.key)}`,
    }, options);
  }

  /** POST /:key/lock. */
  lock(input: KeyInput, options?: RequestOptions): Promise<void> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.request<void>({
      method: 'POST',
      path: `${basePath(organisation, workspace, environment)}/${encodeURIComponent(input.key)}/lock`,
    }, options);
  }

  /** POST /:key/unlock. */
  unlock(input: KeyInput, options?: RequestOptions): Promise<void> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.request<void>({
      method: 'POST',
      path: `${basePath(organisation, workspace, environment)}/${encodeURIComponent(input.key)}/unlock`,
    }, options);
  }

  /** GET /:key/versions. Server wraps; SDK unwraps. */
  async listVersions(input: KeyInput, options?: RequestOptions): Promise<SecretVersionsResponse> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    const data = await this.requestData<SecretVersion[]>({
      method: 'GET',
      path: `${basePath(organisation, workspace, environment)}/${encodeURIComponent(input.key)}/versions`,
    }, options);
    return { data };
  }

  /** GET /:key/versions/:version. Server wraps; SDK unwraps. */
  revealVersion(input: KeyInput & { version: number }, options?: RequestOptions): Promise<SecretRevealResponse> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.requestData<SecretRevealResponse>({
      method: 'GET',
      path: `${basePath(organisation, workspace, environment)}/${encodeURIComponent(input.key)}/versions/${input.version}`,
    }, options);
  }

  /** GET /:key/settings. Server wraps; SDK unwraps. */
  getSettings(input: KeyInput, options?: RequestOptions): Promise<SecretSettings> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.requestData<SecretSettings>({
      method: 'GET',
      path: `${basePath(organisation, workspace, environment)}/${encodeURIComponent(input.key)}/settings`,
    }, options);
  }

  /** PATCH /:key/settings. */
  updateSettings(input: KeyInput & UpdateSecretSettingsInput, options?: RequestOptions): Promise<SecretSettings> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    const body: Record<string, unknown> = {};
    if (input.description !== undefined) body['description'] = input.description;
    if (input.metadata !== undefined) body['metadata'] = input.metadata;
    if (input.maxVersions !== undefined) body['maxVersions'] = input.maxVersions;
    if (input.casEnabled !== undefined) body['casEnabled'] = input.casEnabled;
    if (input.autoDeleteDays !== undefined) body['autoDeleteDays'] = input.autoDeleteDays;
    return this.requestData<SecretSettings>({
      method: 'PATCH',
      path: `${basePath(organisation, workspace, environment)}/${encodeURIComponent(input.key)}/settings`,
      body,
    }, options);
  }

  /**
   * POST /batch/create - create up to 100 secrets. Keys that already exist
   * are skipped, never overwritten; check `results` for per-item outcomes.
   */
  batchCreate(input: BatchCreateInput, options?: RequestOptions): Promise<BatchResult> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.requestData<BatchResult>({
      method: 'POST',
      path: `${basePath(organisation, workspace, environment)}/batch/create`,
      body: { secrets: input.secrets },
    }, options);
  }

  /** POST /batch/update - rotate up to 100 secrets to new values. */
  batchUpdate(input: BatchUpdateInput, options?: RequestOptions): Promise<BatchResult> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.requestData<BatchResult>({
      method: 'POST',
      path: `${basePath(organisation, workspace, environment)}/batch/update`,
      body: { secrets: input.secrets },
    }, options);
  }

  /** POST /batch/delete - delete up to 100 secrets by key. */
  batchDelete(input: BatchDeleteInput, options?: RequestOptions): Promise<BatchResult> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.requestData<BatchResult>({
      method: 'POST',
      path: `${basePath(organisation, workspace, environment)}/batch/delete`,
      body: { keys: input.keys },
    }, options);
  }

  /**
   * GET /batch/:jobId.
   *
   * @deprecated Batch methods return their result directly. This only reads
   * jobs queued by an earlier API version.
   */
  batchStatus(input: Scope & { jobId: string }, options?: RequestOptions): Promise<BatchOperationResponse<unknown>> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.requestData<BatchOperationResponse<unknown>>({
      method: 'GET',
      path: `${basePath(organisation, workspace, environment)}/batch/${encodeURIComponent(input.jobId)}`,
    }, options);
  }
}

function basePath(org: string, ws: string, env: string): string {
  return `/v1/organisations/${encodeURIComponent(org)}/workspaces/${encodeURIComponent(ws)}/environments/${encodeURIComponent(env)}/secrets`;
}
