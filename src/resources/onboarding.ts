import { APIResource } from './api-resource';
import type { RequestOptions } from '../types/options';

/** Onboarding flow. Mounted at `/v1/onboarding`. */
export class Onboarding extends APIResource {
  getState(options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'GET', path: '/v1/onboarding' }, options);
  }

  updateState(body: Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'PATCH', path: '/v1/onboarding', body }, options);
  }

  checkout(body: { plan: string; successUrl: string; cancelUrl: string }, options?: RequestOptions): Promise<{ url: string }> {
    return this.request({ method: 'POST', path: '/v1/onboarding/checkout', body }, options);
  }

  verifyCheckout(body: { sessionId: string }, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/onboarding/checkout/verify', body }, options);
  }

  complete(body?: Record<string, unknown>, options?: RequestOptions): Promise<unknown> {
    return this.request({ method: 'POST', path: '/v1/onboarding/complete', body: body ?? {} }, options);
  }
}
