/**
 * Zod schemas for the Audit Log API.
 * Move-only extraction from `apps/api/src/routes/audit/index.ts`.
 */
import { z } from 'zod';
export declare const AuditLogItemSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    actor_id: z.ZodString;
    actor_role: z.ZodString;
    action: z.ZodString;
    resource_type: z.ZodString;
    resource_id: z.ZodNullable<z.ZodString>;
    metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    ip_address: z.ZodNullable<z.ZodString>;
    source: z.ZodNullable<z.ZodString>;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    action: string;
    actor_id: string;
    actor_role: string;
    created_at: string;
    id: string;
    ip_address: string | null;
    metadata: Record<string, unknown> | null;
    organisation_id: string;
    resource_id: string | null;
    resource_type: string;
    source: string | null;}, {
    action: string;
    actor_id: string;
    actor_role: string;
    created_at: string;
    id: string;
    ip_address: string | null;
    metadata: Record<string, unknown> | null;
    organisation_id: string;
    resource_id: string | null;
    resource_type: string;
    source: string | null;}>;
export declare const AuditLogExportQuerySchema: z.ZodObject<{
    startDate: z.ZodString;
    endDate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    endDate: string;
    startDate: string;}, {
    endDate: string;
    startDate: string;}>;
export declare const AuditLogFilterFieldsSchema: z.ZodObject<{
    action: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    resourceType: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    action?: string | undefined;
    actorId?: string | undefined;
    resourceType?: string | undefined;
    source?: string | undefined;}, {
    action?: string | undefined;
    actorId?: string | undefined;
    resourceType?: string | undefined;
    source?: string | undefined;}>;
export declare const AuditLogIntegritySchema: z.ZodObject<{
    verified: z.ZodNullable<z.ZodBoolean>;
    firstBrokenId: z.ZodNullable<z.ZodString>;
    checkedRows: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    checkedRows: number;
    firstBrokenId: string | null;
    verified: boolean | null;}, {
    checkedRows: number;
    firstBrokenId: string | null;
    verified: boolean | null;}>;
export declare const AuditLogListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        actor_id: z.ZodString;
        actor_role: z.ZodString;
        action: z.ZodString;
        resource_type: z.ZodString;
        resource_id: z.ZodNullable<z.ZodString>;
        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        ip_address: z.ZodNullable<z.ZodString>;
        source: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        action: string;
        actor_id: string;
        actor_role: string;
        created_at: string;
        id: string;
        ip_address: string | null;
        metadata: Record<string, unknown> | null;
        organisation_id: string;
        resource_id: string | null;
        resource_type: string;
        source: string | null;}, {
        action: string;
        actor_id: string;
        actor_role: string;
        created_at: string;
        id: string;
        ip_address: string | null;
        metadata: Record<string, unknown> | null;
        organisation_id: string;
        resource_id: string | null;
        resource_type: string;
        source: string | null;}>, "many">;
    total: z.ZodNumber;
    integrity: z.ZodObject<{
        verified: z.ZodNullable<z.ZodBoolean>;
        firstBrokenId: z.ZodNullable<z.ZodString>;
        checkedRows: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        checkedRows: number;
        firstBrokenId: string | null;
        verified: boolean | null;}, {
        checkedRows: number;
        firstBrokenId: string | null;
        verified: boolean | null;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        action: string;
        metadata: Record<string, unknown> | null;
        id: string;
        organisation_id: string;
        actor_id: string;
        actor_role: string;
        resource_type: string;
        resource_id: string | null;
        ip_address: string | null;
        source: string | null;
        created_at: string;
    }[];
    integrity: {
        verified: boolean | null;
        firstBrokenId: string | null;
        checkedRows: number;
    };
    total: number;}, {
    data: {
        action: string;
        metadata: Record<string, unknown> | null;
        id: string;
        organisation_id: string;
        actor_id: string;
        actor_role: string;
        resource_type: string;
        resource_id: string | null;
        ip_address: string | null;
        source: string | null;
        created_at: string;
    }[];
    integrity: {
        verified: boolean | null;
        firstBrokenId: string | null;
        checkedRows: number;
    };
    total: number;}>;
export declare const AuditChainVerifyResponseSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    checked: z.ZodNumber;
    brokenAt: z.ZodOptional<z.ZodString>;
    expected: z.ZodOptional<z.ZodString>;
    actual: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    actual?: string | undefined;
    brokenAt?: string | undefined;
    checked: number;
    expected?: string | undefined;
    valid: boolean;}, {
    actual?: string | undefined;
    brokenAt?: string | undefined;
    checked: number;
    expected?: string | undefined;
    valid: boolean;}>;
export type AuditLogItem = z.infer<typeof AuditLogItemSchema>;
//# sourceMappingURL=audit.d.ts.map