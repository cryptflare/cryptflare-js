/**
 * Zod schemas for the Organisation Members API.
 * Move-only extraction from `apps/api/src/routes/members/index.ts`.
 */
import { z } from 'zod';
export declare const MemberItemSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    email: z.ZodString;
    name: z.ZodNullable<z.ZodString>;
    avatarUrl: z.ZodNullable<z.ZodString>;
    role: z.ZodString;
    joinedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    avatarUrl: string | null;
    email: string;
    id: string;
    joinedAt: string;
    name: string | null;
    role: string;
    userId: string;}, {
    avatarUrl: string | null;
    email: string;
    id: string;
    joinedAt: string;
    name: string | null;
    role: string;
    userId: string;}>;
export declare const InviteBodySchema: z.ZodObject<{
    email: z.ZodString;
    role: z.ZodEnum<["biller", "manager", "developer", "employee", "viewer"]>;
}, "strip", z.ZodTypeAny, {
    email: string;
    role: "viewer" | "biller" | "manager" | "developer" | "employee";}, {
    email: string;
    role: "viewer" | "biller" | "manager" | "developer" | "employee";}>;
export declare const ChangeRoleBodySchema: z.ZodObject<{
    role: z.ZodEnum<["biller", "manager", "developer", "employee", "viewer"]>;
}, "strip", z.ZodTypeAny, {
    role: "viewer" | "biller" | "manager" | "developer" | "employee";
}, {
    role: "viewer" | "biller" | "manager" | "developer" | "employee";
}>;
export declare const MemberRecordSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    user_id: z.ZodString;
    role: z.ZodString;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    created_at: string;
    id: string;
    organisation_id: string;
    role: string;
    user_id: string;}, {
    created_at: string;
    id: string;
    organisation_id: string;
    role: string;
    user_id: string;}>;
export type MemberItem = z.infer<typeof MemberItemSchema>;
export type InviteBody = z.infer<typeof InviteBodySchema>;
export type ChangeRoleBody = z.infer<typeof ChangeRoleBodySchema>;
export type MemberRecord = z.infer<typeof MemberRecordSchema>;
//# sourceMappingURL=members.d.ts.map