/**
 * Public type exports. Resource shapes inferred from the same Zod schemas
 * the API validates against, sourced from `@cryptflare/shared/schemas/*`.
 * Adding a field to the schema flows to API + SDK in one edit.
 */

export type * from './options'
export type * from './audit'
export type * from './auth'
export type * from './billing'
export type * from './cli'
export type * from './compliance'
export type * from './deployments'
export type * from './dynamic-secrets'
export type * from './encryption'
export type * from './environments'
export type * from './event-subscriptions'
export type * from './integrations'
export type * from './invitations'
export type * from './members'
export type * from './onboarding'
export type * from './organisations'
export type * from './pods'
export type * from './policies'
export type * from './role-permissions'
export type * from './rotation-policies'
export type * from './secrets'
export type * from './service-tokens'
export type * from './sso'
export type * from './status'
export type * from './support'
export type * from './sync-connections'
export type * from './tags'
export type * from './teams'
export type * from './tokens'
export type * from './transfers'
export type * from './waitlist'
export type * from './workspaces'

import type { SecretListItem, SecretVersion } from './secrets'
import type { ClaimLinkResponse } from './tokens'
import type { RevealedSecret as _RevealedSecret } from '../_vendored/schemas/secrets'
export type Scope = {
  organisation?: string
  workspace?: string
  environment?: string
}

// Re-export schema-derived shapes under stable SDK names so call sites do
// not have to know the schema-package layout.

/** Result of `secrets.revealMany`. `missing` names requested keys that do
 *  not exist, so one stale key cannot fail an otherwise good batch. */
export type SecretRevealManyResponse = {
  secrets: _RevealedSecret[]
  missing: string[]
  encoding: 'utf-8' | 'base64'
  /**
   * Cursor for the next page when revealing a whole environment; `null` on
   * the last page. Absent on API versions that predate paging.
   */
  nextCursor?: string | null
}

export type SecretListResponse = {
  data: SecretListItem[]
  nextCursor?: string | null
  hasMore?: boolean
}

export type SecretCreateResponse = SecretListItem
export type SecretRotateResponse = SecretListItem
export type SecretRollbackResponse = SecretListItem
export type SecretMoveResponse = SecretListItem

export type SecretVersionsResponse = { data: SecretVersion[] }

/**
 * @deprecated Shape of a batch job queued by an earlier API version, read
 * through `secrets.batchStatus`. Batch methods now return {@link BatchResult}.
 */
export type BatchOperationResponse<T> = {
  jobId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  results?: T[] | null
}

/** The claim link `tokens.createClaimLink` returns. */
export type ClaimLink = ClaimLinkResponse['data']
