import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  FeaturesResponse,
  InitiateTransferResponse,
  InviteMemberResponse,
  MemberInvitationListResponse,
  MemberInvitationResentResponse,
  MemberListResponse,
  MemberRecordResponse,
  OrgDetailResponse,
  OrgListResponse,
  OrgSlugAvailabilityResponse,
  OrgTreeResponse,
  ToggleFeatureInput,
  ToggleFeatureResponse,
  TransferStatusResponse,
} from '../types'

type OrgInput = { organisation?: string }

/**
 * Organisations resource. Mounted at `/v1/organisations` (root) and
 * `/v1/organisations/:org` (members + invitations + transfers + features).
 */
export class Organisations extends APIResource {
  /**
   * GET /v1/organisations - list orgs the caller belongs to.
   * Requires an authenticated user session (no org permission).
   */
  list(options?: RequestOptions): Promise<OrgListResponse['data']> {
    return this.requestData<OrgListResponse['data']>(
      { method: 'GET', path: '/v1/organisations' },
      options,
    )
  }

  /** POST /v1/organisations - create. Requires an authenticated user session (no org permission). */
  create(
    body: { name: string; slug: string; plan?: string },
    options?: RequestOptions,
  ): Promise<OrgDetailResponse['data']> {
    return this.requestData<OrgDetailResponse['data']>(
      { method: 'POST', path: '/v1/organisations', body },
      options,
    )
  }

  /**
   * `GET /v1/organisations/check-slug/:slug` - is this slug free? The API
   * answers `{ available }` without a `data` envelope. Requires an
   * authenticated user session (no org permission).
   */
  checkSlug(
    input: { slug: string },
    options?: RequestOptions,
  ): Promise<OrgSlugAvailabilityResponse> {
    return this.request<OrgSlugAvailabilityResponse>(
      {
        method: 'GET',
        path: `/v1/organisations/check-slug/${enc(input.slug)}`,
      },
      options,
    )
  }

  /** GET /v1/organisations/:org. Requires `org:read`. */
  get(input: OrgInput = {}, options?: RequestOptions): Promise<OrgDetailResponse['data']> {
    return this.requestData<OrgDetailResponse['data']>(
      { method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}` },
      options,
    )
  }

  /** PATCH /v1/organisations/:org. Requires `org:update`. */
  update(
    input: OrgInput & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<OrgDetailResponse['data']> {
    const org = this.resolveOrg(input)
    const { organisation: _o, ...body } = input
    void _o
    return this.requestData<OrgDetailResponse['data']>(
      { method: 'PATCH', path: `/v1/organisations/${enc(org)}`, body },
      options,
    )
  }

  /** DELETE /v1/organisations/:org. Requires `org:delete`. */
  delete(input: OrgInput = {}, options?: RequestOptions): Promise<void> {
    return this.request<void>(
      { method: 'DELETE', path: `/v1/organisations/${enc(this.resolveOrg(input))}` },
      options,
    )
  }

  /** GET /v1/organisations/:org/tree. Requires `org:read`. */
  getTree(input: OrgInput = {}, options?: RequestOptions): Promise<OrgTreeResponse['data']> {
    return this.requestData<OrgTreeResponse['data']>(
      { method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/tree` },
      options,
    )
  }

  /** GET /v1/organisations/:org/members. Requires `members:read`. */
  listMembers(input: OrgInput = {}, options?: RequestOptions): Promise<MemberListResponse['data']> {
    return this.requestData<MemberListResponse['data']>(
      { method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/members` },
      options,
    )
  }

  /** POST /v1/organisations/:org/members/invite. Requires `members:invite`. */
  inviteMember(
    input: OrgInput & { email: string; role: string },
    options?: RequestOptions,
  ): Promise<InviteMemberResponse['data']> {
    const org = this.resolveOrg(input)
    return this.requestData<InviteMemberResponse['data']>(
      {
        method: 'POST',
        path: `/v1/organisations/${enc(org)}/members/invite`,
        body: { email: input.email, role: input.role },
      },
      options,
    )
  }

  /** PATCH /v1/organisations/:org/members/:userId/role. Requires `members:role_assign`. */
  updateMemberRole(
    input: OrgInput & { userId: string; role: string },
    options?: RequestOptions,
  ): Promise<MemberRecordResponse['data']> {
    const org = this.resolveOrg(input)
    return this.requestData<MemberRecordResponse['data']>(
      {
        method: 'PATCH',
        path: `/v1/organisations/${enc(org)}/members/${enc(input.userId)}/role`,
        body: { role: input.role },
      },
      options,
    )
  }

  /** DELETE /v1/organisations/:org/members/:userId. Requires `members:remove`. */
  removeMember(input: OrgInput & { userId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      {
        method: 'DELETE',
        path: `/v1/organisations/${enc(org)}/members/${enc(input.userId)}`,
      },
      options,
    )
  }

  /** GET /v1/organisations/:org/members/invitations. Requires `members:read`. */
  listInvitations(
    input: OrgInput = {},
    options?: RequestOptions,
  ): Promise<MemberInvitationListResponse['data']> {
    return this.requestData<MemberInvitationListResponse['data']>(
      {
        method: 'GET',
        path: `/v1/organisations/${enc(this.resolveOrg(input))}/members/invitations`,
      },
      options,
    )
  }

  /** POST /v1/organisations/:org/members/invitations/:id/resend. Requires `members:invite`. */
  resendInvitation(
    input: OrgInput & { id: string },
    options?: RequestOptions,
  ): Promise<MemberInvitationResentResponse> {
    const org = this.resolveOrg(input)
    return this.request<MemberInvitationResentResponse>(
      {
        method: 'POST',
        path: `/v1/organisations/${enc(org)}/members/invitations/${enc(input.id)}/resend`,
      },
      options,
    )
  }

  /** DELETE /v1/organisations/:org/members/invitations/:id. Requires `members:remove`. */
  revokeInvitation(input: OrgInput & { id: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      {
        method: 'DELETE',
        path: `/v1/organisations/${enc(org)}/members/invitations/${enc(input.id)}`,
      },
      options,
    )
  }

  /** GET /v1/organisations/:org/transfer. Requires organisation membership (any role; no specific permission). */
  getTransfer(
    input: OrgInput = {},
    options?: RequestOptions,
  ): Promise<TransferStatusResponse['data']> {
    return this.requestData<TransferStatusResponse['data']>(
      { method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/transfer` },
      options,
    )
  }

  /**
   * POST /v1/organisations/:org/transfer.
   * Requires the organisation `owner` role (checked in the handler; no permission middleware).
   */
  initiateTransfer(
    input: OrgInput & { newOwnerEmail: string },
    options?: RequestOptions,
  ): Promise<InitiateTransferResponse['data']> {
    const org = this.resolveOrg(input)
    return this.requestData<InitiateTransferResponse['data']>(
      {
        method: 'POST',
        path: `/v1/organisations/${enc(org)}/transfer`,
        body: { newOwnerEmail: input.newOwnerEmail },
      },
      options,
    )
  }

  /**
   * POST /v1/organisations/:org/transfer/cancel.
   * Requires the organisation `owner` role (checked in the handler; no permission middleware).
   */
  cancelTransfer(input: OrgInput = {}, options?: RequestOptions): Promise<void> {
    return this.request<void>(
      {
        method: 'POST',
        path: `/v1/organisations/${enc(this.resolveOrg(input))}/transfer/cancel`,
      },
      options,
    )
  }

  /** GET /v1/organisations/:org/features. Requires organisation membership (any role; no specific permission). */
  getFeatures(input: OrgInput = {}, options?: RequestOptions): Promise<FeaturesResponse> {
    // The API returns the flags bare, without a `data` envelope.
    return this.request<FeaturesResponse>(
      { method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/features` },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/features` with `{ feature, enabled }`.
   * Organisation owner only (checked in the handler, no permission string).
   */
  toggleFeature(
    input: OrgInput & ToggleFeatureInput,
    options?: RequestOptions,
  ): Promise<ToggleFeatureResponse> {
    const org = this.resolveOrg(input)
    return this.request<ToggleFeatureResponse>(
      {
        method: 'POST',
        path: `/v1/organisations/${enc(org)}/features`,
        body: { feature: input.feature, enabled: input.enabled },
      },
      options,
    )
  }
}
