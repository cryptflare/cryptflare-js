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
export type EventSubscriptionItem = z.infer<typeof EventSubscriptionItemSchema>;
export type CreateEventSubscriptionBody = z.infer<typeof CreateEventSubscriptionBodySchema>;
export type UpdateEventSubscriptionBody = z.infer<typeof UpdateEventSubscriptionBodySchema>;
export type EventTestResult = z.infer<typeof EventTestResultSchema>;
export type EventDeliveryItem = z.infer<typeof EventDeliveryItemSchema>;
//# sourceMappingURL=event-subscriptions.d.ts.map