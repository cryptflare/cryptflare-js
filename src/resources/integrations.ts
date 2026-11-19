import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  AwsFederationMetadataResponse,
  AwsSecretListResponse,
  AzureConsentUrlResponse,
  AzureVaultListResponse,
  CloudflareWorkerListResponse,
  GcpFederationMetadataResponse,
  GcpSecretListResponse,
  GitHubCallbackResponse,
  GitHubInstallUrlResponse,
  GitHubRepositoryListResponse,
  IntegrationListResponse,
  IntegrationProbeResponse,
  K8sNamespaceListResponse,
  NetlifySiteListResponse,
  RailwayProjectListResponse,
  RegisterAwsInput,
  RegisterAwsResponse,
  RegisterCloudflareInput,
  RegisterCloudflareResponse,
  RegisterGcpInput,
  RegisterGcpResponse,
  RegisterK8sClusterInput,
  RegisterK8sClusterResponse,
  RegisterNetlifyInput,
  RegisterNetlifyResponse,
  RegisterRailwayInput,
  RegisterRailwayResponse,
  RegisterVercelInput,
  RegisterVercelResponse,
  VercelProjectListResponse,
} from '../types'

type OrgInput = { organisation?: string }
type IntegrationInput = OrgInput & { integrationId: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/integrations`

/**
 * Cloud + CI provider integrations. One resource per integration kept thin
 * so each provider keeps its own params - the API mirrors this shape per
 * route. When the schemas centralise (task 102) these signatures gain
 * provider-specific structure.
 */
export class Integrations extends APIResource {
  /** `GET /v1/organisations/:org/integrations`. Requires `integrations:read`. */
  list(input: OrgInput = {}, options?: RequestOptions): Promise<IntegrationListResponse> {
    return this.request<IntegrationListResponse>(
      { method: 'GET', path: base(this.resolveOrg(input)) },
      options,
    )
  }

  /**
   * POST /integrations/:id/probe - tests an existing integration's credentials.
   *
   * Previously posted to `/integrations/probe`, which does not exist; probing
   * is scoped to a specific integration, so `integrationId` is now required. Requires `integrations:manage`.
   */
  probe(
    input: OrgInput & { integrationId: string; provider: string; config: Record<string, unknown> },
    options?: RequestOptions,
  ): Promise<IntegrationProbeResponse> {
    const org = this.resolveOrg(input)
    return this.request<IntegrationProbeResponse>(
      {
        method: 'POST',
        path: `${base(org)}/${enc(input.integrationId)}/probe`,
        body: { provider: input.provider, config: input.config },
      },
      options,
    )
  }

  /** `DELETE /v1/organisations/:org/integrations/:integrationId`. Requires `integrations:manage`. */
  delete(input: OrgInput & { integrationId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      { method: 'DELETE', path: `${base(org)}/${enc(input.integrationId)}` },
      options,
    )
  }

  // -- AWS ------------------------------------------------------------------
  /** `POST /v1/organisations/:org/integrations/aws/register`. Requires `integrations:manage`. */
  registerAws(
    input: OrgInput & RegisterAwsInput,
    options?: RequestOptions,
  ): Promise<RegisterAwsResponse> {
    return this.providerPost<RegisterAwsResponse>('aws/register', input, options)
  }
  /** `GET /v1/organisations/:org/integrations/:integrationId/aws-federation`. Requires `integrations:read`. */
  awsFederation(
    input: IntegrationInput,
    options?: RequestOptions,
  ): Promise<AwsFederationMetadataResponse> {
    return this.integrationGet<AwsFederationMetadataResponse>('aws-federation', input, options)
  }
  /**
   * `GET /v1/organisations/:org/integrations/:integrationId/aws-secrets`. The
   * region comes from the integration, so there is no region parameter.
   * Requires `integrations:read`.
   */
  listAwsSecrets(
    input: IntegrationInput,
    options?: RequestOptions,
  ): Promise<AwsSecretListResponse> {
    return this.integrationGet<AwsSecretListResponse>('aws-secrets', input, options)
  }

  // -- Azure ----------------------------------------------------------------
  /**
   * `POST /v1/organisations/:org/integrations/azure/consent-url`. Azure has
   * no register call: open the returned admin-consent URL and the API
   * records the tenant when Azure redirects back. Requires `integrations:manage`.
   */
  registerAzure(input: OrgInput = {}, options?: RequestOptions): Promise<AzureConsentUrlResponse> {
    const org = this.resolveOrg(input)
    return this.request<AzureConsentUrlResponse>(
      { method: 'POST', path: `${base(org)}/azure/consent-url` },
      options,
    )
  }
  /** `GET /v1/organisations/:org/integrations/:integrationId/vaults`. Requires `integrations:read`. */
  listAzureVaults(
    input: IntegrationInput,
    options?: RequestOptions,
  ): Promise<AzureVaultListResponse> {
    return this.integrationGet<AzureVaultListResponse>('vaults', input, options)
  }

  // -- GCP ------------------------------------------------------------------
  /** `POST /v1/organisations/:org/integrations/gcp/register`. Requires `integrations:manage`. */
  registerGcp(
    input: OrgInput & RegisterGcpInput,
    options?: RequestOptions,
  ): Promise<RegisterGcpResponse> {
    return this.providerPost<RegisterGcpResponse>('gcp/register', input, options)
  }
  /** `GET /v1/organisations/:org/integrations/:integrationId/gcp-federation`. Requires `integrations:read`. */
  gcpFederation(
    input: IntegrationInput,
    options?: RequestOptions,
  ): Promise<GcpFederationMetadataResponse> {
    return this.integrationGet<GcpFederationMetadataResponse>('gcp-federation', input, options)
  }
  /**
   * `GET /v1/organisations/:org/integrations/:integrationId/gcp-secrets`. The
   * project comes from the integration, so there is no project parameter.
   * Requires `integrations:read`.
   */
  listGcpSecrets(
    input: IntegrationInput,
    options?: RequestOptions,
  ): Promise<GcpSecretListResponse> {
    return this.integrationGet<GcpSecretListResponse>('gcp-secrets', input, options)
  }

  // -- Cloudflare -----------------------------------------------------------
  /** `POST /v1/organisations/:org/integrations/cloudflare/register`. Requires `integrations:manage`. */
  registerCloudflare(
    input: OrgInput & RegisterCloudflareInput,
    options?: RequestOptions,
  ): Promise<RegisterCloudflareResponse> {
    return this.providerPost<RegisterCloudflareResponse>('cloudflare/register', input, options)
  }
  /** `GET /v1/organisations/:org/integrations/:integrationId/workers`. Requires `integrations:read`. */
  listCloudflareWorkers(
    input: IntegrationInput,
    options?: RequestOptions,
  ): Promise<CloudflareWorkerListResponse> {
    return this.integrationGet<CloudflareWorkerListResponse>('workers', input, options)
  }

  // -- Kubernetes -----------------------------------------------------------
  /** `POST /v1/organisations/:org/integrations/k8s/register`. Requires `integrations:manage`. */
  registerK8s(
    input: OrgInput & RegisterK8sClusterInput,
    options?: RequestOptions,
  ): Promise<RegisterK8sClusterResponse> {
    return this.providerPost<RegisterK8sClusterResponse>('k8s/register', input, options)
  }
  /** `GET /v1/organisations/:org/integrations/:integrationId/namespaces`. Requires `integrations:read`. */
  listK8sNamespaces(
    input: IntegrationInput,
    options?: RequestOptions,
  ): Promise<K8sNamespaceListResponse> {
    return this.integrationGet<K8sNamespaceListResponse>('namespaces', input, options)
  }

  // -- Netlify --------------------------------------------------------------
  /** `POST /v1/organisations/:org/integrations/netlify/register`. Requires `integrations:manage`. */
  registerNetlify(
    input: OrgInput & RegisterNetlifyInput,
    options?: RequestOptions,
  ): Promise<RegisterNetlifyResponse> {
    return this.providerPost<RegisterNetlifyResponse>('netlify/register', input, options)
  }
  /** `GET /v1/organisations/:org/integrations/:integrationId/sites`. Requires `integrations:read`. */
  listNetlifySites(
    input: IntegrationInput,
    options?: RequestOptions,
  ): Promise<NetlifySiteListResponse> {
    return this.integrationGet<NetlifySiteListResponse>('sites', input, options)
  }

  // -- Railway --------------------------------------------------------------
  /** `POST /v1/organisations/:org/integrations/railway/register`. Requires `integrations:manage`. */
  registerRailway(
    input: OrgInput & RegisterRailwayInput,
    options?: RequestOptions,
  ): Promise<RegisterRailwayResponse> {
    return this.providerPost<RegisterRailwayResponse>('railway/register', input, options)
  }
  /** `GET /v1/organisations/:org/integrations/:integrationId/railway-projects`. Requires `integrations:read`. */
  listRailwayProjects(
    input: IntegrationInput,
    options?: RequestOptions,
  ): Promise<RailwayProjectListResponse> {
    return this.integrationGet<RailwayProjectListResponse>('railway-projects', input, options)
  }

  // -- Vercel ---------------------------------------------------------------
  /** `POST /v1/organisations/:org/integrations/vercel/register`. Requires `integrations:manage`. */
  registerVercel(
    input: OrgInput & RegisterVercelInput,
    options?: RequestOptions,
  ): Promise<RegisterVercelResponse> {
    return this.providerPost<RegisterVercelResponse>('vercel/register', input, options)
  }
  /** `GET /v1/organisations/:org/integrations/:integrationId/projects`. Requires `integrations:read`. */
  listVercelProjects(
    input: IntegrationInput,
    options?: RequestOptions,
  ): Promise<VercelProjectListResponse> {
    return this.integrationGet<VercelProjectListResponse>('projects', input, options)
  }

  // -- GitHub ---------------------------------------------------------------
  /**
   * `POST /v1/organisations/:org/integrations/github/install-url`. The URL is
   * at `data.url`. Requires `integrations:manage`.
   */
  githubInstallUrl(
    input: OrgInput = {},
    options?: RequestOptions,
  ): Promise<GitHubInstallUrlResponse> {
    return this.providerPost<GitHubInstallUrlResponse>('github/install-url', input, options)
  }
  /**
   * `POST /v1/organisations/:org/integrations/github/callback` - completes a
   * GitHub App install. `state` is the value {@link githubInstallUrl} returned.
   * Requires `integrations:manage`.
   */
  githubCallback(
    input: OrgInput & { installationId: number; state: string; setupAction?: string },
    options?: RequestOptions,
  ): Promise<GitHubCallbackResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {
      installationId: input.installationId,
      state: input.state,
    }
    if (input.setupAction !== undefined) body['setupAction'] = input.setupAction
    return this.request<GitHubCallbackResponse>(
      {
        method: 'POST',
        path: `${base(org)}/github/callback`,
        body,
      },
      options,
    )
  }
  /** `GET /v1/organisations/:org/integrations/:integrationId/repositories`. Requires `integrations:read`. */
  listRepositories(
    input: IntegrationInput & { q?: string; limit?: number },
    options?: RequestOptions,
  ): Promise<GitHubRepositoryListResponse> {
    const query: Record<string, string> = {}
    if (input.q !== undefined) query['q'] = input.q
    if (input.limit !== undefined) query['limit'] = String(input.limit)
    return this.integrationGet<GitHubRepositoryListResponse>('repositories', input, options, query)
  }

  // -- helpers --------------------------------------------------------------

  private integrationGet<T>(
    suffix: string,
    input: IntegrationInput,
    options?: RequestOptions,
    query?: Record<string, string>,
  ): Promise<T> {
    const org = this.resolveOrg(input)
    return this.request<T>(
      { method: 'GET', path: `${base(org)}/${enc(input.integrationId)}/${suffix}`, query },
      options,
    )
  }

  private providerPost<T>(
    suffix: string,
    input: OrgInput & object,
    options?: RequestOptions,
  ): Promise<T> {
    const org = this.resolveOrg(input)
    const { organisation: _o, ...body } = input
    void _o
    return this.request<T>({ method: 'POST', path: `${base(org)}/${suffix}`, body }, options)
  }
}
