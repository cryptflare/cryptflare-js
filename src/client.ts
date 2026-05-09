import { resolveCredential } from './core/credentials';
import { ConfigurationError } from './core/errors';
import { RequestRunner } from './core/request';
import { detectRuntime } from './core/runtime';
import {
  Analytics,
  Audit,
  Auth,
  Billing,
  Cli,
  Compliance,
  Dashboard,
  DataResidency,
  Deployments,
  DynamicSecrets,
  Encryption,
  Environments,
  EventSubscriptions,
  Feedback,
  Integrations,
  Invitations,
  IpAllowlist,
  Me,
  Notifications,
  Onboarding,
  Organisations,
  Pods,
  Policies,
  RolePermissions,
  RotationPolicies,
  Search,
  Secrets,
  ServiceTokens,
  Sso,
  Status,
  Support,
  SyncConnections,
  Tags,
  Teams,
  Tokens,
  Transfers,
  Usage,
  Waitlist,
  WellKnown,
  Workspaces,
} from './resources';
import type { ResourceDefaults } from './resources';
import type { ClientOptions } from './types/options';

const DEFAULT_BASE_URL = 'https://api.cryptflare.com';
const DEFAULT_TIMEOUT_MS = 60_000;

/**
 * Top-level entry point for the SDK. Construct once per process and reuse;
 * the client owns the credential resolver, the retry policy, and the
 * fetch implementation, all of which are expensive to recompute per call.
 *
 * ```ts
 * const client = new CryptFlare({ apiKey: process.env.CRYPTFLARE_API_KEY! });
 * const secrets = await client.secrets.list({ organisation: 'acme', workspace: 'my-app', environment: 'production' });
 * ```
 */
export class CryptFlare {
  // -- Org-scoped resources -------------------------------------------------
  readonly analytics: Analytics;
  readonly audit: Audit;
  readonly billing: Billing;
  readonly compliance: Compliance;
  readonly dashboard: Dashboard;
  readonly dataResidency: DataResidency;
  readonly deployments: Deployments;
  readonly dynamicSecrets: DynamicSecrets;
  readonly encryption: Encryption;
  readonly environments: Environments;
  readonly eventSubscriptions: EventSubscriptions;
  readonly integrations: Integrations;
  readonly ipAllowlist: IpAllowlist;
  readonly notifications: Notifications;
  readonly organisations: Organisations;
  readonly pods: Pods;
  readonly policies: Policies;
  readonly rolePermissions: RolePermissions;
  readonly rotationPolicies: RotationPolicies;
  readonly search: Search;
  readonly secrets: Secrets;
  readonly serviceTokens: ServiceTokens;
  readonly sso: Sso;
  readonly support: Support;
  readonly syncConnections: SyncConnections;
  readonly tags: Tags;
  readonly teams: Teams;
  readonly tokens: Tokens;
  readonly transfers: Transfers;
  readonly usage: Usage;
  readonly workspaces: Workspaces;

  // -- Identity / session ---------------------------------------------------
  readonly auth: Auth;
  readonly me: Me;

  // -- Top-level + public ---------------------------------------------------
  readonly cli: Cli;
  readonly feedback: Feedback;
  readonly invitations: Invitations;
  readonly onboarding: Onboarding;
  readonly status: Status;
  readonly waitlist: Waitlist;
  readonly wellKnown: WellKnown;

  /**
   * Low-level request orchestrator. Resources call into it via the
   * `APIResource` base class. Exposed publicly so consumers writing
   * migration shims or covering not-yet-typed endpoints can issue raw
   * requests with the same auth, retry, idempotency, and error handling
   * the typed resources use. New code should prefer the typed resource
   * methods - reach for this only when no resource method exists.
   */
  readonly runner: RequestRunner;

  constructor(options: ClientOptions = {}) {
    if (detectRuntime() === 'browser' && !options.dangerouslyAllowBrowser) {
      throw new ConfigurationError(
        'Refusing to construct CryptFlare in a browser context. Service tokens must never reach a browser bundle. '
        + 'Pass `dangerouslyAllowBrowser: true` only when you accept the security implications.',
      );
    }

    const credential = resolveCredential(options);
    const fetchImpl = options.fetch ?? globalThis.fetch.bind(globalThis);

    this.runner = new RequestRunner({
      baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
      timeoutMs: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
      retry: options.retry ?? {},
      fetchImpl,
      credential,
      hooks: options.hooks ?? {},
      ...(options.userAgentSuffix !== undefined ? { userAgentSuffix: options.userAgentSuffix } : {}),
    });

    const defaults: ResourceDefaults = {
      ...(options.organisation !== undefined ? { organisation: options.organisation } : {}),
      ...(options.workspace !== undefined ? { workspace: options.workspace } : {}),
      ...(options.environment !== undefined ? { environment: options.environment } : {}),
    };

    const r = this.runner;

    this.analytics = new Analytics(r, defaults);
    this.audit = new Audit(r, defaults);
    this.auth = new Auth(r, defaults);
    this.billing = new Billing(r, defaults);
    this.cli = new Cli(r, defaults);
    this.compliance = new Compliance(r, defaults);
    this.dashboard = new Dashboard(r, defaults);
    this.dataResidency = new DataResidency(r, defaults);
    this.deployments = new Deployments(r, defaults);
    this.dynamicSecrets = new DynamicSecrets(r, defaults);
    this.encryption = new Encryption(r, defaults);
    this.environments = new Environments(r, defaults);
    this.eventSubscriptions = new EventSubscriptions(r, defaults);
    this.feedback = new Feedback(r, defaults);
    this.integrations = new Integrations(r, defaults);
    this.invitations = new Invitations(r, defaults);
    this.ipAllowlist = new IpAllowlist(r, defaults);
    this.me = new Me(r, defaults);
    this.notifications = new Notifications(r, defaults);
    this.onboarding = new Onboarding(r, defaults);
    this.organisations = new Organisations(r, defaults);
    this.pods = new Pods(r, defaults);
    this.policies = new Policies(r, defaults);
    this.rolePermissions = new RolePermissions(r, defaults);
    this.rotationPolicies = new RotationPolicies(r, defaults);
    this.search = new Search(r, defaults);
    this.secrets = new Secrets(r, defaults);
    this.serviceTokens = new ServiceTokens(r, defaults);
    this.sso = new Sso(r, defaults);
    this.status = new Status(r, defaults);
    this.support = new Support(r, defaults);
    this.syncConnections = new SyncConnections(r, defaults);
    this.tags = new Tags(r, defaults);
    this.teams = new Teams(r, defaults);
    this.tokens = new Tokens(r, defaults);
    this.transfers = new Transfers(r, defaults);
    this.usage = new Usage(r, defaults);
    this.waitlist = new Waitlist(r, defaults);
    this.wellKnown = new WellKnown(r, defaults);
    this.workspaces = new Workspaces(r, defaults);
  }
}
