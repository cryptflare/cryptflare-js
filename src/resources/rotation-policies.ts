import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  CreateRotationPolicyInput,
  RotationPolicyListResponse,
  RotationPolicyNullableResponse,
  RotationPolicyResponse,
  RotationPolicyRunResponse,
  RotationPolicyToggleResponse,
} from '../types'

type OrgInput = { organisation?: string }
type SecretKeyInput = {
  organisation?: string
  workspace?: string
  environment?: string
  key: string
}
const base = (org: string) => `/v1/organisations/${enc(org)}/rotation-policies`

/** Rotation policies. */
export class RotationPolicies extends APIResource {
  /** `GET /v1/organisations/:org/rotation-policies`. Requires `secrets:rotate`. */
  list(input: OrgInput = {}, options?: RequestOptions): Promise<RotationPolicyListResponse> {
    return this.request<RotationPolicyListResponse>(
      { method: 'GET', path: base(this.resolveOrg(input)) },
      options,
    )
  }

  /**
   * `GET /v1/organisations/:org/:ws/:env/:key/rotation-policy` - the policy
   * attached to one secret, or `{ data: null }` when it has none. Policies
   * are addressed by secret; there is no GET by policy ID. Requires `secrets:rotate`.
   */
  get(input: SecretKeyInput, options?: RequestOptions): Promise<RotationPolicyNullableResponse> {
    return this.request<RotationPolicyNullableResponse>(
      { method: 'GET', path: this.secretPath(input) },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/:ws/:env/:key/rotation-policy` - attaches a
   * rotation policy to one secret. Requires `secrets:rotate`.
   */
  create(
    input: SecretKeyInput & CreateRotationPolicyInput,
    options?: RequestOptions,
  ): Promise<RotationPolicyResponse> {
    const body: CreateRotationPolicyInput = { intervalDays: input.intervalDays }
    if (input.generateLength !== undefined) body.generateLength = input.generateLength
    if (input.generateCharset !== undefined) body.generateCharset = input.generateCharset
    if (input.notifyOnRotation !== undefined) body.notifyOnRotation = input.notifyOnRotation
    return this.request<RotationPolicyResponse>(
      { method: 'POST', path: this.secretPath(input), body },
      options,
    )
  }

  /** `PATCH /v1/organisations/:org/rotation-policies/:policyId`. Requires `secrets:rotate`. */
  update(
    input: OrgInput & { policyId: string } & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<RotationPolicyResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, policyId, ...body } = input
    void _o
    return this.request<RotationPolicyResponse>(
      { method: 'PATCH', path: `${base(org)}/${enc(policyId)}`, body },
      options,
    )
  }

  /** `POST /v1/organisations/:org/rotation-policies/:policyId/toggle`. Requires `secrets:rotate`. */
  toggle(
    input: OrgInput & { policyId: string; enabled: boolean },
    options?: RequestOptions,
  ): Promise<RotationPolicyToggleResponse> {
    const org = this.resolveOrg(input)
    return this.request<RotationPolicyToggleResponse>(
      {
        method: 'POST',
        path: `${base(org)}/${enc(input.policyId)}/toggle`,
        body: { enabled: input.enabled },
      },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/rotation-policies/:policyId`. Requires `secrets:rotate`. */
  delete(input: OrgInput & { policyId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      { method: 'DELETE', path: `${base(org)}/${enc(input.policyId)}` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/rotation-policies/:policyId/run`. Requires `secrets:rotate`. */
  run(
    input: OrgInput & { policyId: string },
    options?: RequestOptions,
  ): Promise<RotationPolicyRunResponse> {
    const org = this.resolveOrg(input)
    return this.request<RotationPolicyRunResponse>(
      { method: 'POST', path: `${base(org)}/${enc(input.policyId)}/run` },
      options,
    )
  }

  private secretPath(input: SecretKeyInput): string {
    const { organisation, workspace, environment } = this.resolveScope(input)
    return `/v1/organisations/${enc(organisation)}/${enc(workspace)}/${enc(environment)}/${enc(input.key)}/rotation-policy`
  }
}
