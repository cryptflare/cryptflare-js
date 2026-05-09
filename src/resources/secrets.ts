import type { PagePromise } from '../core/page-promise';
import { APIResource } from './api-resource';
import type {
  BatchOperationResponse,
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
} from '../types';

type ListInput = Scope & {
  podId?: string | null;
  cursor?: string;
};

type KeyInput = Scope & { key: string };

type BatchCreateInput = Scope & {
  secrets: Array<{ key: string; value: string; podId?: string | null }>;
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

  /** POST / - create. */
  create(input: Scope & SecretCreateInput, options?: RequestOptions): Promise<SecretCreateResponse> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    const { key, value, podId } = input;
    return this.request<SecretCreateResponse>({
      method: 'POST',
      path: basePath(organisation, workspace, environment),
      body: { key, value, ...(podId !== undefined ? { podId } : {}) },
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

  /** POST /batch/create. */
  batchCreate(input: BatchCreateInput, options?: RequestOptions): Promise<BatchOperationResponse<SecretListItem>> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.request<BatchOperationResponse<SecretListItem>>({
      method: 'POST',
      path: `${basePath(organisation, workspace, environment)}/batch/create`,
      body: { secrets: input.secrets },
    }, options);
  }

  /** POST /batch/update. */
  batchUpdate(input: BatchUpdateInput, options?: RequestOptions): Promise<BatchOperationResponse<SecretListItem>> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.request<BatchOperationResponse<SecretListItem>>({
      method: 'POST',
      path: `${basePath(organisation, workspace, environment)}/batch/update`,
      body: { secrets: input.secrets },
    }, options);
  }

  /** POST /batch/delete. */
  batchDelete(input: BatchDeleteInput, options?: RequestOptions): Promise<BatchOperationResponse<void>> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.request<BatchOperationResponse<void>>({
      method: 'POST',
      path: `${basePath(organisation, workspace, environment)}/batch/delete`,
      body: { keys: input.keys },
    }, options);
  }

  /** GET /batch/:jobId. */
  batchStatus(input: Scope & { jobId: string }, options?: RequestOptions): Promise<BatchOperationResponse<unknown>> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.request<BatchOperationResponse<unknown>>({
      method: 'GET',
      path: `${basePath(organisation, workspace, environment)}/batch/${encodeURIComponent(input.jobId)}`,
    }, options);
  }
}

function basePath(org: string, ws: string, env: string): string {
  return `/v1/organisations/${encodeURIComponent(org)}/workspaces/${encodeURIComponent(ws)}/environments/${encodeURIComponent(env)}/secrets`;
}
