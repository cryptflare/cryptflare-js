/** Public types backed by the vendored `event-subscriptions` schemas. */
import type {
  CreateEventSubscriptionBody as _CreateEventSubscriptionBody,
  EventDeliveryItem as _EventDeliveryItem,
  EventSubscriptionItem as _EventSubscriptionItem,
  EventTestResult as _EventTestResult,
  EventDeliveryListResponse as _SDK_EventDeliveryListResponse,
  EventSubscriptionListResponse as _SDK_EventSubscriptionListResponse,
  EventSubscriptionResponse as _SDK_EventSubscriptionResponse,
  EventTestResultResponse as _SDK_EventTestResultResponse,
  EventsStatusResponse as _SDK_EventsStatusResponse,
  ReplayEventsResponse as _SDK_ReplayEventsResponse,
  RotateSubscriptionSecretResponse as _SDK_RotateSubscriptionSecretResponse,
  ToggleEventsResponse as _SDK_ToggleEventsResponse,
  UpdateEventSubscriptionBody as _UpdateEventSubscriptionBody,
} from '../_vendored/schemas/event-subscriptions'

export type EventSubscriptionItem = _EventSubscriptionItem
export type EventDeliveryItem = _EventDeliveryItem
export type EventTestResult = _EventTestResult
export type CreateEventSubscriptionInput = _CreateEventSubscriptionBody
export type UpdateEventSubscriptionInput = _UpdateEventSubscriptionBody
export type EventDeliveryListResponse = _SDK_EventDeliveryListResponse
export type EventSubscriptionListResponse = _SDK_EventSubscriptionListResponse
export type EventSubscriptionResponse = _SDK_EventSubscriptionResponse
export type EventTestResultResponse = _SDK_EventTestResultResponse
export type EventsStatusResponse = _SDK_EventsStatusResponse
export type ReplayEventsResponse = _SDK_ReplayEventsResponse
export type RotateSubscriptionSecretResponse = _SDK_RotateSubscriptionSecretResponse
export type ToggleEventsResponse = _SDK_ToggleEventsResponse
