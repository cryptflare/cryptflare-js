import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/support`;

/** Customer support tickets. */
export class Support extends APIResource {
  list(input: OrgInput & { cursor?: string; status?: string } = {}, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const query: Record<string, string> = {};
    if (input.cursor !== undefined) query['cursor'] = input.cursor;
    if (input.status !== undefined) query['status'] = input.status;
    return this.request({ method: 'GET', path: `${base(org)}/tickets`, query }, options);
  }

  create(input: OrgInput & { subject: string; body: string; priority?: 'low' | 'normal' | 'high' }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = { subject: input.subject, body: input.body };
    if (input.priority !== undefined) body['priority'] = input.priority;
    return this.request({ method: 'POST', path: `${base(org)}/tickets`, body }, options);
  }

  get(input: OrgInput & { ticketId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/tickets/${enc(input.ticketId)}` }, options);
  }

  addMessage(input: OrgInput & { ticketId: string; body: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/tickets/${enc(input.ticketId)}/messages`,
      body: { body: input.body },
    }, options);
  }

  close(input: OrgInput & { ticketId: string; resolution?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = {};
    if (input.resolution !== undefined) body['resolution'] = input.resolution;
    return this.request({
      method: 'POST',
      path: `${base(org)}/tickets/${enc(input.ticketId)}/close`,
      body,
    }, options);
  }

  uploadAttachment(input: OrgInput & { ticketId: string; filename: string; contentType: string; size: number }, options?: RequestOptions): Promise<{ uploadUrl: string; attachmentId: string }> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/tickets/${enc(input.ticketId)}/attachments`,
      body: { filename: input.filename, contentType: input.contentType, size: input.size },
    }, options);
  }
}
