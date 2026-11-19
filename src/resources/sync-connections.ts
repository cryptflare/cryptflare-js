import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  SyncConnectionCreatedResponse,
  SyncConnectionDetailResponse,
  SyncConnectionListResponse,
  SyncDriftResponse,
  SyncFederationMetadataResponse,
  SyncHandshakeConfirmedResponse,
  SyncLogListResponse,
  SyncQueueResponse,
  SyncTriggerResponse,
} from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/sync-connections`

/** Outbound secret-sync connections. */
export class SyncConnections extends APIResource {
  /**
   * `GET /v1/organisations/:org/sync-connections`. Requires `sync:read` and secret sync enabled for the organisation.
   */
  list(input: OrgInput = {}, options?: RequestOptions): Promise<SyncConnectionListResponse> {
    return this.request<SyncConnectionListResponse>(
      { method: 'GET', path: base(this.resolveOrg(input)) },
      options,
    )
  }

  /**
   * `GET /v1/organisations/:org/sync-connections/:connectionId`.
   * Requires `sync:read` and secret sync enabled for the organisation.
   */
  get(
    input: OrgInput & { connectionId: string },
    options?: RequestOptions,
  ): Promise<SyncConnectionDetailResponse> {
    const org = this.resolveOrg(input)
    return this.request<SyncConnectionDetailResponse>(
      { method: 'GET', path: `${base(org)}/${enc(input.connectionId)}` },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/sync-connections`.
   * Requires `sync:manage` and secret sync enabled for the organisation.
   */
  create(
    input: OrgInput & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<SyncConnectionCreatedResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, ...body } = input
    void _o
    return this.request<SyncConnectionCreatedResponse>(
      { method: 'POST', path: base(org), body },
      options,
    )
  }

  /**
   * `PATCH /v1/organisations/:org/sync-connections/:connectionId`.
   * Requires `sync:manage` and secret sync enabled for the organisation.
   */
  update(
    input: OrgInput & { connectionId: string } & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<SyncConnectionDetailResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, connectionId, ...body } = input
    void _o
    return this.request<SyncConnectionDetailResponse>(
      { method: 'PATCH', path: `${base(org)}/${enc(connectionId)}`, body },
      options,
    )
  }

  /**
   * `DELETE /v1/organisations/:org/sync-connections/:connectionId`.
   * Requires `sync:manage` and secret sync enabled for the organisation.
   */
  delete(input: OrgInput & { connectionId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      { method: 'DELETE', path: `${base(org)}/${enc(input.connectionId)}` },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/sync-connections/:connectionId/confirm`.
   * Requires `sync:manage` and secret sync enabled for the organisation.
   */
  confirmHandshake(
    input: OrgInput & { connectionId: string; nonce: string },
    options?: RequestOptions,
  ): Promise<SyncHandshakeConfirmedResponse> {
    const org = this.resolveOrg(input)
    return this.request<SyncHandshakeConfirmedResponse>(
      {
        method: 'POST',
        path: `${base(org)}/${enc(input.connectionId)}/confirm`,
        body: { nonce: input.nonce },
      },
      options,
    )
  }

  /**
   * `GET /v1/organisations/:org/sync-connections/:connectionId/federation`.
   * Requires `sync:read` and secret sync enabled for the organisation.
   */
  getFederation(
    input: OrgInput & { connectionId: string },
    options?: RequestOptions,
  ): Promise<SyncFederationMetadataResponse> {
    const org = this.resolveOrg(input)
    return this.request<SyncFederationMetadataResponse>(
      {
        method: 'GET',
        path: `${base(org)}/${enc(input.connectionId)}/federation`,
      },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/sync-connections/:connectionId/trigger`.
   * Requires `sync:manage` and secret sync enabled for the organisation.
   */
  trigger(
    input: OrgInput & { connectionId: string },
    options?: RequestOptions,
  ): Promise<SyncTriggerResponse> {
    const org = this.resolveOrg(input)
    return this.request<SyncTriggerResponse>(
      { method: 'POST', path: `${base(org)}/${enc(input.connectionId)}/trigger` },
      options,
    )
  }

  /**
   * `GET /v1/organisations/:org/sync-connections/:connectionId/logs`.
   * Requires `sync:read` and secret sync enabled for the organisation.
   */
  listLogs(
    input: OrgInput & { connectionId: string; cursor?: string },
    options?: RequestOptions,
  ): Promise<SyncLogListResponse> {
    const org = this.resolveOrg(input)
    const query: Record<string, string> = {}
    if (input.cursor !== undefined) query['cursor'] = input.cursor
    return this.request<SyncLogListResponse>(
      {
        method: 'GET',
        path: `${base(org)}/${enc(input.connectionId)}/logs`,
        query,
      },
      options,
    )
  }

  /**
   * `GET /v1/organisations/:org/sync-connections/:connectionId/drift`.
   * Requires `sync:read` and secret sync enabled for the organisation.
   */
  getDrift(
    input: OrgInput & { connectionId: string },
    options?: RequestOptions,
  ): Promise<SyncDriftResponse> {
    const org = this.resolveOrg(input)
    return this.request<SyncDriftResponse>(
      { method: 'GET', path: `${base(org)}/${enc(input.connectionId)}/drift` },
      options,
    )
  }

  /**
   * `GET /v1/organisations/:org/sync-connections/queue`.
   * Requires `sync:read` and secret sync enabled for the organisation.
   */
  getQueue(
    input: OrgInput & { connectionId: string },
    options?: RequestOptions,
  ): Promise<SyncQueueResponse> {
    const org = this.resolveOrg(input)
    return this.request<SyncQueueResponse>({ method: 'GET', path: `${base(org)}/queue` }, options)
  }
}
