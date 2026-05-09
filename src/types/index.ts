/**
 * Public type exports. Resource shapes inferred from the same Zod schemas
 * the API validates against, sourced from `@cryptflare/shared/schemas/*`.
 * Adding a field to the schema flows to API + SDK in one edit.
 */

export type * from './options';

import type {
  CreateSecretBody as _CreateSecretBody,
  RevealedSecret as _RevealedSecret,
  RollbackSecretBody as _RollbackSecretBody,
  RotateSecretBody as _RotateSecretBody,
  MoveSecretBody as _MoveSecretBody,
  SecretListItem as _SecretListItem,
  UpdateSettingsBody as _UpdateSettingsBody,
} from '../_vendored/schemas/secrets';
import type {
  CreatePodBody as _CreatePodBody,
  PodAncestor as _PodAncestor,
  PodItem as _PodItem,
  UpdatePodBody as _UpdatePodBody,
} from '../_vendored/schemas/pods';
import type {
  CreateEnvironmentBody as _CreateEnvironmentBody,
  EnvironmentItem as _EnvironmentItem,
  ResolvePathResponse as _ResolvePathResponse,
  ResolvedPodPayload as _ResolvedPodPayload,
  ResolvedSecretPayload as _ResolvedSecretPayload,
} from '../_vendored/schemas/environments';
import type {
  CreateWorkspaceBody as _CreateWorkspaceBody,
  WorkspaceItem as _WorkspaceItem,
} from '../_vendored/schemas/workspaces';
import type {
  CreateOrgBody as _CreateOrgBody,
  FeaturesResponse as _FeaturesResponse,
  OrgDetail as _OrgDetail,
  OrgItem as _OrgItem,
  ToggleFeatureBody as _ToggleFeatureBody,
  ToggleResponse as _ToggleResponse,
  UpdateOrgBody as _UpdateOrgBody,
} from '../_vendored/schemas/organisations';
import type {
  CreateTokenBody as _CreateTokenBody,
  CreatedToken as _CreatedToken,
  TokenItem as _TokenItem,
} from '../_vendored/schemas/tokens';
import type {
  CreateServiceTokenBody as _CreateServiceTokenBody,
  CreatedServiceToken as _CreatedServiceToken,
  ServiceTokenItem as _ServiceTokenItem,
  UpdateServiceTokenBody as _UpdateServiceTokenBody,
} from '../_vendored/schemas/service-tokens';
import type {
  Team as _Team,
  TeamListItem as _TeamListItem,
  TeamMember as _TeamMember,
  TeamMemberRow as _TeamMemberRow,
  TeamPolicy as _TeamPolicy,
} from '../_vendored/schemas/teams';
import type {
  AccessGrant as _AccessGrant,
  AccessRequest as _AccessRequest,
  GlobalPolicy as _GlobalPolicy,
  OrgTeamPolicy as _OrgTeamPolicy,
  PoliciesTeamPolicy as _PoliciesTeamPolicy,
  PolicyTemplate as _PolicyTemplate,
} from '../_vendored/schemas/policies';
import type {
  ChangeRoleBody as _ChangeRoleBody,
  InviteBody as _InviteBody,
  MemberItem as _MemberItem,
  MemberRecord as _MemberRecord,
} from '../_vendored/schemas/members';
import type {
  GenerateReportBody as _GenerateReportBody,
  GenerateReportResponse as _GenerateReportResponse,
  ReportStatusResponse as _ReportStatusResponse,
} from '../_vendored/schemas/compliance';
import type { TagBody as _TagBody } from '../_vendored/schemas/tags';
import type { SsoToggleBody as _SsoToggleBody } from '../_vendored/schemas/sso';
import type { UpdateRolePermissionBody as _UpdateRolePermissionBody } from '../_vendored/schemas/role-permissions';
import type {
  LoginBody as _LoginBody,
  LoginResponse as _LoginResponse,
  MeResponse as _MeResponse,
  TotpCodeBody as _TotpCodeBody,
  TotpSetupResponse as _TotpSetupResponse,
  TotpVerifySetupResponse as _TotpVerifySetupResponse,
  VerifyBody as _VerifyBody,
  VerifyResponse as _VerifyResponse,
  VerifyTotpBody as _VerifyTotpBody,
  WhoamiResponse as _WhoamiResponse,
} from '../_vendored/schemas/auth';
import type {
  CreateRotationPolicyBody as _CreateRotationPolicyBody,
  RotationPolicyItem as _RotationPolicyItem,
  UpdateRotationPolicyBody as _UpdateRotationPolicyBody,
} from '../_vendored/schemas/rotation-policies';
import type {
  CreateEventSubscriptionBody as _CreateEventSubscriptionBody,
  EventDeliveryItem as _EventDeliveryItem,
  EventSubscriptionItem as _EventSubscriptionItem,
  EventTestResult as _EventTestResult,
  UpdateEventSubscriptionBody as _UpdateEventSubscriptionBody,
} from '../_vendored/schemas/event-subscriptions';
import type {
  CreateConfigBody as _CreateConfigBody,
  DynamicAnalyticsQuery as _DynamicAnalyticsQuery,
  IssueLeaseBody as _IssueLeaseBody,
  ListLeasesQuery as _ListLeasesQuery,
  RenewLeaseBody as _RenewLeaseBody,
  UpdateConfigBody as _UpdateConfigBody,
} from '../_vendored/schemas/dynamic-secrets';
import type {
  CancelBody as _CancelBody,
  ChangePlanBody as _ChangePlanBody,
  CheckoutBody as _CheckoutBody,
  ConfirmSessionBody as _ConfirmSessionBody,
  ConfirmSessionResponse as _ConfirmSessionResponse,
} from '../_vendored/schemas/billing';
import type {
  StartDeploymentBody as _StartDeploymentBody,
  UpdateDeploymentBody as _UpdateDeploymentBody,
} from '../_vendored/schemas/deployments';
import type {
  CompleteOnboardingResponse as _CompleteOnboardingResponse,
  OnboardingStateResponse as _OnboardingStateResponse,
  SlugAvailabilityResponse as _SlugAvailabilityResponse,
  UpdateOnboardingBody as _UpdateOnboardingBody,
} from '../_vendored/schemas/onboarding';
import type {
  CliApproveBody as _CliApproveBody,
  CliApproveResponse as _CliApproveResponse,
  CliDeviceResponse as _CliDeviceResponse,
  CliTokenBody as _CliTokenBody,
  CliTokenResponse as _CliTokenResponse,
} from '../_vendored/schemas/cli';
import type { AuditLogItem as _AuditLogItem } from '../_vendored/schemas/audit';

export type Scope = {
  organisation?: string;
  workspace?: string;
  environment?: string;
};

// Re-export schema-derived shapes under stable SDK names so call sites do
// not have to know the schema-package layout.
export type SecretListItem = _SecretListItem;
export type SecretCreateInput = _CreateSecretBody;
export type SecretRotateInput = _RotateSecretBody;
export type SecretRollbackInput = _RollbackSecretBody;
export type SecretMoveInput = _MoveSecretBody;
export type UpdateSecretSettingsInput = _UpdateSettingsBody;
export type SecretRevealResponse = _RevealedSecret;

export type SecretListResponse = {
  data: SecretListItem[];
  nextCursor?: string | null;
  hasMore?: boolean;
};

export type SecretCreateResponse = SecretListItem;
export type SecretRotateResponse = SecretListItem;
export type SecretRollbackResponse = SecretListItem;
export type SecretMoveResponse = SecretListItem;

export type SecretVersion = {
  version: number;
  createdBy: string;
  createdAt: string;
};
export type SecretVersionsResponse = { data: SecretVersion[] };

export type SecretSettings = {
  podId: string | null;
  rules?: unknown;
};

export type BatchOperationResponse<T> = {
  jobId: string;
  status: 'pending' | 'completed' | 'failed';
  results?: T[];
};

export type WhoAmI = {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  organisationId?: string;
  tokenKind?: 'session' | 'api_key' | 'service_token' | 'workspace';
};

// Pods
export type PodItem = _PodItem;
export type PodAncestor = _PodAncestor;
export type CreatePodInput = _CreatePodBody;
export type UpdatePodInput = _UpdatePodBody;

// Environments
export type EnvironmentItem = _EnvironmentItem;
export type CreateEnvironmentInput = _CreateEnvironmentBody;
export type ResolvedPodPayload = _ResolvedPodPayload;
export type ResolvedSecretPayload = _ResolvedSecretPayload;
export type ResolvePathResponse = _ResolvePathResponse;

// Workspaces
export type WorkspaceItem = _WorkspaceItem;
export type CreateWorkspaceInput = _CreateWorkspaceBody;

// Organisations
export type OrgItem = _OrgItem;
export type OrgDetail = _OrgDetail;
export type CreateOrgInput = _CreateOrgBody;
export type UpdateOrgInput = _UpdateOrgBody;
export type ToggleFeatureInput = _ToggleFeatureBody;
export type FeaturesResponse = _FeaturesResponse;
export type ToggleFeatureResponse = _ToggleResponse;

// Tokens (PATs)
export type TokenItem = _TokenItem;
export type CreateTokenInput = _CreateTokenBody;
export type CreatedToken = _CreatedToken;

// Service tokens
export type ServiceTokenItem = _ServiceTokenItem;
export type CreateServiceTokenInput = _CreateServiceTokenBody;
export type CreatedServiceToken = _CreatedServiceToken;
export type UpdateServiceTokenInput = _UpdateServiceTokenBody;

// Teams
export type Team = _Team;
export type TeamListItem = _TeamListItem;
export type TeamMember = _TeamMember;
export type TeamMemberRow = _TeamMemberRow;
export type TeamPolicy = _TeamPolicy;

// Policies
export type GlobalPolicy = _GlobalPolicy;
export type OrgTeamPolicy = _OrgTeamPolicy;
export type PoliciesTeamPolicy = _PoliciesTeamPolicy;
export type AccessRequest = _AccessRequest;
export type AccessGrant = _AccessGrant;
export type PolicyTemplate = _PolicyTemplate;

// Members
export type MemberItem = _MemberItem;
export type MemberRecord = _MemberRecord;
export type InviteMemberInput = _InviteBody;
export type ChangeMemberRoleInput = _ChangeRoleBody;

// Compliance
export type GenerateReportInput = _GenerateReportBody;
export type GenerateReportResponse = _GenerateReportResponse;
export type ReportStatusResponse = _ReportStatusResponse;

// Tags
export type TagInput = _TagBody;

// SSO
export type SsoToggleInput = _SsoToggleBody;

// Role permissions
export type UpdateRolePermissionInput = _UpdateRolePermissionBody;

// Auth
export type LoginInput = _LoginBody;
export type LoginResponse = _LoginResponse;
export type VerifyOtpInput = _VerifyBody;
export type VerifyOtpResponse = _VerifyResponse;
export type VerifyTotpInput = _VerifyTotpBody;
export type TotpCodeInput = _TotpCodeBody;
export type TotpSetupResponse = _TotpSetupResponse;
export type TotpVerifySetupResponse = _TotpVerifySetupResponse;
export type AuthMeResponse = _MeResponse;
export type AuthWhoamiResponse = _WhoamiResponse;

// Rotation policies
export type RotationPolicyItem = _RotationPolicyItem;
export type CreateRotationPolicyInput = _CreateRotationPolicyBody;
export type UpdateRotationPolicyInput = _UpdateRotationPolicyBody;

// Event subscriptions
export type EventSubscriptionItem = _EventSubscriptionItem;
export type EventDeliveryItem = _EventDeliveryItem;
export type EventTestResult = _EventTestResult;
export type CreateEventSubscriptionInput = _CreateEventSubscriptionBody;
export type UpdateEventSubscriptionInput = _UpdateEventSubscriptionBody;

// Dynamic secrets
export type CreateDynamicConfigInput = _CreateConfigBody;
export type UpdateDynamicConfigInput = _UpdateConfigBody;
export type IssueLeaseInput = _IssueLeaseBody;
export type RenewLeaseInput = _RenewLeaseBody;
export type ListLeasesQuery = _ListLeasesQuery;
export type DynamicAnalyticsQuery = _DynamicAnalyticsQuery;

// Billing
export type CheckoutInput = _CheckoutBody;
export type ConfirmSessionInput = _ConfirmSessionBody;
export type ConfirmSessionResponse = _ConfirmSessionResponse;
export type CancelSubscriptionInput = _CancelBody;
export type ChangePlanInput = _ChangePlanBody;

// Deployments
export type StartDeploymentInput = _StartDeploymentBody;
export type UpdateDeploymentInput = _UpdateDeploymentBody;

// Onboarding
export type OnboardingStateResponse = _OnboardingStateResponse;
export type UpdateOnboardingInput = _UpdateOnboardingBody;
export type CompleteOnboardingResponse = _CompleteOnboardingResponse;
export type SlugAvailabilityResponse = _SlugAvailabilityResponse;

// CLI
export type CliDeviceResponse = _CliDeviceResponse;
export type CliTokenInput = _CliTokenBody;
export type CliTokenResponse = _CliTokenResponse;
export type CliApproveInput = _CliApproveBody;
export type CliApproveResponse = _CliApproveResponse;

// Audit
export type AuditLogItem = _AuditLogItem;
