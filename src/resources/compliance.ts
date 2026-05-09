import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/compliance`;

/** Compliance reports (SOC2, HIPAA, etc.). */
export class Compliance extends APIResource {
  generateReport(input: OrgInput & { framework: string; periodStart: string; periodEnd: string }, options?: RequestOptions): Promise<{ reportId: string }> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/reports`,
      body: { framework: input.framework, periodStart: input.periodStart, periodEnd: input.periodEnd },
    }, options);
  }

  reportStatus(input: OrgInput & { reportId: string }, options?: RequestOptions): Promise<{ status: 'pending' | 'ready' | 'failed' }> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/reports/${enc(input.reportId)}` }, options);
  }

  downloadReport(input: OrgInput & { reportId: string }, options?: RequestOptions): Promise<{ url: string }> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `${base(org)}/reports/${enc(input.reportId)}/download` }, options);
  }
}
