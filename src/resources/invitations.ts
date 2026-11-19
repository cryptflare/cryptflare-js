import { APIResource } from './api-resource'
import type { RequestOptions } from '../types/options'
import type { AcceptInvitationResponse, InvitationPreviewResponse } from '../types'

/** Org invitations. Mounted at `/v1/invitations`. Auth-free preview. */
export class Invitations extends APIResource {
  /** GET /v1/invitations/preview?token=... No authentication required. */
  preview(input: { token: string }, options?: RequestOptions): Promise<InvitationPreviewResponse> {
    return this.request<InvitationPreviewResponse>(
      { method: 'GET', path: '/v1/invitations/preview', query: { token: input.token } },
      options,
    )
  }

  /** POST /v1/invitations/accept. Requires an authenticated user session (no org permission). */
  accept(body: { token: string }, options?: RequestOptions): Promise<AcceptInvitationResponse> {
    return this.request<AcceptInvitationResponse>(
      { method: 'POST', path: '/v1/invitations/accept', body },
      options,
    )
  }
}
