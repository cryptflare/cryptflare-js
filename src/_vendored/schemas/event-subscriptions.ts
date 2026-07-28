/**
 * Zod schemas for the Event Subscriptions API.
 * Move-only extraction from `apps/api/src/routes/event-subscriptions/index.ts`.
 */
import { z } from 'zod';
export declare const EventSubscriptionItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    url: z.ZodString;
    events: z.ZodArray<z.ZodString, "many">;
    format: z.ZodOptional<z.ZodEnum<["raw", "slack", "discord", "teams", "pagerduty", "opsgenie", "googlechat"]>>;
    customHeaders: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>;
    active: z.ZodNumber;
    failedCount: z.ZodOptional<z.ZodNumber>;
    lastTriggeredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdBy: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    active: number;
    createdAt: string;
    createdBy?: string | undefined;
    customHeaders: Record<string, string> | null;
    events: string[];
    failedCount?: number | undefined;
    format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
    id: string;
    lastTriggeredAt?: string | null | undefined;
    name: string;
    updatedAt?: string | undefined;
    url: string;}, {
    active: number;
    createdAt: string;
    createdBy?: string | undefined;
    customHeaders: Record<string, string> | null;
    events: string[];
    failedCount?: number | undefined;
    format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
    id: string;
    lastTriggeredAt?: string | null | undefined;
    name: string;
    updatedAt?: string | undefined;
    url: string;}>;
export declare const CreateEventSubscriptionBodySchema: z.ZodObject<{
    name: z.ZodString;
    url: z.ZodString;
    events: z.ZodArray<z.ZodString, "many">;
    secret: z.ZodString;
    format: z.ZodOptional<z.ZodEnum<["raw", "slack", "discord", "teams", "pagerduty", "opsgenie", "googlechat"]>>;
    customHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    customHeaders?: Record<string, string> | undefined;
    events: string[];
    format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
    name: string;
    secret: string;
    url: string;}, {
    customHeaders?: Record<string, string> | undefined;
    events: string[];
    format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
    name: string;
    secret: string;
    url: string;}>;
export declare const UpdateEventSubscriptionBodySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    events: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    secret: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodEnum<["raw", "slack", "discord", "teams", "pagerduty", "opsgenie", "googlechat"]>>;
    customHeaders: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>>;
    active: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    active?: boolean | undefined;
    customHeaders?: Record<string, string> | null | undefined;
    events?: string[] | undefined;
    format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
    name?: string | undefined;
    secret?: string | undefined;
    url?: string | undefined;}, {
    active?: boolean | undefined;
    customHeaders?: Record<string, string> | null | undefined;
    events?: string[] | undefined;
    format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
    name?: string | undefined;
    secret?: string | undefined;
    url?: string | undefined;}>;
export declare const EventTestResultSchema: z.ZodObject<{
    status: z.ZodEnum<["success", "failed"]>;
    httpStatus: z.ZodNullable<z.ZodNumber>;
    durationMs: z.ZodNumber;
    error: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    durationMs: number;
    error: string | null;
    httpStatus: number | null;
    status: "failed" | "success";}, {
    durationMs: number;
    error: string | null;
    httpStatus: number | null;
    status: "failed" | "success";}>;
export declare const EventDeliveryItemSchema: z.ZodObject<{
    id: z.ZodString;
    subscriptionId: z.ZodString;
    subscriptionName: z.ZodString;
    eventType: z.ZodString;
    status: z.ZodEnum<["pending", "success", "failed"]>;
    httpStatus: z.ZodNullable<z.ZodNumber>;
    attempt: z.ZodNumber;
    error: z.ZodNullable<z.ZodString>;
    durationMs: z.ZodNullable<z.ZodNumber>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    attempt: number;
    createdAt: string;
    durationMs: number | null;
    error: string | null;
    eventType: string;
    httpStatus: number | null;
    id: string;
    status: "pending" | "failed" | "success";
    subscriptionId: string;
    subscriptionName: string;}, {
    attempt: number;
    createdAt: string;
    durationMs: number | null;
    error: string | null;
    eventType: string;
    httpStatus: number | null;
    id: string;
    status: "pending" | "failed" | "success";
    subscriptionId: string;
    subscriptionName: string;}>;
export declare const ReplayEventsInputSchema: z.ZodObject<{
    startDate: z.ZodString;
    endDate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    endDate: string;
    startDate: string;}, {
    endDate: string;
    startDate: string;}>;
export declare const ToggleEventsInputSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled: boolean;
}>;
export declare const ListEventDeliveriesQuerySchema: z.ZodObject<{
    limit: z.ZodOptional<z.ZodString>;
    offset: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["pending", "success", "failed"]>>;
    eventType: z.ZodOptional<z.ZodString>;
    subscriptionId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    endDate?: string | undefined;
    eventType?: string | undefined;
    limit?: string | undefined;
    offset?: string | undefined;
    startDate?: string | undefined;
    status?: "pending" | "failed" | "success" | undefined;
    subscriptionId?: string | undefined;}, {
    endDate?: string | undefined;
    eventType?: string | undefined;
    limit?: string | undefined;
    offset?: string | undefined;
    startDate?: string | undefined;
    status?: "pending" | "failed" | "success" | undefined;
    subscriptionId?: string | undefined;}>;
export declare const EventSubscriptionListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        url: z.ZodString;
        events: z.ZodArray<z.ZodString, "many">;
        format: z.ZodOptional<z.ZodEnum<["raw", "slack", "discord", "teams", "pagerduty", "opsgenie", "googlechat"]>>;
        customHeaders: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>;
        active: z.ZodNumber;
        failedCount: z.ZodOptional<z.ZodNumber>;
        lastTriggeredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        active: number;
        createdAt: string;
        createdBy?: string | undefined;
        customHeaders: Record<string, string> | null;
        events: string[];
        failedCount?: number | undefined;
        format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
        id: string;
        lastTriggeredAt?: string | null | undefined;
        name: string;
        updatedAt?: string | undefined;
        url: string;}, {
        active: number;
        createdAt: string;
        createdBy?: string | undefined;
        customHeaders: Record<string, string> | null;
        events: string[];
        failedCount?: number | undefined;
        format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
        id: string;
        lastTriggeredAt?: string | null | undefined;
        name: string;
        updatedAt?: string | undefined;
        url: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        active: number;
        events: string[];
        name: string;
        url: string;
        id: string;
        createdAt: string;
        customHeaders: Record<string, string> | null;
        format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
        updatedAt?: string | undefined;
        failedCount?: number | undefined;
        lastTriggeredAt?: string | null | undefined;
        createdBy?: string | undefined;
    }[];
}, {
    data: {
        active: number;
        events: string[];
        name: string;
        url: string;
        id: string;
        createdAt: string;
        customHeaders: Record<string, string> | null;
        format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
        updatedAt?: string | undefined;
        failedCount?: number | undefined;
        lastTriggeredAt?: string | null | undefined;
        createdBy?: string | undefined;
    }[];
}>;
export declare const EventSubscriptionResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        url: z.ZodString;
        events: z.ZodArray<z.ZodString, "many">;
        format: z.ZodOptional<z.ZodEnum<["raw", "slack", "discord", "teams", "pagerduty", "opsgenie", "googlechat"]>>;
        customHeaders: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>;
        active: z.ZodNumber;
        failedCount: z.ZodOptional<z.ZodNumber>;
        lastTriggeredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        active: number;
        createdAt: string;
        createdBy?: string | undefined;
        customHeaders: Record<string, string> | null;
        events: string[];
        failedCount?: number | undefined;
        format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
        id: string;
        lastTriggeredAt?: string | null | undefined;
        name: string;
        updatedAt?: string | undefined;
        url: string;}, {
        active: number;
        createdAt: string;
        createdBy?: string | undefined;
        customHeaders: Record<string, string> | null;
        events: string[];
        failedCount?: number | undefined;
        format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
        id: string;
        lastTriggeredAt?: string | null | undefined;
        name: string;
        updatedAt?: string | undefined;
        url: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        active: number;
        events: string[];
        name: string;
        url: string;
        id: string;
        createdAt: string;
        customHeaders: Record<string, string> | null;
        format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
        updatedAt?: string | undefined;
        failedCount?: number | undefined;
        lastTriggeredAt?: string | null | undefined;
        createdBy?: string | undefined;
    };
}, {
    data: {
        active: number;
        events: string[];
        name: string;
        url: string;
        id: string;
        createdAt: string;
        customHeaders: Record<string, string> | null;
        format?: "teams" | "raw" | "slack" | "discord" | "pagerduty" | "opsgenie" | "googlechat" | undefined;
        updatedAt?: string | undefined;
        failedCount?: number | undefined;
        lastTriggeredAt?: string | null | undefined;
        createdBy?: string | undefined;
    };
}>;
export declare const EventSubscriptionSuccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare const RotateSubscriptionSecretResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        secret: z.ZodString;
        previousSecretExpiresAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        previousSecretExpiresAt: string | null;
        secret: string;}, {
        previousSecretExpiresAt: string | null;
        secret: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        secret: string;
        previousSecretExpiresAt: string | null;
    };
}, {
    data: {
        secret: string;
        previousSecretExpiresAt: string | null;
    };
}>;
export declare const ReplayEventsResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        total: z.ZodNumber;
        delivered: z.ZodNumber;
        failed: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        delivered: number;
        failed: number;
        total: number;}, {
        delivered: number;
        failed: number;
        total: number;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        failed: number;
        total: number;
        delivered: number;
    };
}, {
    data: {
        failed: number;
        total: number;
        delivered: number;
    };
}>;
export declare const EventTestResultResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        status: z.ZodEnum<["success", "failed"]>;
        httpStatus: z.ZodNullable<z.ZodNumber>;
        durationMs: z.ZodNumber;
        error: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        durationMs: number;
        error: string | null;
        httpStatus: number | null;
        status: "failed" | "success";}, {
        durationMs: number;
        error: string | null;
        httpStatus: number | null;
        status: "failed" | "success";}>;
}, "strip", z.ZodTypeAny, {
    data: {
        error: string | null;
        status: "failed" | "success";
        httpStatus: number | null;
        durationMs: number;
    };
}, {
    data: {
        error: string | null;
        status: "failed" | "success";
        httpStatus: number | null;
        durationMs: number;
    };
}>;
export declare const EventDeliveryListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        subscriptionId: z.ZodString;
        subscriptionName: z.ZodString;
        eventType: z.ZodString;
        status: z.ZodEnum<["pending", "success", "failed"]>;
        httpStatus: z.ZodNullable<z.ZodNumber>;
        attempt: z.ZodNumber;
        error: z.ZodNullable<z.ZodString>;
        durationMs: z.ZodNullable<z.ZodNumber>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        attempt: number;
        createdAt: string;
        durationMs: number | null;
        error: string | null;
        eventType: string;
        httpStatus: number | null;
        id: string;
        status: "pending" | "failed" | "success";
        subscriptionId: string;
        subscriptionName: string;}, {
        attempt: number;
        createdAt: string;
        durationMs: number | null;
        error: string | null;
        eventType: string;
        httpStatus: number | null;
        id: string;
        status: "pending" | "failed" | "success";
        subscriptionId: string;
        subscriptionName: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        error: string | null;
        status: "pending" | "failed" | "success";
        id: string;
        createdAt: string;
        httpStatus: number | null;
        durationMs: number | null;
        subscriptionId: string;
        subscriptionName: string;
        eventType: string;
        attempt: number;
    }[];
}, {
    data: {
        error: string | null;
        status: "pending" | "failed" | "success";
        id: string;
        createdAt: string;
        httpStatus: number | null;
        durationMs: number | null;
        subscriptionId: string;
        subscriptionName: string;
        eventType: string;
        attempt: number;
    }[];
}>;
export declare const EventsStatusResponseSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled: boolean;
}>;
export declare const ToggleEventsResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    success: boolean;}, {
    enabled: boolean;
    success: boolean;}>;
export type EventSubscriptionItem = z.infer<typeof EventSubscriptionItemSchema>;
export type CreateEventSubscriptionBody = z.infer<typeof CreateEventSubscriptionBodySchema>;
export type UpdateEventSubscriptionBody = z.infer<typeof UpdateEventSubscriptionBodySchema>;
export type EventTestResult = z.infer<typeof EventTestResultSchema>;
export type EventDeliveryItem = z.infer<typeof EventDeliveryItemSchema>;
export type ReplayEventsInput = z.infer<typeof ReplayEventsInputSchema>;
export type ListEventDeliveriesQuery = z.infer<typeof ListEventDeliveriesQuerySchema>;
//# sourceMappingURL=event-subscriptions.d.ts.map