import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  SupportAttachment,
  SupportMessageCreatedResponse,
  SupportSuccessResponse,
  SupportTicketDetailResponse,
  SupportTicketListResponse,
  SupportTicketResponse,
} from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/support`

/** Customer support tickets. */
export class Support extends APIResource {
  /** `GET /v1/organisations/:org/support`. Requires `org:read`. */
  list(
    input: OrgInput & { cursor?: string; status?: string } = {},
    options?: RequestOptions,
  ): Promise<SupportTicketListResponse> {
    const org = this.resolveOrg(input)
    const query: Record<string, string> = {}
    if (input.cursor !== undefined) query['cursor'] = input.cursor
    if (input.status !== undefined) query['status'] = input.status
    return this.request<SupportTicketListResponse>(
      { method: 'GET', path: `${base(org)}`, query },
      options,
    )
  }

  /** `POST /v1/organisations/:org/support`. Requires `org:read`. */
  create(
    input: OrgInput & { subject: string; body: string; priority?: 'low' | 'normal' | 'high' },
    options?: RequestOptions,
  ): Promise<SupportTicketResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = { subject: input.subject, body: input.body }
    if (input.priority !== undefined) body['priority'] = input.priority
    return this.request<SupportTicketResponse>(
      { method: 'POST', path: `${base(org)}`, body },
      options,
    )
  }

  /** `GET /v1/organisations/:org/support/:ticketId`. Requires `org:read`. */
  get(
    input: OrgInput & { ticketId: string },
    options?: RequestOptions,
  ): Promise<SupportTicketDetailResponse> {
    const org = this.resolveOrg(input)
    return this.request<SupportTicketDetailResponse>(
      { method: 'GET', path: `${base(org)}/${enc(input.ticketId)}` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/support/:ticketId/messages`. Requires `org:read`. */
  addMessage(
    input: OrgInput & { ticketId: string; body: string },
    options?: RequestOptions,
  ): Promise<SupportMessageCreatedResponse> {
    const org = this.resolveOrg(input)
    return this.request<SupportMessageCreatedResponse>(
      {
        method: 'POST',
        path: `${base(org)}/${enc(input.ticketId)}/messages`,
        body: { body: input.body },
      },
      options,
    )
  }

  /** `POST /v1/organisations/:org/support/:ticketId/close`. Requires `org:read`. */
  close(
    input: OrgInput & { ticketId: string; resolution?: string },
    options?: RequestOptions,
  ): Promise<SupportSuccessResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {}
    if (input.resolution !== undefined) body['resolution'] = input.resolution
    return this.request<SupportSuccessResponse>(
      {
        method: 'POST',
        path: `${base(org)}/${enc(input.ticketId)}/close`,
        body,
      },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/support/:ticketId/upload` - uploads one file
   * as `multipart/form-data` (field `file`). Returns the stored attachment
   * reference to pass in a message's `attachments`. Paid plans only.
   * Requires `org:read`.
   */
  uploadAttachment(
    input: OrgInput & {
      ticketId: string
      /** File contents. A `File` keeps its own name; pass `filename` for a bare `Blob`. */
      file: Blob
      filename?: string
    },
    options?: RequestOptions,
  ): Promise<SupportAttachment> {
    const org = this.resolveOrg(input)
    const form = new FormData()
    if (input.filename !== undefined) form.append('file', input.file, input.filename)
    else form.append('file', input.file)
    return this.requestData<SupportAttachment>(
      {
        method: 'POST',
        path: `${base(org)}/${enc(input.ticketId)}/upload`,
        body: form,
      },
      options,
    )
  }
}
