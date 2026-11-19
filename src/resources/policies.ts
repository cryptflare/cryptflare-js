import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  AccessGrantListResponse,
  AccessRequestListResponse,
  AccessRequestResponse,
  ApprovedAccessResponse,
  GlobalPolicyListResponse,
  GlobalPolicyResponse,
  ImportResponse,
  OrgTeamPolicyListResponse,
  PolicyExportResponse,
  PolicySuccessResponse,
  PolicyTemplateListResponse,
  PolicyTemplateResponse,
  SimulationResponse,
} from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/policies`

/** Policies, templates, access requests + grants. */
export class Policies extends APIResource {
  /** `GET /v1/organisations/:org/policies`. Requires `policies:read`. */
  list(input: OrgInput = {}, options?: RequestOptions): Promise<GlobalPolicyListResponse> {
    return this.request<GlobalPolicyListResponse>(
      { method: 'GET', path: base(this.resolveOrg(input)) },
      options,
    )
  }

  /** `POST /v1/organisations/:org/policies`. Requires `policies:manage`. */
  create(
    input: OrgInput & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<GlobalPolicyResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, ...body } = input
    void _o
    return this.request<GlobalPolicyResponse>({ method: 'POST', path: base(org), body }, options)
  }

  /** `PUT /v1/organisations/:org/policies/:policyId`. Requires `policies:manage`. */
  update(
    input: OrgInput & { policyId: string } & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<GlobalPolicyResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, policyId, ...body } = input
    void _o
    return this.request<GlobalPolicyResponse>(
      { method: 'PUT', path: `${base(org)}/${enc(policyId)}`, body },
      options,
    )
  }

  /** `POST /v1/organisations/:org/policies/:policyId/toggle`. Requires `policies:manage`. */
  toggle(
    input: OrgInput & { policyId: string; enabled: boolean },
    options?: RequestOptions,
  ): Promise<PolicySuccessResponse> {
    const org = this.resolveOrg(input)
    return this.request<PolicySuccessResponse>(
      {
        method: 'POST',
        path: `${base(org)}/${enc(input.policyId)}/toggle`,
        body: { enabled: input.enabled },
      },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/policies/:policyId`. Requires `policies:manage`. */
  delete(input: OrgInput & { policyId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      { method: 'DELETE', path: `${base(org)}/${enc(input.policyId)}` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/policies/simulate`. Requires `policies:simulate`. */
  simulate(
    input: OrgInput & { policyId: string; subject: Record<string, unknown> },
    options?: RequestOptions,
  ): Promise<SimulationResponse> {
    const org = this.resolveOrg(input)
    return this.request<SimulationResponse>(
      {
        method: 'POST',
        path: `${base(org)}/simulate`,
        body: { subject: input.subject },
      },
      options,
    )
  }

  /** `GET /v1/organisations/:org/policies/export`. Requires `policies:import_export`. */
  export(input: OrgInput = {}, options?: RequestOptions): Promise<PolicyExportResponse> {
    return this.request<PolicyExportResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/export` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/policies/import`. Requires `policies:import_export`. */
  import(
    input: OrgInput & { policies: unknown[] },
    options?: RequestOptions,
  ): Promise<ImportResponse> {
    const org = this.resolveOrg(input)
    return this.request<ImportResponse>(
      { method: 'POST', path: `${base(org)}/import`, body: { policies: input.policies } },
      options,
    )
  }

  /** `GET /v1/organisations/:org/policies/library`. Requires `policies:read`. */
  listLibrary(input: OrgInput = {}, options?: RequestOptions): Promise<PolicyTemplateListResponse> {
    return this.request<PolicyTemplateListResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/library` },
      options,
    )
  }

  /** `GET /v1/organisations/:org/policies/library/:templateId`. Requires `policies:read`. */
  getTemplate(
    input: OrgInput & { templateId: string },
    options?: RequestOptions,
  ): Promise<PolicyTemplateResponse> {
    const org = this.resolveOrg(input)
    return this.request<PolicyTemplateResponse>(
      { method: 'GET', path: `${base(org)}/library/${enc(input.templateId)}` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/policies/library/:templateId/apply`. Requires `policies:manage`. */
  applyTemplate(
    input: OrgInput & { templateId: string } & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<unknown> {
    const org = this.resolveOrg(input)
    const { organisation: _o, templateId, ...body } = input
    void _o
    return this.request(
      {
        method: 'POST',
        path: `${base(org)}/library/${enc(templateId)}/apply`,
        body,
      },
      options,
    )
  }

  /** `GET /v1/organisations/:org/policies/team-policies`. Requires `policies:read`. */
  listTeamPolicies(
    input: OrgInput & { teamId: string },
    options?: RequestOptions,
  ): Promise<OrgTeamPolicyListResponse> {
    const org = this.resolveOrg(input)
    return this.request<OrgTeamPolicyListResponse>(
      { method: 'GET', path: `${base(org)}/team-policies` },
      options,
    )
  }

  // -- Access requests -------------------------------------------------------

  /** `GET /v1/organisations/:org/policies/access-requests`. Requires `approvals:read`. */
  listAccessRequests(
    input: OrgInput = {},
    options?: RequestOptions,
  ): Promise<AccessRequestListResponse> {
    return this.request<AccessRequestListResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/access-requests` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/policies/access-requests`. Requires `approvals:read`. */
  createAccessRequest(
    input: OrgInput & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<AccessRequestResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, ...body } = input
    void _o
    return this.request<AccessRequestResponse>(
      { method: 'POST', path: `${base(org)}/access-requests`, body },
      options,
    )
  }

  /** `POST /v1/organisations/:org/policies/access-requests/:requestId/approve`. Requires `approvals:approve`. */
  approveAccessRequest(
    input: OrgInput & { requestId: string; reason?: string },
    options?: RequestOptions,
  ): Promise<ApprovedAccessResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {}
    if (input.reason !== undefined) body['reason'] = input.reason
    return this.request<ApprovedAccessResponse>(
      {
        method: 'POST',
        path: `${base(org)}/access-requests/${enc(input.requestId)}/approve`,
        body,
      },
      options,
    )
  }

  /** `POST /v1/organisations/:org/policies/access-requests/:requestId/deny`. Requires `approvals:deny`. */
  denyAccessRequest(
    input: OrgInput & { requestId: string; reason?: string },
    options?: RequestOptions,
  ): Promise<PolicySuccessResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {}
    if (input.reason !== undefined) body['reason'] = input.reason
    return this.request<PolicySuccessResponse>(
      {
        method: 'POST',
        path: `${base(org)}/access-requests/${enc(input.requestId)}/deny`,
        body,
      },
      options,
    )
  }

  // -- Access grants ---------------------------------------------------------

  /** `GET /v1/organisations/:org/policies/access-grants`. Requires `approvals:read`. */
  listAccessGrants(
    input: OrgInput = {},
    options?: RequestOptions,
  ): Promise<AccessGrantListResponse> {
    return this.request<AccessGrantListResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/access-grants` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/policies/access-grants/:grantId/revoke`. Requires `approvals:approve`. */
  revokeAccessGrant(
    input: OrgInput & { grantId: string },
    options?: RequestOptions,
  ): Promise<PolicySuccessResponse> {
    const org = this.resolveOrg(input)
    return this.request<PolicySuccessResponse>(
      {
        method: 'POST',
        path: `${base(org)}/access-grants/${enc(input.grantId)}/revoke`,
      },
      options,
    )
  }
}
