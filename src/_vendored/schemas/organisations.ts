/**
 * Zod schemas for the Organisations API.
 * Move-only extraction from `apps/api/src/routes/organisations/index.ts`
 * and `apps/api/src/routes/organisations/features.ts`.
 */
import { z } from 'zod';
export declare const CreateOrgBodySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;}, {
    name: string;
    slug: string;}>;
export declare const UpdateOrgBodySchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const OrgItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    plan: z.ZodString;
    role: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    id: string;
    name: string;
    plan: string;
    role: string;}, {
    createdAt: string;
    id: string;
    name: string;
    plan: string;
    role: string;}>;
export declare const OrgDetailSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    plan: z.ZodString;
    owner_id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    created_at: string;
    id: string;
    name: string;
    owner_id: string;
    plan: string;
    updated_at: string;}, {
    created_at: string;
    id: string;
    name: string;
    owner_id: string;
    plan: string;
    updated_at: string;}>;
export declare const ToggleFeatureBodySchema: z.ZodObject<{
    feature: z.ZodEnum<["ai", "events", "sync", "syncTakeover"]>;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    feature: "sync" | "ai" | "events" | "syncTakeover";}, {
    enabled: boolean;
    feature: "sync" | "ai" | "events" | "syncTakeover";}>;
export declare const FeaturesResponseSchema: z.ZodObject<{
    aiEnabled: z.ZodBoolean;
    eventsEnabled: z.ZodBoolean;
    syncEnabled: z.ZodBoolean;
    syncTakeoverEnabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    aiEnabled: boolean;
    eventsEnabled: boolean;
    syncEnabled: boolean;
    syncTakeoverEnabled: boolean;}, {
    aiEnabled: boolean;
    eventsEnabled: boolean;
    syncEnabled: boolean;
    syncTakeoverEnabled: boolean;}>;
export declare const ToggleResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    feature: z.ZodString;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    feature: string;
    success: boolean;}, {
    enabled: boolean;
    feature: string;
    success: boolean;}>;
export type CreateOrgBody = z.infer<typeof CreateOrgBodySchema>;
export type UpdateOrgBody = z.infer<typeof UpdateOrgBodySchema>;
export type OrgItem = z.infer<typeof OrgItemSchema>;
export type OrgDetail = z.infer<typeof OrgDetailSchema>;
export type ToggleFeatureBody = z.infer<typeof ToggleFeatureBodySchema>;
export type FeaturesResponse = z.infer<typeof FeaturesResponseSchema>;
export type ToggleResponse = z.infer<typeof ToggleResponseSchema>;
//# sourceMappingURL=organisations.d.ts.map