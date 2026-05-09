import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };

/**
 * Organisations resource. Mounted at `/v1/organisations` (root) and
 * `/v1/organisations/:org` (members + invitations + transfers + features).
 */
export class Organisations extends APIResource {
  /** GET /v1/organisations - list orgs the caller belongs to. */
  list(options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'GET', path: '/v1/organisations' }, options);
  }

  /** POST /v1/organisations - create. */
  create(body: { name: string; slug: string; plan?: string }, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'POST', path: '/v1/organisations', body }, options);
  }

  /** GET /v1/organisations/check-slug?slug=... - is this slug free? */
  checkSlug(input: { slug: string }, options?: RequestOptions): Promise<{ available: boolean }> {
    return this.requestData({
      method: 'GET',
      path: '/v1/organisations/check-slug',
      query: { slug: input.slug },
    }, options);
  }

  /** GET /v1/organisations/:org. */
  get(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}` }, options);
  }

  /** PATCH /v1/organisations/:org. */
  update(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, ...body } = input;
    void _o;
    return this.requestData({ method: 'PATCH', path: `/v1/organisations/${enc(org)}`, body }, options);
  }

  /** DELETE /v1/organisations/:org. */
  delete(input: OrgInput = {}, options?: RequestOptions): Promise<void> {
    return this.request<void>({ method: 'DELETE', path: `/v1/organisations/${enc(this.resolveOrg(input))}` }, options);
  }

  /** GET /v1/organisations/:org/tree. */
  getTree(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/tree` }, options);
  }

  /** GET /v1/organisations/:org/members. */
  listMembers(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/members` }, options);
  }

  /** POST /v1/organisations/:org/members - invite. */
  inviteMember(input: OrgInput & { email: string; role: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.requestData({ method: 'POST', path: `/v1/organisations/${enc(org)}/members`, body: { email: input.email, role: input.role } }, options);
  }

  /** PATCH /v1/organisations/:org/members/:userId. */
  updateMemberRole(input: OrgInput & { userId: string; role: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.requestData({
      method: 'PATCH',
      path: `/v1/organisations/${enc(org)}/members/${enc(input.userId)}`,
      body: { role: input.role },
    }, options);
  }

  /** DELETE /v1/organisations/:org/members/:userId. */
  removeMember(input: OrgInput & { userId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({
      method: 'DELETE',
      path: `/v1/organisations/${enc(org)}/members/${enc(input.userId)}`,
    }, options);
  }

  /** GET /v1/organisations/:org/invitations. */
  listInvitations(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/invitations` }, options);
  }

  /** POST /v1/organisations/:org/invitations/:id/resend. */
  resendInvitation(input: OrgInput & { id: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.requestData({
      method: 'POST',
      path: `/v1/organisations/${enc(org)}/invitations/${enc(input.id)}/resend`,
    }, options);
  }

  /** DELETE /v1/organisations/:org/invitations/:id. */
  revokeInvitation(input: OrgInput & { id: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({
      method: 'DELETE',
      path: `/v1/organisations/${enc(org)}/invitations/${enc(input.id)}`,
    }, options);
  }

  /** GET /v1/organisations/:org/transfer. */
  getTransfer(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/transfer` }, options);
  }

  /** POST /v1/organisations/:org/transfer. */
  initiateTransfer(input: OrgInput & { newOwnerEmail: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.requestData({
      method: 'POST',
      path: `/v1/organisations/${enc(org)}/transfer`,
      body: { newOwnerEmail: input.newOwnerEmail },
    }, options);
  }

  /** POST /v1/organisations/:org/transfer/cancel. */
  cancelTransfer(input: OrgInput = {}, options?: RequestOptions): Promise<void> {
    return this.request<void>({
      method: 'POST',
      path: `/v1/organisations/${enc(this.resolveOrg(input))}/transfer/cancel`,
    }, options);
  }

  /** GET /v1/organisations/:org/features. */
  getFeatures(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/features` }, options);
  }

  /** POST /v1/organisations/:org/features/:feature/toggle. */
  toggleFeature(input: OrgInput & { feature: string; enabled: boolean }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.requestData({
      method: 'POST',
      path: `/v1/organisations/${enc(org)}/features/${enc(input.feature)}/toggle`,
      body: { enabled: input.enabled },
    }, options);
  }
}
