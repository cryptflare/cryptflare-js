import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type EnvScope = { organisation?: string; workspace?: string; environment?: string };

const wsBase = (org: string, ws: string) => `/v1/organisations/${enc(org)}/workspaces/${enc(ws)}/environments`;

/** Environments. Mounted at `/v1/organisations/:org/workspaces/:ws/environments`. */
export class Environments extends APIResource {
  list(input: { organisation?: string; workspace?: string } = {}, options?: RequestOptions): Promise<unknown> {
    const { organisation, workspace } = this.resolveWorkspace(input);
    return this.requestData({ method: 'GET', path: wsBase(organisation, workspace) }, options);
  }

  create(input: { organisation?: string; workspace?: string; name: string; slug: string }, options?: RequestOptions): Promise<unknown> {
    const { organisation, workspace } = this.resolveWorkspace(input);
    return this.requestData({
      method: 'POST',
      path: wsBase(organisation, workspace),
      body: { name: input.name, slug: input.slug },
    }, options);
  }

  delete(input: EnvScope = {}, options?: RequestOptions): Promise<void> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.request<void>({
      method: 'DELETE',
      path: `${wsBase(organisation, workspace)}/${enc(environment)}`,
    }, options);
  }

  /** GET /v1/organisations/:org/workspaces/:ws/environments/:env/resolve?path=... */
  resolvePath(input: EnvScope & { path: string }, options?: RequestOptions): Promise<unknown> {
    const { organisation, workspace, environment } = this.resolveScope(input);
    return this.requestData({
      method: 'GET',
      path: `${wsBase(organisation, workspace)}/${enc(environment)}/resolve`,
      query: { path: input.path },
    }, options);
  }
}
