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
export declare const RolePermissionsResponseSchema: z.ZodObject<{
    owner: z.ZodArray<z.ZodString, "many">;
    biller: z.ZodArray<z.ZodString, "many">;
    manager: z.ZodArray<z.ZodString, "many">;
    developer: z.ZodArray<z.ZodString, "many">;
    employee: z.ZodArray<z.ZodString, "many">;
    viewer: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    biller: string[];
    developer: string[];
    employee: string[];
    manager: string[];
    owner: string[];
    viewer: string[];}, {
    biller: string[];
    developer: string[];
    employee: string[];
    manager: string[];
    owner: string[];
    viewer: string[];}>;
export declare const UpdateRolePermissionResponseSchema: z.ZodObject<{
    role: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    permissions: string[];
    role: string;}, {
    permissions: string[];
    role: string;}>;
export type RolePermissionsResponse = z.infer<typeof RolePermissionsResponseSchema>;
export type UpdateRolePermissionResponse = z.infer<typeof UpdateRolePermissionResponseSchema>;
//# sourceMappingURL=role-permissions.d.ts.map