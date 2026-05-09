import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/transfer`;

/**
 * Outgoing org transfers. The `organisations.initiateTransfer` /
 * `getTransfer` / `cancelTransfer` methods cover the sender side; the
 * methods here cover the recipient side.
 */
export class Transfers extends APIResource {
  pending(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/pending` }, options);
  }

  accept(input: OrgInput & { transferId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'POST', path: `${base(org)}/${enc(input.transferId)}/accept` }, options);
  }

  decline(input: OrgInput & { transferId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'POST', path: `${base(org)}/${enc(input.transferId)}/decline` }, options);
  }
}
