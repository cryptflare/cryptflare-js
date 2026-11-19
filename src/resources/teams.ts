import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  TeamDetailResponse,
  TeamListResponse,
  TeamMemberListResponse,
  TeamMemberRowResponse,
  TeamPolicyListResponse,
  TeamPolicyResponse,
  TeamResponse,
} from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/teams`

/** Teams. Mounted at `/v1/organisations/:org/teams`. */
export class Teams extends APIResource {
  /** `GET /v1/organisations/:org/teams`. Requires `members:read`. */
  list(input: OrgInput = {}, options?: RequestOptions): Promise<TeamListResponse> {
    return this.request<TeamListResponse>(
      { method: 'GET', path: base(this.resolveOrg(input)) },
      options,
    )
  }

  /** `POST /v1/organisations/:org/teams`. Requires `members:invite`. */
  create(
    input: OrgInput & { name: string; slug: string; description?: string },
    options?: RequestOptions,
  ): Promise<TeamResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = { name: input.name, slug: input.slug }
    if (input.description !== undefined) body['description'] = input.description
    return this.request<TeamResponse>({ method: 'POST', path: base(org), body }, options)
  }

  /** `GET /v1/organisations/:org/teams/:teamId`. Requires `members:read`. */
  get(input: OrgInput & { teamId: string }, options?: RequestOptions): Promise<TeamDetailResponse> {
    const org = this.resolveOrg(input)
    return this.request<TeamDetailResponse>(
      { method: 'GET', path: `${base(org)}/${enc(input.teamId)}` },
      options,
    )
  }

  /** `PATCH /v1/organisations/:org/teams/:teamId`. Requires `members:invite`. */
  update(
    input: OrgInput & { teamId: string; name?: string; description?: string },
    options?: RequestOptions,
  ): Promise<TeamResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {}
    if (input.name !== undefined) body['name'] = input.name
    if (input.description !== undefined) body['description'] = input.description
    return this.request<TeamResponse>(
      { method: 'PATCH', path: `${base(org)}/${enc(input.teamId)}`, body },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/teams/:teamId`. Requires `members:remove`. */
  delete(input: OrgInput & { teamId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      { method: 'DELETE', path: `${base(org)}/${enc(input.teamId)}` },
      options,
    )
  }

  /** `GET /v1/organisations/:org/teams/:teamId/members`. Requires `members:read`. */
  listMembers(
    input: OrgInput & { teamId: string },
    options?: RequestOptions,
  ): Promise<TeamMemberListResponse> {
    const org = this.resolveOrg(input)
    return this.request<TeamMemberListResponse>(
      { method: 'GET', path: `${base(org)}/${enc(input.teamId)}/members` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/teams/:teamId/members`. Requires `members:invite`. */
  addMember(
    input: OrgInput & { teamId: string; userId: string },
    options?: RequestOptions,
  ): Promise<TeamMemberRowResponse> {
    const org = this.resolveOrg(input)
    return this.request<TeamMemberRowResponse>(
      {
        method: 'POST',
        path: `${base(org)}/${enc(input.teamId)}/members`,
        body: { userId: input.userId },
      },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/teams/:teamId/members/:userId`. Requires `members:remove`. */
  removeMember(
    input: OrgInput & { teamId: string; userId: string },
    options?: RequestOptions,
  ): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      {
        method: 'DELETE',
        path: `${base(org)}/${enc(input.teamId)}/members/${enc(input.userId)}`,
      },
      options,
    )
  }

  /** `GET /v1/organisations/:org/teams/:teamId/policies`. Requires `members:read`. */
  listPolicies(
    input: OrgInput & { teamId: string },
    options?: RequestOptions,
  ): Promise<TeamPolicyListResponse> {
    const org = this.resolveOrg(input)
    return this.request<TeamPolicyListResponse>(
      { method: 'GET', path: `${base(org)}/${enc(input.teamId)}/policies` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/teams/:teamId/policies`. Requires `members:invite`. */
  addPolicy(
    input: OrgInput & { teamId: string; policyId: string },
    options?: RequestOptions,
  ): Promise<TeamPolicyResponse> {
    const org = this.resolveOrg(input)
    return this.request<TeamPolicyResponse>(
      {
        method: 'POST',
        path: `${base(org)}/${enc(input.teamId)}/policies`,
        body: { policyId: input.policyId },
      },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/teams/:teamId/policies/:policyId`. Requires `members:remove`. */
  deletePolicy(
    input: OrgInput & { teamId: string; policyId: string },
    options?: RequestOptions,
  ): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      {
        method: 'DELETE',
        path: `${base(org)}/${enc(input.teamId)}/policies/${enc(input.policyId)}`,
      },
      options,
    )
  }
}
