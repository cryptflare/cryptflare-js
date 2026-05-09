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
export type AuditLogItem = z.infer<typeof AuditLogItemSchema>;
//# sourceMappingURL=audit.d.ts.map