/** Public types backed by the vendored `organisations` schemas. */
import type {
  CreateOrgBody as _CreateOrgBody,
  FeaturesResponse as _FeaturesResponse,
  OrgDetail as _OrgDetail,
  OrgItem as _OrgItem,
  DataRegionStatusResponse as _SDK_DataRegionStatusResponse,
  IpAllowlistResponse as _SDK_IpAllowlistResponse,
  OrgDetailResponse as _SDK_OrgDetailResponse,
  OrgListResponse as _SDK_OrgListResponse,
  SlugAvailabilityResponse as _SDK_OrgSlugAvailabilityResponse,
  OrgTreeResponse as _SDK_OrgTreeResponse,
  SetDataRegionResponse as _SDK_SetDataRegionResponse,
  ToggleFeatureBody as _ToggleFeatureBody,
  ToggleResponse as _ToggleResponse,
  UpdateOrgBody as _UpdateOrgBody,
} from '../_vendored/schemas/organisations'

export type OrgItem = _OrgItem
export type OrgDetail = _OrgDetail
export type CreateOrgInput = _CreateOrgBody
export type UpdateOrgInput = _UpdateOrgBody
export type ToggleFeatureInput = _ToggleFeatureBody
export type FeaturesResponse = _FeaturesResponse
export type ToggleFeatureResponse = _ToggleResponse
export type DataRegionStatusResponse = _SDK_DataRegionStatusResponse
export type IpAllowlistResponse = _SDK_IpAllowlistResponse
export type OrgDetailResponse = _SDK_OrgDetailResponse
export type OrgListResponse = _SDK_OrgListResponse
export type OrgTreeResponse = _SDK_OrgTreeResponse
export type SetDataRegionResponse = _SDK_SetDataRegionResponse
export type OrgSlugAvailabilityResponse = _SDK_OrgSlugAvailabilityResponse
