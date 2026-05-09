import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/integrations`;

/**
 * Cloud + CI provider integrations. One resource per integration kept thin
 * so each provider keeps its own params - the API mirrors this shape per
 * route. When the schemas centralise (task 102) these signatures gain
 * provider-specific structure.
 */
export class Integrations extends APIResource {
  list(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: base(this.resolveOrg(input)) }, options);
  }

  probe(input: OrgInput & { provider: string; config: Record<string, unknown> }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/probe`,
      body: { provider: input.provider, config: input.config },
    }, options);
  }

  delete(input: OrgInput & { integrationId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({ method: 'DELETE', path: `${base(org)}/${enc(input.integrationId)}` }, options);
  }

  // -- AWS ------------------------------------------------------------------
  registerAws(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    return this.providerPost('aws/register', input, options);
  }
  awsFederation(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.providerGet('aws/federation', input, options);
  }
  listAwsSecrets(input: OrgInput & { region?: string } = {}, options?: RequestOptions): Promise<unknown> {
    return this.providerGet('aws/secrets', input, options, input.region !== undefined ? { region: input.region } : undefined);
  }

  // -- Azure ----------------------------------------------------------------
  registerAzure(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    return this.providerPost('azure/register', input, options);
  }
  listAzureVaults(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.providerGet('azure/vaults', input, options);
  }

  // -- GCP ------------------------------------------------------------------
  registerGcp(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    return this.providerPost('gcp/register', input, options);
  }
  gcpFederation(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.providerGet('gcp/federation', input, options);
  }
  listGcpSecrets(input: OrgInput & { project?: string } = {}, options?: RequestOptions): Promise<unknown> {
    return this.providerGet('gcp/secrets', input, options, input.project !== undefined ? { project: input.project } : undefined);
  }

  // -- Cloudflare -----------------------------------------------------------
  registerCloudflare(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    return this.providerPost('cloudflare/register', input, options);
  }
  listCloudflareWorkers(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.providerGet('cloudflare/workers', input, options);
  }

  // -- Kubernetes -----------------------------------------------------------
  registerK8s(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    return this.providerPost('k8s/register', input, options);
  }
  listK8sNamespaces(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.providerGet('k8s/namespaces', input, options);
  }

  // -- Netlify --------------------------------------------------------------
  registerNetlify(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    return this.providerPost('netlify/register', input, options);
  }
  listNetlifySites(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.providerGet('netlify/sites', input, options);
  }

  // -- Railway --------------------------------------------------------------
  registerRailway(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    return this.providerPost('railway/register', input, options);
  }
  listRailwayProjects(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.providerGet('railway/projects', input, options);
  }

  // -- Vercel ---------------------------------------------------------------
  registerVercel(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    return this.providerPost('vercel/register', input, options);
  }
  listVercelProjects(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.providerGet('vercel/projects', input, options);
  }

  // -- GitHub ---------------------------------------------------------------
  githubInstallUrl(input: OrgInput = {}, options?: RequestOptions): Promise<{ url: string }> {
    return this.providerPost('github/install-url', input, options);
  }
  githubCallback(input: OrgInput & { installationId: string; setupAction: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/github/callback`,
      body: { installationId: input.installationId, setupAction: input.setupAction },
    }, options);
  }
  listRepositories(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.providerGet('github/repositories', input, options);
  }

  // -- helpers --------------------------------------------------------------

  private providerGet<T = unknown>(
    suffix: string,
    input: OrgInput,
    options?: RequestOptions,
    query?: Record<string, string | number>,
  ): Promise<T> {
    const org = this.resolveOrg(input);
    return this.request<T>({ method: 'GET', path: `${base(org)}/${suffix}`, query }, options);
  }

  private providerPost<T = unknown>(suffix: string, input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<T> {
    const org = this.resolveOrg(input);
    const { organisation: _o, ...body } = input;
    void _o;
    return this.request<T>({ method: 'POST', path: `${base(org)}/${suffix}`, body }, options);
  }
}
