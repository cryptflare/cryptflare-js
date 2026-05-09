/**
 * Webhook event payload typings.
 *
 * The platform sends webhook events whose `type` field is one of the
 * strings in `WebhookEventType`. The values are hand-mirrored from
 * `@cryptflare/shared/constants/audit-actions` (the API's source of
 * truth) so that SDK consumers get strict autocomplete on `event.type`
 * without depending on an internal package at runtime.
 *
 * Adding a new event:
 * 1. Add the entry to `AUDIT_ACTIONS` in `packages/shared/src/constants/audit-actions.ts`.
 * 2. Append the same string literal to `WEBHOOK_EVENT_TYPES` below.
 * 3. (Optional) Add a more specific payload shape to `WebhookEventPayloads`
 *    so callers can `switch` and narrow.
 *
 * The payload `data` shape is currently `Record<string, unknown>` for
 * forward compatibility; we lock individual events down to typed
 * payloads incrementally as they stabilise.
 */

export const WEBHOOK_EVENT_TYPES = [
  // Organisation
  'organisation.created',
  'organisation.updated',
  'organisation.deleted',
  'organisation.data_region_changed',
  'organisation.transfer_initiated',
  'organisation.transfer_cancelled',
  'organisation.transfer_accepted',
  'organisation.feature_toggled',
  // Onboarding
  'onboarding.complete',
  // Secrets
  'secret.created',
  'secret.revealed',
  'secret.rotated',
  'secret.rolled_back',
  'secret.moved',
  'secret.deleted',
  'secret.settings_updated',
  'secret.locked',
  'secret.unlocked',
  'secret.rules_updated',
  'secret.auto_rotated',
  'secrets.exported',
  'secrets.imported',
  'secrets.batch_created',
  'secrets.batch_updated',
  'secrets.batch_deleted',
  // Pods
  'pod.created',
  'pod.updated',
  'pod.deleted',
  // Workspaces
  'workspace.created',
  'workspace.delete_requested',
  'workspace.deleted',
  // Members
  'member.invited',
  'member.removed',
  'member.role_changed',
  'invitation.revoked',
  'invitation.resent',
  // Tokens
  'token.created',
  'token.revoked',
  // Service tokens
  'service_token.created',
  'service_token.updated',
  'service_token.revoked',
  // Policies + JIT access
  'policy.created',
  'policy.updated',
  'policy.deleted',
  'policy.toggled',
  'policies.imported',
  'policy.template_applied',
  'access.requested',
  'access.granted',
  'access.denied',
  'access.revoked',
  // Teams
  'team.created',
  'team.updated',
  'team.deleted',
  'team.member_added',
  'team.member_removed',
  'team.policy_added',
  'team.policy_removed',
  // Encryption (BYOK)
  'encryption.byok_enabled',
  'encryption.byok_disabled',
  // Billing
  'billing.subscription_cancelled',
  'billing.subscription_resubscribed',
  'billing.plan_changed',
  // Role permissions
  'role_permission.updated',
  // Event subscriptions self-events
  'event_subscription.created',
  'event_subscription.updated',
  'event_subscription.deleted',
  'event_subscription.tested',
  'event_subscription.auto_disabled',
  // Audit integrity
  'audit.integrity_failure_detected',
  // Compliance reports
  'compliance.report_generated',
  // Rotation policies
  'rotation_policy.created',
  'rotation_policy.updated',
  'rotation_policy.deleted',
  'rotation_policy.toggled',
  'rotation_policy.run_now',
  // Sync connections
  'sync_connection.created',
  'sync_connection.updated',
  'sync_connection.deleted',
  'sync_connection.toggled',
  'sync.triggered',
  'sync.completed',
  'sync.failed',
  // Org integrations
  'org_integration.installed',
  'org_integration.removed',
  'org_integration.refreshed',
  'org_integration.revoked',
  // Dynamic secrets
  'dynamic_config.created',
  'dynamic_config.updated',
  'dynamic_config.deleted',
  'dynamic_config.validated',
  'dynamic_lease.issued',
  'dynamic_lease.expired',
  'dynamic_lease.revoked',
  'dynamic_lease.irrevocable',
  // Resource tags
  'tag.added',
  'tag.removed',
] as const;

export type WebhookEventType = typeof WEBHOOK_EVENT_TYPES[number];

/**
 * Per-event payload shapes for the events whose schemas are stable.
 * Anything not listed defaults to `Record<string, unknown>` via the
 * generic `WebhookEvent<T>` below.
 */
export type WebhookEventPayloads = {
  'secret.created': { key: string; podId: string | null; version: number };
  'secret.revealed': { key: string; version: number };
  'secret.rotated': { key: string; version: number; previousVersion: number };
  'secret.rolled_back': { key: string; version: number; rolledBackTo: number };
  'secret.moved': { key: string; fromPodId: string | null; toPodId: string | null };
  'secret.deleted': { key: string; version: number };
  'secret.locked': { key: string };
  'secret.unlocked': { key: string };
  'secret.auto_rotated': { key: string; version: number; rotationPolicyId: string };
  'pod.created': { id: string; name: string; slug: string; parentId: string | null };
  'pod.updated': { id: string; name?: string; slug?: string };
  'pod.deleted': { id: string };
  'workspace.created': { id: string; name: string; slug: string };
  'workspace.deleted': { id: string };
  'token.created': { id: string; name: string; tokenPrefix: string; scopes: string[] };
  'token.revoked': { id: string };
  'service_token.created': { id: string; name: string; tokenPrefix: string; workspaceId: string };
  'service_token.revoked': { id: string };
  'sync.triggered': { connectionId: string; secretCount: number };
  'sync.completed': { connectionId: string; secretCount: number; durationMs: number };
  'sync.failed': { connectionId: string; error: string };
  'dynamic_lease.issued': { leaseId: string; provider: string; ttlSeconds: number };
  'dynamic_lease.expired': { leaseId: string };
  'dynamic_lease.revoked': { leaseId: string; reason?: string };
  'compliance.report_generated': { reportId: string; framework: string };
  'event_subscription.auto_disabled': { subscriptionId: string; consecutiveFailures: number };
};

/**
 * The discriminated union returned by `verifyWebhook`. Switch on
 * `event.type` to narrow the `data` shape.
 */
export type WebhookEvent = {
  [K in WebhookEventType]: {
    /** Stable event identifier (`evt_...`). */
    id: string;
    /** Discriminator. Switch on this. */
    type: K;
    /** ISO 8601 timestamp the event was emitted by the API. */
    occurredAt: string;
    /** Organisation that owns the resource. */
    organisation: string;
    /** Workspace slug, if scoped. */
    workspace?: string;
    /** Environment slug, if scoped. */
    environment?: string;
    /** Caller that produced the event. */
    actor: {
      type: 'user' | 'service_token' | 'system';
      id: string;
      email?: string;
    };
    /** Per-event payload. Falls back to a free-form object for events
     *  whose schemas are not yet locked. */
    data: K extends keyof WebhookEventPayloads ? WebhookEventPayloads[K] : Record<string, unknown>;
  };
}[WebhookEventType];

/** True when `e.type` is a recognised event type. */
export function isKnownEventType(value: string): value is WebhookEventType {
  return (WEBHOOK_EVENT_TYPES as readonly string[]).includes(value);
}
