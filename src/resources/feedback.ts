import { APIResource } from './api-resource';
import type { RequestOptions } from '../types/options';

/**
 * Documentation feedback. Lets dashboard / docs callers submit a
 * thumbs-up / thumbs-down + optional comment for a given page so we
 * can track which docs are landing well.
 */
export type FeedbackVote = 'up' | 'down';

export class Feedback extends APIResource {
  /** POST /v1/feedback */
  submit(body: { page: string; vote: FeedbackVote; comment?: string }, options?: RequestOptions): Promise<{ success: true }> {
    return this.request({ method: 'POST', path: '/v1/feedback', body }, options);
  }

  /** GET /v1/feedback?page=... - returns the caller's existing vote, if any. */
  get(input: { page: string }, options?: RequestOptions): Promise<{ vote: FeedbackVote | null; comment: string | null } | null> {
    return this.request({
      method: 'GET',
      path: '/v1/feedback',
      query: { page: input.page },
    }, options);
  }
}
