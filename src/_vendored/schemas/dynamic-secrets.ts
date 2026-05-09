/**
 * Zod schemas for the Dynamic Secrets API.
 * Move-only extraction from `apps/api/src/routes/dynamic-secrets/index.ts`.
 */
import { z } from 'zod';
export declare const CreateConfigBodySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    provider: z.ZodEnum<[string, ...string[]]>;
    providerConfig: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    rootCredentials: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    defaultTtlSeconds: z.ZodNumber;
    maxTtlSeconds: z.ZodNumber;
    systemMaxTtlSeconds: z.ZodNumber;
    maxConcurrentLeases: z.ZodNumber;
    maxLeasesPerIdentity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    defaultTtlSeconds: number;
    description?: string | undefined;
    maxConcurrentLeases: number;
    maxLeasesPerIdentity: number;
    maxTtlSeconds: number;
    name: string;
    provider: string;
    providerConfig: Record<string, unknown>;
    rootCredentials: Record<string, unknown>;
    systemMaxTtlSeconds: number;}, {
    defaultTtlSeconds: number;
    description?: string | undefined;
    maxConcurrentLeases: number;
    maxLeasesPerIdentity: number;
    maxTtlSeconds: number;
    name: string;
    provider: string;
    providerConfig: Record<string, unknown>;
    rootCredentials: Record<string, unknown>;
    systemMaxTtlSeconds: number;}>;
export declare const UpdateConfigBodySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    providerConfig: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    rootCredentials: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    defaultTtlSeconds: z.ZodOptional<z.ZodNumber>;
    maxTtlSeconds: z.ZodOptional<z.ZodNumber>;
    systemMaxTtlSeconds: z.ZodOptional<z.ZodNumber>;
    maxConcurrentLeases: z.ZodOptional<z.ZodNumber>;
    maxLeasesPerIdentity: z.ZodOptional<z.ZodNumber>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    defaultTtlSeconds?: number | undefined;
    description?: string | null | undefined;
    enabled?: boolean | undefined;
    maxConcurrentLeases?: number | undefined;
    maxLeasesPerIdentity?: number | undefined;
    maxTtlSeconds?: number | undefined;
    name?: string | undefined;
    providerConfig?: Record<string, unknown> | undefined;
    rootCredentials?: Record<string, unknown> | undefined;
    systemMaxTtlSeconds?: number | undefined;}, {
    defaultTtlSeconds?: number | undefined;
    description?: string | null | undefined;
    enabled?: boolean | undefined;
    maxConcurrentLeases?: number | undefined;
    maxLeasesPerIdentity?: number | undefined;
    maxTtlSeconds?: number | undefined;
    name?: string | undefined;
    providerConfig?: Record<string, unknown> | undefined;
    rootCredentials?: Record<string, unknown> | undefined;
    systemMaxTtlSeconds?: number | undefined;}>;
export declare const IssueLeaseBodySchema: z.ZodObject<{
    ttl: z.ZodOptional<z.ZodNumber>;
    wrap: z.ZodOptional<z.ZodObject<{
        ttl: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        ttl?: number | undefined;
    }, {
        ttl?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    ttl?: number | undefined;
    wrap?: {
        ttl?: number | undefined;
    } | undefined;}, {
    ttl?: number | undefined;
    wrap?: {
        ttl?: number | undefined;
    } | undefined;}>;
export declare const RenewLeaseBodySchema: z.ZodObject<{
    increment: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    increment?: number | undefined;
}, {
    increment?: number | undefined;
}>;
export declare const ListLeasesQuerySchema: z.ZodObject<{
    configId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["pending", "active", "expired", "revoked", "irrevocable"]>>;
    limit: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    configId?: string | undefined;
    limit?: string | undefined;
    status?: "revoked" | "pending" | "active" | "expired" | "irrevocable" | undefined;}, {
    configId?: string | undefined;
    limit?: string | undefined;
    status?: "revoked" | "pending" | "active" | "expired" | "irrevocable" | undefined;}>;
export declare const DynamicAnalyticsQuerySchema: z.ZodObject<{
    days: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    days?: string | undefined;
}, {
    days?: string | undefined;
}>;
export type CreateConfigBody = z.infer<typeof CreateConfigBodySchema>;
export type UpdateConfigBody = z.infer<typeof UpdateConfigBodySchema>;
export type IssueLeaseBody = z.infer<typeof IssueLeaseBodySchema>;
export type RenewLeaseBody = z.infer<typeof RenewLeaseBodySchema>;
export type ListLeasesQuery = z.infer<typeof ListLeasesQuerySchema>;
export type DynamicAnalyticsQuery = z.infer<typeof DynamicAnalyticsQuerySchema>;
//# sourceMappingURL=dynamic-secrets.d.ts.map