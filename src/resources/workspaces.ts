import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type WsScope = { organisation?: string; workspace?: string };

/** Workspaces. Mounted at `/v1/organisations/:org/workspaces`. */
export class Workspaces extends APIResource {
  list(input: { organisation?: string } = {}, options?: RequestOptions): Promise<unknown> {
    return this.requestData({ method: 'GET', path: `/v1/organisations/${enc(this.resolveOrg(input))}/workspaces` }, options);
  }

  create(input: { organisation?: string; name: string; slug: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.requestData({
      method: 'POST',
      path: `/v1/organisations/${enc(org)}/workspaces`,
      body: { name: input.name, slug: input.slug },
    }, options);
  }

  get(input: WsScope = {}, options?: RequestOptions): Promise<unknown> {
    const { organisation, workspace } = this.resolveWorkspace(input);
    return this.requestData({ method: 'GET', path: `/v1/organisations/${enc(organisation)}/workspaces/${enc(workspace)}` }, options);
  }

  delete(input: WsScope = {}, options?: RequestOptions): Promise<void> {
    const { organisation, workspace } = this.resolveWorkspace(input);
    return this.request<void>({
      method: 'DELETE',
      path: `/v1/organisations/${enc(organisation)}/workspaces/${enc(workspace)}`,
    }, options);
  }
}
