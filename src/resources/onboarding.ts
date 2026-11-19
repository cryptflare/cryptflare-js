import { APIResource } from './api-resource'
import type { RequestOptions } from '../types/options'
import type {
  CompleteOnboardingResponse,
  OnboardingStateResponse,
  VerifyOnboardingCheckoutInput,
  VerifyOnboardingCheckoutResponse,
} from '../types'

/** Onboarding flow. Mounted at `/v1/onboarding`. */
export class Onboarding extends APIResource {
  /** `GET /v1/onboarding`. Requires an authenticated user session (no org permission). */
  getState(options?: RequestOptions): Promise<OnboardingStateResponse> {
    return this.request<OnboardingStateResponse>({ method: 'GET', path: '/v1/onboarding' }, options)
  }

  /** `PATCH /v1/onboarding`. Requires an authenticated user session (no org permission). */
  updateState(
    body: Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<OnboardingStateResponse> {
    return this.request<OnboardingStateResponse>(
      { method: 'PATCH', path: '/v1/onboarding', body },
      options,
    )
  }

  /** `POST /v1/onboarding/checkout`. Requires an authenticated user session (no org permission). */
  checkout(
    body: { plan: string; successUrl: string; cancelUrl: string },
    options?: RequestOptions,
  ): Promise<{ url: string }> {
    return this.request({ method: 'POST', path: '/v1/onboarding/checkout', body }, options)
  }

  /** `POST /v1/onboarding/verify-checkout`. Requires an authenticated user session (no org permission). */
  verifyCheckout(
    body: VerifyOnboardingCheckoutInput,
    options?: RequestOptions,
  ): Promise<VerifyOnboardingCheckoutResponse> {
    return this.request<VerifyOnboardingCheckoutResponse>(
      { method: 'POST', path: '/v1/onboarding/verify-checkout', body },
      options,
    )
  }

  /** `POST /v1/onboarding/complete`. Requires an authenticated user session (no org permission). */
  complete(
    body?: Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<CompleteOnboardingResponse> {
    return this.request<CompleteOnboardingResponse>(
      { method: 'POST', path: '/v1/onboarding/complete', body: body ?? {} },
      options,
    )
  }
}
