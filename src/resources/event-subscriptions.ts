import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  EventDeliveryListResponse,
  EventSubscriptionListResponse,
  EventSubscriptionResponse,
  EventTestResultResponse,
  EventsStatusResponse,
  ReplayEventsResponse,
  RotateSubscriptionSecretResponse,
  ToggleEventsResponse,
} from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/events`

/** Webhook-style event subscriptions. */
export class EventSubscriptions extends APIResource {
  /**
   * `GET /v1/organisations/:org/events/subscriptions`.
   * Requires `events:read` and event subscriptions enabled for the organisation.
   */
  listSubscriptions(
    input: OrgInput = {},
    options?: RequestOptions,
  ): Promise<EventSubscriptionListResponse> {
    return this.request<EventSubscriptionListResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/subscriptions` },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/events/subscriptions`.
   * Requires `events:manage` and event subscriptions enabled for the organisation.
   */
  createSubscription(
    input: OrgInput & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<EventSubscriptionResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, ...body } = input
    void _o
    return this.request<EventSubscriptionResponse>(
      { method: 'POST', path: `${base(org)}/subscriptions`, body },
      options,
    )
  }

  /**
   * `PATCH /v1/organisations/:org/events/subscriptions/:subscriptionId`.
   * Requires `events:manage` and event subscriptions enabled for the organisation.
   */
  updateSubscription(
    input: OrgInput & { subscriptionId: string } & Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<EventSubscriptionResponse> {
    const org = this.resolveOrg(input)
    const { organisation: _o, subscriptionId, ...body } = input
    void _o
    return this.request<EventSubscriptionResponse>(
      {
        method: 'PATCH',
        path: `${base(org)}/subscriptions/${enc(subscriptionId)}`,
        body,
      },
      options,
    )
  }

  /**
   * `DELETE /v1/organisations/:org/events/subscriptions/:subscriptionId`.
   * Requires `events:manage` and event subscriptions enabled for the organisation.
   */
  deleteSubscription(
    input: OrgInput & { subscriptionId: string },
    options?: RequestOptions,
  ): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      {
        method: 'DELETE',
        path: `${base(org)}/subscriptions/${enc(input.subscriptionId)}`,
      },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/events/subscriptions/:subscriptionId/test`.
   * Requires `events:manage` and event subscriptions enabled for the organisation.
   */
  testSubscription(
    input: OrgInput & { subscriptionId: string },
    options?: RequestOptions,
  ): Promise<EventTestResultResponse> {
    const org = this.resolveOrg(input)
    return this.request<EventTestResultResponse>(
      {
        method: 'POST',
        path: `${base(org)}/subscriptions/${enc(input.subscriptionId)}/test`,
      },
      options,
    )
  }

  /** `GET /v1/organisations/:org/events/deliveries`. Requires `events:read`. */
  listDeliveries(
    input: OrgInput & { subscriptionId: string; cursor?: string },
    options?: RequestOptions,
  ): Promise<EventDeliveryListResponse> {
    const org = this.resolveOrg(input)
    const query: Record<string, string> = {}
    if (input.cursor !== undefined) query['cursor'] = input.cursor
    return this.request<EventDeliveryListResponse>(
      {
        method: 'GET',
        path: `${base(org)}/deliveries`,
        query,
      },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/events/subscriptions/:subscriptionId/rotate-secret`.
   * Requires `events:manage` and event subscriptions enabled for the organisation.
   */
  rotateSecret(
    input: OrgInput & { subscriptionId: string },
    options?: RequestOptions,
  ): Promise<RotateSubscriptionSecretResponse> {
    const org = this.resolveOrg(input)
    return this.request<RotateSubscriptionSecretResponse>(
      {
        method: 'POST',
        path: `${base(org)}/subscriptions/${enc(input.subscriptionId)}/rotate-secret`,
      },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/events/subscriptions/:subscriptionId/replay`.
   * Requires `events:manage` and event subscriptions enabled for the organisation.
   */
  replay(
    input: OrgInput & { subscriptionId: string; deliveryId: string },
    options?: RequestOptions,
  ): Promise<ReplayEventsResponse> {
    const org = this.resolveOrg(input)
    return this.request<ReplayEventsResponse>(
      {
        method: 'POST',
        path: `${base(org)}/subscriptions/${enc(input.subscriptionId)}/replay`,
        body: { deliveryId: input.deliveryId },
      },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/events/deliveries/:deliveryId/redeliver`.
   * Requires `events:manage` and event subscriptions enabled for the organisation.
   */
  redeliver(
    input: OrgInput & { subscriptionId: string; deliveryId: string },
    options?: RequestOptions,
  ): Promise<EventTestResultResponse> {
    const org = this.resolveOrg(input)
    return this.request<EventTestResultResponse>(
      {
        method: 'POST',
        path: `${base(org)}/deliveries/${enc(input.deliveryId)}/redeliver`,
      },
      options,
    )
  }

  /** `GET /v1/organisations/:org/events/status`. Requires `events:read`. */
  getStatus(input: OrgInput = {}, options?: RequestOptions): Promise<EventsStatusResponse> {
    return this.request<EventsStatusResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/status` },
      options,
    )
  }

  /** `POST /v1/organisations/:org/events/toggle`. Requires `events:manage`. */
  toggleEvents(
    input: OrgInput & { enabled: boolean },
    options?: RequestOptions,
  ): Promise<ToggleEventsResponse> {
    const org = this.resolveOrg(input)
    return this.request<ToggleEventsResponse>(
      {
        method: 'POST',
        path: `${base(org)}/toggle`,
        body: { enabled: input.enabled },
      },
      options,
    )
  }
}
