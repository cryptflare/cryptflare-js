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
export declare const MemberListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
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
        userId: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string | null;
        email: string;
        role: string;
        id: string;
        userId: string;
        avatarUrl: string | null;
        joinedAt: string;
    }[];
}, {
    data: {
        name: string | null;
        email: string;
        role: string;
        id: string;
        userId: string;
        avatarUrl: string | null;
        joinedAt: string;
    }[];
}>;
export declare const MemberRecordResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    data: {
        role: string;
        id: string;
        organisation_id: string;
        created_at: string;
        user_id: string;
    };
}, {
    data: {
        role: string;
        id: string;
        organisation_id: string;
        created_at: string;
        user_id: string;
    };
}>;
/**
 * Response of `POST /members/invite`. The shape depends on whether the
 * invited email already belongs to a user.
 */
export declare const InviteMemberResponseSchema: z.ZodObject<{
    data: z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        user_id: z.ZodString;
        role: z.ZodString;
        created_at: z.ZodString;
    } & {
        emailSent: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        emailSent: boolean;
        id: string;
        organisation_id: string;
        role: string;
        user_id: string;}, {
        created_at: string;
        emailSent: boolean;
        id: string;
        organisation_id: string;
        role: string;
        user_id: string;}>, z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        role: z.ZodEnum<["biller", "manager", "developer", "employee", "viewer"]>;
        status: z.ZodLiteral<"pending">;
        emailSent: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        email: string;
        emailSent: boolean;
        id: string;
        role: "viewer" | "biller" | "manager" | "developer" | "employee";
        status: "pending";}, {
        email: string;
        emailSent: boolean;
        id: string;
        role: "viewer" | "biller" | "manager" | "developer" | "employee";
        status: "pending";}>]>;
}, "strip", z.ZodTypeAny, {
    data: {
        role: string;
        id: string;
        organisation_id: string;
        created_at: string;
        user_id: string;
        emailSent: boolean;
    } | {
        status: "pending";
        email: string;
        role: "viewer" | "biller" | "manager" | "developer" | "employee";
        id: string;
        emailSent: boolean;
    };
}, {
    data: {
        role: string;
        id: string;
        organisation_id: string;
        created_at: string;
        user_id: string;
        emailSent: boolean;
    } | {
        status: "pending";
        email: string;
        role: "viewer" | "biller" | "manager" | "developer" | "employee";
        id: string;
        emailSent: boolean;
    };
}>;
export declare const MemberSuccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export type MemberItem = z.infer<typeof MemberItemSchema>;
export type InviteBody = z.infer<typeof InviteBodySchema>;
export type ChangeRoleBody = z.infer<typeof ChangeRoleBodySchema>;
export type MemberRecord = z.infer<typeof MemberRecordSchema>;
export type InviteMemberResponse = z.infer<typeof InviteMemberResponseSchema>;
export declare const MemberInvitationSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["biller", "manager", "developer", "employee", "viewer"]>;
    status: z.ZodEnum<["pending", "accepted", "revoked", "expired"]>;
    emailSent: z.ZodBoolean;
    expiresAt: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    email: string;
    emailSent: boolean;
    expiresAt: string;
    id: string;
    role: "viewer" | "biller" | "manager" | "developer" | "employee";
    status: "revoked" | "pending" | "expired" | "accepted";}, {
    createdAt: string;
    email: string;
    emailSent: boolean;
    expiresAt: string;
    id: string;
    role: "viewer" | "biller" | "manager" | "developer" | "employee";
    status: "revoked" | "pending" | "expired" | "accepted";}>;
export declare const MemberInvitationListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        role: z.ZodEnum<["biller", "manager", "developer", "employee", "viewer"]>;
        status: z.ZodEnum<["pending", "accepted", "revoked", "expired"]>;
        emailSent: z.ZodBoolean;
        expiresAt: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        email: string;
        emailSent: boolean;
        expiresAt: string;
        id: string;
        role: "viewer" | "biller" | "manager" | "developer" | "employee";
        status: "revoked" | "pending" | "expired" | "accepted";}, {
        createdAt: string;
        email: string;
        emailSent: boolean;
        expiresAt: string;
        id: string;
        role: "viewer" | "biller" | "manager" | "developer" | "employee";
        status: "revoked" | "pending" | "expired" | "accepted";}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "revoked" | "pending" | "expired" | "accepted";
        email: string;
        role: "viewer" | "biller" | "manager" | "developer" | "employee";
        id: string;
        createdAt: string;
        expiresAt: string;
        emailSent: boolean;
    }[];
}, {
    data: {
        status: "revoked" | "pending" | "expired" | "accepted";
        email: string;
        role: "viewer" | "biller" | "manager" | "developer" | "employee";
        id: string;
        createdAt: string;
        expiresAt: string;
        emailSent: boolean;
    }[];
}>;
export declare const MemberInvitationRevokedResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare const MemberInvitationResentResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    emailSent: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    emailSent: boolean;
    success: boolean;}, {
    emailSent: boolean;
    success: boolean;}>;
export type MemberInvitation = z.infer<typeof MemberInvitationSchema>;
//# sourceMappingURL=members.d.ts.map