import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  DeploymentListResponse,
  DeploymentResponse,
  DeploymentStartedResponse,
  DeploymentUpdatedResponse,
} from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/deployments`

/** Deployment events log. */
export class Deployments extends APIResource {
  /** `GET /v1/organisations/:org/deployments`. Requires `audit:read`. */
  list(
    input: OrgInput & { cursor?: string } = {},
    options?: RequestOptions,
  ): Promise<DeploymentListResponse> {
    const org = this.resolveOrg(input)
    const query: Record<string, string> = {}
    if (input.cursor !== undefined) query['cursor'] = input.cursor
    return this.request<DeploymentListResponse>({ method: 'GET', path: base(org), query }, options)
  }

  /** `GET /v1/organisations/:org/deployments/:deploymentId`. Requires `audit:read`. */
  get(
    input: OrgInput & { deploymentId: string },
    options?: RequestOptions,
  ): Promise<DeploymentResponse> {
    const org = this.resolveOrg(input)
    return this.request<DeploymentResponse>(
      { method: 'GET', path: `${base(org)}/${enc(input.deploymentId)}` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/deployments`. Requires `org:read`. */
  start(
    input: OrgInput & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<DeploymentStartedResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, ...body } = input
    void _o
    return this.request<DeploymentStartedResponse>(
      { method: 'POST', path: base(org), body },
      options,
    )
  }

  /** `PATCH /v1/organisations/:org/deployments/:deploymentId`. Requires `org:read`. */
  update(
    input: OrgInput & { deploymentId: string } & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<DeploymentUpdatedResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, deploymentId, ...body } = input
    void _o
    return this.request<DeploymentUpdatedResponse>(
      { method: 'PATCH', path: `${base(org)}/${enc(deploymentId)}`, body },
      options,
    )
  }
}
