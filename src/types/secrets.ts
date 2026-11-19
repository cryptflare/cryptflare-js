/** Public types backed by the vendored `secrets` schemas. */
import type {
  BatchItemResult as _BatchItemResult,
  BatchResult as _BatchResult,
  BatchSummary as _BatchSummary,
  CreateSecretBody as _CreateSecretBody,
  MoveSecretBody as _MoveSecretBody,
  RevealedSecret as _RevealedSecret,
  RollbackSecretBody as _RollbackSecretBody,
  RotateSecretBody as _RotateSecretBody,
  SecretListItem as _SecretListItem,
  SecretSettings as _SecretSettings,
  SecretVersionListItem as _SecretVersionListItem,
  UpdateSettingsBody as _UpdateSettingsBody,
} from '../_vendored/schemas/secrets'

export type SecretListItem = _SecretListItem
export type SecretCreateInput = _CreateSecretBody
export type SecretRotateInput = _RotateSecretBody
export type SecretRollbackInput = _RollbackSecretBody
export type SecretMoveInput = _MoveSecretBody
export type UpdateSecretSettingsInput = _UpdateSettingsBody
export type SecretRevealResponse = _RevealedSecret
/** One row of `secrets.listVersions`. Inferred from the API's `SecretVersionListItemSchema`. */
export type SecretVersion = _SecretVersionListItem
/** Per-secret settings from `secrets.getSettings`. Inferred from the API's `SecretSettingsSchema`. */
export type SecretSettings = _SecretSettings
/** Outcome of one item in a batch create, update or delete. */
export type BatchItemResult = _BatchItemResult
/** Per-status counters for a batch. */
export type BatchSummary = _BatchSummary
/**
 * Result of `secrets.batchCreate`, `batchUpdate` and `batchDelete`. Batches
 * complete inside the request, so `results` is always present.
 */
export type BatchResult = _BatchResult
