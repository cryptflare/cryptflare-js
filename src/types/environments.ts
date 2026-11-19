/** Public types backed by the vendored `environments` schemas. */
import type {
  CreateEnvironmentBody as _CreateEnvironmentBody,
  EnvironmentItem as _EnvironmentItem,
  ResolvePathResponse as _ResolvePathResponse,
  ResolvedPodPayload as _ResolvedPodPayload,
  ResolvedSecretPayload as _ResolvedSecretPayload,
  EnvironmentListResponse as _SDK_EnvironmentListResponse,
  EnvironmentResponse as _SDK_EnvironmentResponse,
} from '../_vendored/schemas/environments'

export type EnvironmentItem = _EnvironmentItem
export type CreateEnvironmentInput = _CreateEnvironmentBody
export type ResolvedPodPayload = _ResolvedPodPayload
export type ResolvedSecretPayload = _ResolvedSecretPayload
export type ResolvePathResponse = _ResolvePathResponse
export type EnvironmentListResponse = _SDK_EnvironmentListResponse
export type EnvironmentResponse = _SDK_EnvironmentResponse
