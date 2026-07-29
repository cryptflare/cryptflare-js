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
    return this.request({ method: 'GET', path: `${base(org)}/verify`, query }, options);
  }

  integrityReport(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/verify/report` }, options);
  }

  /**
   * POST /v1/organisations/:org/audit/export - downloads the audit log
   * window as a JSON Lines stream. Returns the response body as a
   * ReadableStream<Uint8Array> the caller can pipe to disk or iterate
   * line-by-line. Throttled server-side to one export per hour per org.
   */
  async export(
    input: OrgInput & { startDate: string; endDate: string },
    options?: RequestOptions,
  ): Promise<ReadableStream<Uint8Array>> {
    const org = this.resolveOrg(input);
    return this.requestStream({
      method: 'POST',
      path: `${base(org)}/export`,
      query: { startDate: input.startDate, endDate: input.endDate },
    }, options);
  }

  /**
   * GET /v1/organisations/:org/audit/stream - SSE stream of audit events.
   * Iterates lazily; aborting `options.signal` closes the connection.
   */
  /**
   * @deprecated No such endpoint. The API implements no
   * `GET /organisations/:org/audit/stream`, so this can only ever 404. Kept so
   * the removal lands in a major - poll `audit.list` instead.
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
