/**
 * Zod schemas for the Role Permissions API.
 * Move-only extraction from `apps/api/src/routes/organisations/role-permissions-routes.ts`.
 */
import { z } from 'zod';
export declare const UpdateRolePermissionBodySchema: z.ZodObject<{
    role: z.ZodEnum<["biller", "manager", "developer", "employee", "viewer"]>;
    permission: z.ZodString;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    permission: string;
    role: "viewer" | "biller" | "manager" | "developer" | "employee";}, {
    enabled: boolean;
    permission: string;
    role: "viewer" | "biller" | "manager" | "developer" | "employee";}>;
export type UpdateRolePermissionBody = z.infer<typeof UpdateRolePermissionBodySchema>;
//# sourceMappingURL=role-permissions.d.ts.map