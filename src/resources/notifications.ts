import { APIResource, enc } from './api-resource';
import type { RequestOptions } from '../types/options';

/**
 * Notifications. Mounted under `/v1/organisations/:org/notifications`.
 * One inbox per (user, organisation) - the API resolves the user from
 * the bearer credential.
 */
type OrgInput = { organisation?: string };

export type Notification = {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

export class Notifications extends APIResource {
  /** GET / - list notifications + unread count for the current user. */
  list(input: OrgInput = {}, options?: RequestOptions): Promise<{ data: Notification[]; unreadCount?: number }> {
    const org = this.resolveOrg(input);
    return this.request({ method: 'GET', path: `/v1/organisations/${enc(org)}/notifications` }, options);
  }

  /** PATCH /:id/read - mark a single notification as read. */
  markRead(input: OrgInput & { id: string }, options?: RequestOptions): Promise<{ success: true }> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'PATCH',
      path: `/v1/organisations/${enc(org)}/notifications/${enc(input.id)}/read`,
    }, options);
  }

  /** POST /mark-all-read - mark every notification as read. */
  markAllRead(input: OrgInput = {}, options?: RequestOptions): Promise<{ success: true }> {
    const org = this.resolveOrg(input);
    return this.request({
      method: 'POST',
      path: `/v1/organisations/${enc(org)}/notifications/mark-all-read`,
    }, options);
  }
}
