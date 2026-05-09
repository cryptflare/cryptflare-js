import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/billing`;

/** Stripe-backed billing. */
export class Billing extends APIResource {
  getSubscription(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/subscription` }, options);
  }

  changePlan(input: OrgInput & { plan: string; quantity?: number }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = { plan: input.plan };
    if (input.quantity !== undefined) body['quantity'] = input.quantity;
    return this.request({ method: 'POST', path: `${base(org)}/plan`, body }, options);
  }

  cancelSubscription(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: `${base(this.resolveOrg(input))}/cancel` }, options);
  }

  resubscribe(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: `${base(this.resolveOrg(input))}/resubscribe` }, options);
  }

  createCheckout(input: OrgInput & { plan: string; successUrl: string; cancelUrl: string }, options?: RequestOptions): Promise<{ url: string }> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/checkout`,
      body: { plan: input.plan, successUrl: input.successUrl, cancelUrl: input.cancelUrl },
    }, options);
  }

  confirmSession(input: OrgInput & { sessionId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/sessions/${enc(input.sessionId)}/confirm`,
    }, options);
  }

  createPortal(input: OrgInput & { returnUrl?: string } = {}, options?: RequestOptions): Promise<{ url: string }> {
    const org = this.resolveOrg(input);
    const body: Record<string, unknown> = {};
    if (input.returnUrl !== undefined) body['returnUrl'] = input.returnUrl;
    return this.request({ method: 'POST', path: `${base(org)}/portal`, body }, options);
  }

  upgradePreview(input: OrgInput & { plan: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'GET',
      path: `${base(org)}/upgrade-preview`,
      query: { plan: input.plan },
    }, options);
  }

  downgradePreview(input: OrgInput & { plan: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'GET',
      path: `${base(org)}/downgrade-preview`,
      query: { plan: input.plan },
    }, options);
  }

  listInvoices(input: OrgInput & { cursor?: string } = {}, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const query: Record<string, string> = {};
    if (input.cursor !== undefined) query['cursor'] = input.cursor;
    return this.request({ method: 'GET', path: `${base(org)}/invoices`, query }, options);
  }

  consumption(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/consumption` }, options);
  }

  listAddons(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/addons` }, options);
  }

  purchaseAddon(input: OrgInput & { addon: string; quantity: number }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/addons`,
      body: { addon: input.addon, quantity: input.quantity },
    }, options);
  }

  removeAddon(input: OrgInput & { addonId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({ method: 'DELETE', path: `${base(org)}/addons/${enc(input.addonId)}` }, options);
  }
}
