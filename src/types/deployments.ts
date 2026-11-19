/** Public types backed by the vendored `deployments` schemas. */
import type {
  DeploymentListResponse as _SDK_DeploymentListResponse,
  DeploymentResponse as _SDK_DeploymentResponse,
  DeploymentStartedResponse as _SDK_DeploymentStartedResponse,
  DeploymentUpdatedResponse as _SDK_DeploymentUpdatedResponse,
  StartDeploymentBody as _StartDeploymentBody,
  UpdateDeploymentBody as _UpdateDeploymentBody,
} from '../_vendored/schemas/deployments'

export type StartDeploymentInput = _StartDeploymentBody
export type UpdateDeploymentInput = _UpdateDeploymentBody
export type DeploymentListResponse = _SDK_DeploymentListResponse
export type DeploymentResponse = _SDK_DeploymentResponse
export type DeploymentStartedResponse = _SDK_DeploymentStartedResponse
export type DeploymentUpdatedResponse = _SDK_DeploymentUpdatedResponse
