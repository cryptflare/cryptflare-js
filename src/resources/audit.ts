import { EventStream } from '../core/event-stream';
import type { PagePromise } from '../core/page-promise';
import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/audit`;

export type AuditEvent = {
  id: string;
  action: string;
  actorId?: string;
  resourceType?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  occurredAt: string;
};

/** Append-only audit log + integrity verification. */
export class Audit extends APIResource {
  list(input: OrgInput & {
    cursor?: string;
    actorId?: string;
    action?: string;
    from?: string;
    to?: string;
  } = {}, options?: RequestOptions): PagePromise<AuditEvent> {
    const org = this.resolveOrg(input);
    const fixed: Record<string, string> = {};
    if (input.actorId !== undefined) fixed['actorId'] = input.actorId;
    if (input.action !== undefined) fixed['action'] = input.action;
    if (input.from !== undefined) fixed['from'] = input.from;
    if (input.to !== undefined) fixed['to'] = input.to;
    return this.paginate<AuditEvent>((cursor) => ({
      method: 'GET',
      path: base(org),
      query: {
        ...fixed,
        ...(cursor ? { cursor } : input.cursor ? { cursor: input.cursor } : {}),
      },
    }), options);
  }

  verifyChain(input: OrgInput & { from?: string; to?: string } = {}, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const query: Record<string, string> = {};
    if (input.from !== undefined) query['from'] = input.from;
    if (input.to !== undefined) query['to'] = input.to;
    return this.request({ method: 'GET', path: `${base(org)}/verify-chain`, query }, options);
  }

  integrityReport(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/integrity-report` }, options);
  }

  /**
   * GET /v1/organisations/:org/audit/stream - SSE stream of audit events.
   * Iterates lazily; aborting `options.signal` closes the connection.
   */
  async stream(input: OrgInput & { lastEventId?: string } = {}, options?: RequestOptions): Promise<EventStream<AuditEvent>> {
    const org = this.resolveOrg(input);
    const headers: Record<string, string> = {};
    if (input.lastEventId !== undefined) headers['last-event-id'] = input.lastEventId;
    const merged: RequestOptions = {
      ...options,
      headers: { ...(options?.headers ?? {}), ...headers },
    };
    const body = await this.requestStream({ method: 'GET', path: `${base(org)}/stream` }, merged);
    return new EventStream<AuditEvent>(body, {
      parse: (event) => {
        if (event.event !== 'audit' && event.event !== 'message') return null;
        try {
          const parsed = JSON.parse(event.data) as AuditEvent;
          return parsed;
        } catch {
          return null;
        }
      },
      ...(merged.signal !== undefined ? { signal: merged.signal } : {}),
    });
  }
}
