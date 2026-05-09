import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

type OrgInput = { organisation?: string };
const base = (org: string) => `/v1/organisations/${enc(org)}/events`;

/** Webhook-style event subscriptions. */
export class EventSubscriptions extends APIResource {
  listSubscriptions(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/subscriptions` }, options);
  }

  createSubscription(input: OrgInput & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, ...body } = input;
    void _o;
    return this.request({ method: 'POST', path: `${base(org)}/subscriptions`, body }, options);
  }

  updateSubscription(input: OrgInput & { subscriptionId: string } & Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const { organisation: _o, subscriptionId, ...body } = input;
    void _o;
    return this.request({
      method: 'PATCH',
      path: `${base(org)}/subscriptions/${enc(subscriptionId)}`,
      body,
    }, options);
  }

  deleteSubscription(input: OrgInput & { subscriptionId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input);
    return this.request<void>({
      method: 'DELETE',
      path: `${base(org)}/subscriptions/${enc(input.subscriptionId)}`,
    }, options);
  }

  testSubscription(input: OrgInput & { subscriptionId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/subscriptions/${enc(input.subscriptionId)}/test`,
    }, options);
  }

  listDeliveries(input: OrgInput & { subscriptionId: string; cursor?: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    const query: Record<string, string> = {};
    if (input.cursor !== undefined) query['cursor'] = input.cursor;
    return this.request({
      method: 'GET',
      path: `${base(org)}/subscriptions/${enc(input.subscriptionId)}/deliveries`,
      query,
    }, options);
  }

  rotateSecret(input: OrgInput & { subscriptionId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/subscriptions/${enc(input.subscriptionId)}/rotate-secret`,
    }, options);
  }

  replay(input: OrgInput & { subscriptionId: string; deliveryId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/subscriptions/${enc(input.subscriptionId)}/replay`,
      body: { deliveryId: input.deliveryId },
    }, options);
  }

  redeliver(input: OrgInput & { subscriptionId: string; deliveryId: string }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/subscriptions/${enc(input.subscriptionId)}/deliveries/${enc(input.deliveryId)}/redeliver`,
    }, options);
  }

  getStatus(input: OrgInput = {}, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: `${base(this.resolveOrg(input))}/status` }, options);
  }

  toggleEvents(input: OrgInput & { enabled: boolean }, options?: RequestOptions): Promise<unknown> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `${base(org)}/toggle`,
      body: { enabled: input.enabled },
    }, options);
  }
}
