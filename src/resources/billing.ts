import { APIResource, enc } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  AddonListResponse,
  CancelResponse,
  ChangePlanResponse,
  ConfirmSessionInput,
  ConfirmSessionResponse,
  ConsumptionResponse,
  DowngradePreviewResponse,
  InvoicesResponse,
  PurchaseAddonResponse,
  ResubscribeResponse,
  SubscriptionResponse,
  UpgradePreviewResponse,
} from '../types'

type OrgInput = { organisation?: string }
const base = (org: string) => `/v1/organisations/${enc(org)}/billing`

/** Stripe-backed billing. */
export class Billing extends APIResource {
  /** `GET /v1/organisations/:org/billing/subscription`. Requires `billing:read`. */
  getSubscription(input: OrgInput = {}, options?: RequestOptions): Promise<SubscriptionResponse> {
    return this.request<SubscriptionResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/subscription` },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/billing/change-plan`.
   * Requires `billing:upgrade` (billing routes also require `billing:read`).
   */
  changePlan(
    input: OrgInput & { plan: string; quantity?: number },
    options?: RequestOptions,
  ): Promise<ChangePlanResponse> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = { plan: input.plan }
    if (input.quantity !== undefined) body['quantity'] = input.quantity
    return this.request<ChangePlanResponse>(
      { method: 'POST', path: `${base(org)}/change-plan`, body },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/billing/cancel`.
   * Requires `billing:cancel` (billing routes also require `billing:read`).
   */
  cancelSubscription(input: OrgInput = {}, options?: RequestOptions): Promise<CancelResponse> {
    return this.request<CancelResponse>(
      { method: 'POST', path: `${base(this.resolveOrg(input))}/cancel` },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/billing/resubscribe`.
   * Requires `billing:update` (billing routes also require `billing:read`).
   */
  resubscribe(input: OrgInput = {}, options?: RequestOptions): Promise<ResubscribeResponse> {
    return this.request<ResubscribeResponse>(
      { method: 'POST', path: `${base(this.resolveOrg(input))}/resubscribe` },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/billing/checkout`.
   * Requires `billing:update` (billing routes also require `billing:read`).
   */
  createCheckout(
    input: OrgInput & { plan: string; successUrl: string; cancelUrl: string },
    options?: RequestOptions,
  ): Promise<{ url: string }> {
    const org = this.resolveOrg(input)
    return this.request(
      {
        method: 'POST',
        path: `${base(org)}/checkout`,
        body: { plan: input.plan, successUrl: input.successUrl, cancelUrl: input.cancelUrl },
      },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/billing/confirm-session`.
   * Requires `billing:update` (billing routes also require `billing:read`).
   */
  confirmSession(
    input: OrgInput & ConfirmSessionInput,
    options?: RequestOptions,
  ): Promise<ConfirmSessionResponse> {
    const org = this.resolveOrg(input)
    return this.request<ConfirmSessionResponse>(
      {
        method: 'POST',
        path: `${base(org)}/confirm-session`,
        body: { sessionId: input.sessionId },
      },
      options,
    )
  }

  /** `POST /v1/organisations/:org/billing/portal`. Requires `billing:read`. */
  createPortal(
    input: OrgInput & { returnUrl?: string } = {},
    options?: RequestOptions,
  ): Promise<{ url: string }> {
    const org = this.resolveOrg(input)
    const body: Record<string, unknown> = {}
    if (input.returnUrl !== undefined) body['returnUrl'] = input.returnUrl
    return this.request({ method: 'POST', path: `${base(org)}/portal`, body }, options)
  }

  /** `GET /v1/organisations/:org/billing/upgrade-preview`. Requires `billing:read`. */
  upgradePreview(
    input: OrgInput & { plan: string },
    options?: RequestOptions,
  ): Promise<UpgradePreviewResponse> {
    const org = this.resolveOrg(input)
    return this.request<UpgradePreviewResponse>(
      {
        method: 'GET',
        path: `${base(org)}/upgrade-preview`,
        query: { plan: input.plan },
      },
      options,
    )
  }

  /** `GET /v1/organisations/:org/billing/downgrade-preview`. Requires `billing:read`. */
  downgradePreview(
    input: OrgInput & { plan: string },
    options?: RequestOptions,
  ): Promise<DowngradePreviewResponse> {
    const org = this.resolveOrg(input)
    return this.request<DowngradePreviewResponse>(
      {
        method: 'GET',
        path: `${base(org)}/downgrade-preview`,
        query: { plan: input.plan },
      },
      options,
    )
  }

  /** `GET /v1/organisations/:org/billing/invoices`. Requires `billing:read`. */
  listInvoices(
    input: OrgInput & { cursor?: string } = {},
    options?: RequestOptions,
  ): Promise<InvoicesResponse> {
    const org = this.resolveOrg(input)
    const query: Record<string, string> = {}
    if (input.cursor !== undefined) query['cursor'] = input.cursor
    return this.request<InvoicesResponse>(
      { method: 'GET', path: `${base(org)}/invoices`, query },
      options,
    )
  }

  /** `GET /v1/organisations/:org/billing/consumption`. Requires `billing:read`. */
  consumption(input: OrgInput = {}, options?: RequestOptions): Promise<ConsumptionResponse> {
    return this.request<ConsumptionResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/consumption` },
      options,
    )
  }

  /** `GET /v1/organisations/:org/billing/addons`. Requires `billing:read`. */
  listAddons(input: OrgInput = {}, options?: RequestOptions): Promise<AddonListResponse> {
    return this.request<AddonListResponse>(
      { method: 'GET', path: `${base(this.resolveOrg(input))}/addons` },
      options,
    )
  }

  /**
   * `POST /v1/organisations/:org/billing/addons`.
   * Requires `billing:update` (billing routes also require `billing:read`).
   */
  purchaseAddon(
    input: OrgInput & { addon: string; quantity: number },
    options?: RequestOptions,
  ): Promise<PurchaseAddonResponse> {
    const org = this.resolveOrg(input)
    return this.request<PurchaseAddonResponse>(
      {
        method: 'POST',
        path: `${base(org)}/addons`,
        body: { addon: input.addon, quantity: input.quantity },
      },
      options,
    )
  }

  /**
   * `DELETE /v1/organisations/:org/billing/addons/:addonId`.
   * Requires `billing:update` (billing routes also require `billing:read`).
   */
  removeAddon(input: OrgInput & { addonId: string }, options?: RequestOptions): Promise<void> {
    const org = this.resolveOrg(input)
    return this.request<void>(
      { method: 'DELETE', path: `${base(org)}/addons/${enc(input.addonId)}` },
      options,
    )
  }
}
