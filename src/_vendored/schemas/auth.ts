/**
 * Zod schemas for the Authentication API.
 * Move-only extraction from `apps/api/src/routes/auth/index.ts`.
 */
import { z } from 'zod';
export declare const LoginBodySchema: z.ZodObject<{
    email: z.ZodString;
    turnstileToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    turnstileToken: string;}, {
    email: string;
    turnstileToken: string;}>;
export declare const LoginResponseSchema: z.ZodObject<{
    requestId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    requestId: string;
}, {
    requestId: string;
}>;
export declare const VerifyBodySchema: z.ZodObject<{
    requestId: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    requestId: string;}, {
    code: string;
    requestId: string;}>;
export declare const VerifyResponseSchema: z.ZodObject<{
    user: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        name: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        id: string;
        name: string | null;}, {
        email: string;
        id: string;
        name: string | null;}>>;
    isNewUser: z.ZodOptional<z.ZodBoolean>;
    requiresTotp: z.ZodOptional<z.ZodBoolean>;
    userId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isNewUser?: boolean | undefined;
    requiresTotp?: boolean | undefined;
    user?: {
        name: string | null;
        email: string;
        id: string;
    } | undefined;
    userId?: string | undefined;}, {
    isNewUser?: boolean | undefined;
    requiresTotp?: boolean | undefined;
    user?: {
        name: string | null;
        email: string;
        id: string;
    } | undefined;
    userId?: string | undefined;}>;
export declare const WhoamiResponseSchema: z.ZodObject<{
    tokenType: z.ZodEnum<["service", "access"]>;
    tokenId: z.ZodNullable<z.ZodString>;
    organisation: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        plan: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        plan: string;}, {
        id: string;
        name: string;
        plan: string;}>;
    userId: z.ZodNullable<z.ZodString>;
    permissions: z.ZodArray<z.ZodString, "many">;
    orgId: z.ZodString;
    tokenKind: z.ZodEnum<["service", "workspace", "session"]>;
    ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    ipAllowlist: string[] | null;
    orgId: string;
    organisation: {
        name: string;
        id: string;
        plan: string;
    };
    permissions: string[];
    tokenId: string | null;
    tokenKind: "workspace" | "session" | "service";
    tokenType: "access" | "service";
    userId: string | null;}, {
    ipAllowlist: string[] | null;
    orgId: string;
    organisation: {
        name: string;
        id: string;
        plan: string;
    };
    permissions: string[];
    tokenId: string | null;
    tokenKind: "workspace" | "session" | "service";
    tokenType: "access" | "service";
    userId: string | null;}>;
export declare const MeResponseSchema: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        name: z.ZodNullable<z.ZodString>;
        avatarUrl: z.ZodNullable<z.ZodString>;
        totpEnabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        avatarUrl: string | null;
        email: string;
        id: string;
        name: string | null;
        totpEnabled: boolean;}, {
        avatarUrl: string | null;
        email: string;
        id: string;
        name: string | null;
        totpEnabled: boolean;}>;
    organisations: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        role: z.ZodString;
        plan: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        permissions: string[];
        plan: string;
        role: string;}, {
        id: string;
        name: string;
        permissions: string[];
        plan: string;
        role: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    organisations: {
        name: string;
        role: string;
        id: string;
        plan: string;
        permissions: string[];
    }[];
    user: {
        name: string | null;
        email: string;
        id: string;
        avatarUrl: string | null;
        totpEnabled: boolean;
    };}, {
    organisations: {
        name: string;
        role: string;
        id: string;
        plan: string;
        permissions: string[];
    }[];
    user: {
        name: string | null;
        email: string;
        id: string;
        avatarUrl: string | null;
        totpEnabled: boolean;
    };}>;
export declare const LogoutResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare const TotpSetupResponseSchema: z.ZodObject<{
    secret: z.ZodString;
    otpauthUri: z.ZodString;
}, "strip", z.ZodTypeAny, {
    otpauthUri: string;
    secret: string;}, {
    otpauthUri: string;
    secret: string;}>;
export declare const TotpCodeBodySchema: z.ZodObject<{
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
}, {
    code: string;
}>;
export declare const TotpVerifySetupResponseSchema: z.ZodObject<{
    recoveryCodes: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    recoveryCodes: string[];
}, {
    recoveryCodes: string[];
}>;
export declare const TotpDisableResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare const VerifyTotpBodySchema: z.ZodObject<{
    userId: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    userId: string;}, {
    code: string;
    userId: string;}>;
export type LoginBody = z.infer<typeof LoginBodySchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type VerifyBody = z.infer<typeof VerifyBodySchema>;
export type VerifyResponse = z.infer<typeof VerifyResponseSchema>;
export type WhoamiResponse = z.infer<typeof WhoamiResponseSchema>;
export type MeResponse = z.infer<typeof MeResponseSchema>;
export type TotpSetupResponse = z.infer<typeof TotpSetupResponseSchema>;
export type TotpCodeBody = z.infer<typeof TotpCodeBodySchema>;
export type TotpVerifySetupResponse = z.infer<typeof TotpVerifySetupResponseSchema>;
export type VerifyTotpBody = z.infer<typeof VerifyTotpBodySchema>;
export declare const AccessStatusResponseSchema: z.ZodObject<{
    restricted: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    restricted: boolean;
}, {
    restricted: boolean;
}>;
export declare const SessionItemSchema: z.ZodObject<{
    id: z.ZodString;
    ipAddress: z.ZodNullable<z.ZodString>;
    country: z.ZodNullable<z.ZodString>;
    suspicious: z.ZodBoolean;
    userAgent: z.ZodNullable<z.ZodString>;
    lastActiveAt: z.ZodString;
    createdAt: z.ZodString;
    expiresAt: z.ZodString;
    current: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    country: string | null;
    createdAt: string;
    current: boolean;
    expiresAt: string;
    id: string;
    ipAddress: string | null;
    lastActiveAt: string;
    suspicious: boolean;
    userAgent: string | null;}, {
    country: string | null;
    createdAt: string;
    current: boolean;
    expiresAt: string;
    id: string;
    ipAddress: string | null;
    lastActiveAt: string;
    suspicious: boolean;
    userAgent: string | null;}>;
export declare const SessionListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        ipAddress: z.ZodNullable<z.ZodString>;
        country: z.ZodNullable<z.ZodString>;
        suspicious: z.ZodBoolean;
        userAgent: z.ZodNullable<z.ZodString>;
        lastActiveAt: z.ZodString;
        createdAt: z.ZodString;
        expiresAt: z.ZodString;
        current: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        country: string | null;
        createdAt: string;
        current: boolean;
        expiresAt: string;
        id: string;
        ipAddress: string | null;
        lastActiveAt: string;
        suspicious: boolean;
        userAgent: string | null;}, {
        country: string | null;
        createdAt: string;
        current: boolean;
        expiresAt: string;
        id: string;
        ipAddress: string | null;
        lastActiveAt: string;
        suspicious: boolean;
        userAgent: string | null;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        ipAddress: string | null;
        country: string | null;
        suspicious: boolean;
        userAgent: string | null;
        lastActiveAt: string;
        createdAt: string;
        expiresAt: string;
        current: boolean;
    }[];
}, {
    data: {
        id: string;
        ipAddress: string | null;
        country: string | null;
        suspicious: boolean;
        userAgent: string | null;
        lastActiveAt: string;
        createdAt: string;
        expiresAt: string;
        current: boolean;
    }[];
}>;
export type AccessStatusResponse = z.infer<typeof AccessStatusResponseSchema>;
export type SessionItem = z.infer<typeof SessionItemSchema>;
export type SessionListResponse = z.infer<typeof SessionListResponseSchema>;
export declare const SessionRevokedResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare const NotificationTestResponseSchema: z.ZodObject<{
    delivered: z.ZodBoolean;
    category: z.ZodEnum<["transactional", "security_alert", "account_event"]>;
    reason: z.ZodOptional<z.ZodLiteral<"pref_disabled">>;
    to: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    category: "transactional" | "security_alert" | "account_event";
    delivered: boolean;
    reason?: "pref_disabled" | undefined;
    to?: string | undefined;}, {
    category: "transactional" | "security_alert" | "account_event";
    delivered: boolean;
    reason?: "pref_disabled" | undefined;
    to?: string | undefined;}>;
export declare const DeleteAccountResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    deleted: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    deleted: boolean;
    success: boolean;}, {
    deleted: boolean;
    success: boolean;}>;
export declare const DataExportRegionalSchema: z.ZodObject<{
    audit_logs: z.ZodArray<z.ZodObject<{
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
    team_members: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        team_id: z.ZodString;
        user_id: z.ZodString;
        added_by: z.ZodString;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        added_by: string;
        created_at: string;
        id: string;
        team_id: string;
        user_id: string;}, {
        added_by: string;
        created_at: string;
        id: string;
        team_id: string;
        user_id: string;}>, "many">;
    access_grants: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        request_id: z.ZodNullable<z.ZodString>;
        resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
        resource_id: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        granted_by: z.ZodString;
        expires_at: z.ZodString;
        revoked_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        expires_at: string;
        granted_by: string;
        id: string;
        organisation_id: string;
        permissions: string[];
        request_id: string | null;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        revoked_at: string | null;}, {
        created_at: string;
        expires_at: string;
        granted_by: string;
        id: string;
        organisation_id: string;
        permissions: string[];
        request_id: string | null;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        revoked_at: string | null;}>, "many">;
    access_requests: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
        resource_id: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        reason: z.ZodString;
        duration_hours: z.ZodNumber;
        status: z.ZodString;
        reviewed_by: z.ZodNullable<z.ZodString>;
        reviewed_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        duration_hours: number;
        id: string;
        organisation_id: string;
        permissions: string[];
        reason: string;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        reviewed_at: string | null;
        reviewed_by: string | null;
        status: string;}, {
        created_at: string;
        duration_hours: number;
        id: string;
        organisation_id: string;
        permissions: string[];
        reason: string;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        reviewed_at: string | null;
        reviewed_by: string | null;
        status: string;}>, "many">;
    support_tickets: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        subject: z.ZodString;
        description: z.ZodString;
        category: z.ZodString;
        priority: z.ZodEnum<["low", "medium", "high", "urgent"]>;
        status: z.ZodString;
        resolved_at: z.ZodNullable<z.ZodString>;
        closed_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        category: string;
        closed_at: string | null;
        created_at: string;
        description: string;
        id: string;
        organisation_id: string;
        priority: "low" | "medium" | "high" | "urgent";
        resolved_at: string | null;
        status: string;
        subject: string;}, {
        category: string;
        closed_at: string | null;
        created_at: string;
        description: string;
        id: string;
        organisation_id: string;
        priority: "low" | "medium" | "high" | "urgent";
        resolved_at: string | null;
        status: string;
        subject: string;}>, "many">;
    support_ticket_messages: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        ticket_id: z.ZodString;
        message: z.ZodString;
        is_internal: z.ZodNumber;
        created_at: z.ZodString;
        organisation_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        id: string;
        is_internal: number;
        message: string;
        organisation_id: string;
        ticket_id: string;}, {
        created_at: string;
        id: string;
        is_internal: number;
        message: string;
        organisation_id: string;
        ticket_id: string;}>, "many">;
    notifications: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        type: z.ZodString;
        title: z.ZodString;
        message: z.ZodString;
        link: z.ZodNullable<z.ZodString>;
        read: z.ZodNumber;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        id: string;
        link: string | null;
        message: string;
        organisation_id: string;
        read: number;
        title: string;
        type: string;}, {
        created_at: string;
        id: string;
        link: string | null;
        message: string;
        organisation_id: string;
        read: number;
        title: string;
        type: string;}>, "many">;
    doc_feedback: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        page: z.ZodString;
        value: z.ZodEnum<["negative", "neutral", "positive"]>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        id: string;
        page: string;
        updated_at: string;
        value: "negative" | "neutral" | "positive";}, {
        created_at: string;
        id: string;
        page: string;
        updated_at: string;
        value: "negative" | "neutral" | "positive";}>, "many">;
    workspaces_created: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;}, {
        created_at: string;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;}>, "many">;
    pods_created: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        environment_id: z.ZodString;
        parent_id: z.ZodNullable<z.ZodString>;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        description: string | null;
        environment_id: string;
        id: string;
        name: string;
        parent_id: string | null;
        slug: string;}, {
        created_at: string;
        description: string | null;
        environment_id: string;
        id: string;
        name: string;
        parent_id: string | null;
        slug: string;}>, "many">;
    secrets_created: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        environment_id: z.ZodString;
        pod_id: z.ZodNullable<z.ZodString>;
        key: z.ZodString;
        version: z.ZodNumber;
        description: z.ZodNullable<z.ZodString>;
        locked: z.ZodNumber;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        description: string | null;
        environment_id: string;
        id: string;
        key: string;
        locked: number;
        pod_id: string | null;
        version: number;}, {
        created_at: string;
        description: string | null;
        environment_id: string;
        id: string;
        key: string;
        locked: number;
        pod_id: string | null;
        version: number;}>, "many">;
    secret_versions_created: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        secret_id: z.ZodString;
        version: z.ZodNumber;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        id: string;
        secret_id: string;
        version: number;}, {
        created_at: string;
        id: string;
        secret_id: string;
        version: number;}>, "many">;
    teams_created: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        description: string | null;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;}, {
        created_at: string;
        description: string | null;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;}>, "many">;
    team_policies_authored: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        team_id: z.ZodString;
        resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
        resource_id: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        effect: z.ZodEnum<["allow", "deny"]>;
        priority: z.ZodNumber;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        effect: "allow" | "deny";
        id: string;
        permissions: string[];
        priority: number;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        team_id: string;}, {
        created_at: string;
        effect: "allow" | "deny";
        id: string;
        permissions: string[];
        priority: number;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        team_id: string;}>, "many">;
    global_policies_authored: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        resource_pattern: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        effect: z.ZodEnum<["allow", "deny"]>;
        priority: z.ZodNumber;
        enabled: z.ZodNumber;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        effect: "allow" | "deny";
        enabled: number;
        id: string;
        name: string;
        organisation_id: string;
        permissions: string[];
        priority: number;
        resource_pattern: string;}, {
        created_at: string;
        effect: "allow" | "deny";
        enabled: number;
        id: string;
        name: string;
        organisation_id: string;
        permissions: string[];
        priority: number;
        resource_pattern: string;}>, "many">;
    rotation_policies_authored: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        secret_id: z.ZodString;
        secret_key: z.ZodString;
        interval_days: z.ZodNumber;
        enabled: z.ZodNumber;
        next_rotation_at: z.ZodString;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        enabled: number;
        id: string;
        interval_days: number;
        next_rotation_at: string;
        organisation_id: string;
        secret_id: string;
        secret_key: string;}, {
        created_at: string;
        enabled: number;
        id: string;
        interval_days: number;
        next_rotation_at: string;
        organisation_id: string;
        secret_id: string;
        secret_key: string;}>, "many">;
    resource_tags_authored: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        resource_type: z.ZodEnum<["workspace", "environment", "pod", "secret"]>;
        resource_id: z.ZodString;
        tag: z.ZodString;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        id: string;
        organisation_id: string;
        resource_id: string;
        resource_type: "secret" | "workspace" | "environment" | "pod";
        tag: string;}, {
        created_at: string;
        id: string;
        organisation_id: string;
        resource_id: string;
        resource_type: "secret" | "workspace" | "environment" | "pod";
        tag: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    access_grants: {
        id: string;
        organisation_id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        request_id: string | null;
        granted_by: string;
        expires_at: string;
        revoked_at: string | null;
    }[];
    access_requests: {
        status: string;
        reason: string;
        id: string;
        organisation_id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        duration_hours: number;
        reviewed_by: string | null;
        reviewed_at: string | null;
    }[];
    audit_logs: {
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
    doc_feedback: {
        value: "negative" | "neutral" | "positive";
        id: string;
        created_at: string;
        page: string;
        updated_at: string;
    }[];
    global_policies_authored: {
        enabled: number;
        name: string;
        priority: number;
        id: string;
        organisation_id: string;
        created_at: string;
        permissions: string[];
        effect: "allow" | "deny";
        resource_pattern: string;
    }[];
    notifications: {
        type: string;
        title: string;
        link: string | null;
        id: string;
        organisation_id: string;
        message: string;
        created_at: string;
        read: number;
    }[];
    pods_created: {
        description: string | null;
        name: string;
        id: string;
        created_at: string;
        slug: string;
        environment_id: string;
        parent_id: string | null;
    }[];
    resource_tags_authored: {
        tag: string;
        id: string;
        organisation_id: string;
        resource_type: "secret" | "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
    }[];
    rotation_policies_authored: {
        enabled: number;
        id: string;
        organisation_id: string;
        created_at: string;
        secret_id: string;
        secret_key: string;
        interval_days: number;
        next_rotation_at: string;
    }[];
    secret_versions_created: {
        id: string;
        created_at: string;
        version: number;
        secret_id: string;
    }[];
    secrets_created: {
        locked: number;
        description: string | null;
        key: string;
        id: string;
        created_at: string;
        version: number;
        environment_id: string;
        pod_id: string | null;
    }[];
    support_ticket_messages: {
        id: string;
        organisation_id: string;
        message: string;
        created_at: string;
        ticket_id: string;
        is_internal: number;
    }[];
    support_tickets: {
        description: string;
        status: string;
        priority: "low" | "medium" | "high" | "urgent";
        category: string;
        id: string;
        organisation_id: string;
        created_at: string;
        subject: string;
        resolved_at: string | null;
        closed_at: string | null;
    }[];
    team_members: {
        id: string;
        created_at: string;
        team_id: string;
        user_id: string;
        added_by: string;
    }[];
    team_policies_authored: {
        priority: number;
        id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        team_id: string;
        effect: "allow" | "deny";
    }[];
    teams_created: {
        description: string | null;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
    }[];
    workspaces_created: {
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
    }[];}, {
    access_grants: {
        id: string;
        organisation_id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        request_id: string | null;
        granted_by: string;
        expires_at: string;
        revoked_at: string | null;
    }[];
    access_requests: {
        status: string;
        reason: string;
        id: string;
        organisation_id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        duration_hours: number;
        reviewed_by: string | null;
        reviewed_at: string | null;
    }[];
    audit_logs: {
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
    doc_feedback: {
        value: "negative" | "neutral" | "positive";
        id: string;
        created_at: string;
        page: string;
        updated_at: string;
    }[];
    global_policies_authored: {
        enabled: number;
        name: string;
        priority: number;
        id: string;
        organisation_id: string;
        created_at: string;
        permissions: string[];
        effect: "allow" | "deny";
        resource_pattern: string;
    }[];
    notifications: {
        type: string;
        title: string;
        link: string | null;
        id: string;
        organisation_id: string;
        message: string;
        created_at: string;
        read: number;
    }[];
    pods_created: {
        description: string | null;
        name: string;
        id: string;
        created_at: string;
        slug: string;
        environment_id: string;
        parent_id: string | null;
    }[];
    resource_tags_authored: {
        tag: string;
        id: string;
        organisation_id: string;
        resource_type: "secret" | "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
    }[];
    rotation_policies_authored: {
        enabled: number;
        id: string;
        organisation_id: string;
        created_at: string;
        secret_id: string;
        secret_key: string;
        interval_days: number;
        next_rotation_at: string;
    }[];
    secret_versions_created: {
        id: string;
        created_at: string;
        version: number;
        secret_id: string;
    }[];
    secrets_created: {
        locked: number;
        description: string | null;
        key: string;
        id: string;
        created_at: string;
        version: number;
        environment_id: string;
        pod_id: string | null;
    }[];
    support_ticket_messages: {
        id: string;
        organisation_id: string;
        message: string;
        created_at: string;
        ticket_id: string;
        is_internal: number;
    }[];
    support_tickets: {
        description: string;
        status: string;
        priority: "low" | "medium" | "high" | "urgent";
        category: string;
        id: string;
        organisation_id: string;
        created_at: string;
        subject: string;
        resolved_at: string | null;
        closed_at: string | null;
    }[];
    team_members: {
        id: string;
        created_at: string;
        team_id: string;
        user_id: string;
        added_by: string;
    }[];
    team_policies_authored: {
        priority: number;
        id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        team_id: string;
        effect: "allow" | "deny";
    }[];
    teams_created: {
        description: string | null;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
    }[];
    workspaces_created: {
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
    }[];}>;
export declare const DataExportResponseSchema: z.ZodObject<{
    schema_version: z.ZodLiteral<1>;
    generated_at: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        name: z.ZodNullable<z.ZodString>;
        avatar_url: z.ZodNullable<z.ZodString>;
        totp_enabled: z.ZodBoolean;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        avatar_url: string | null;
        created_at: string;
        email: string;
        id: string;
        name: string | null;
        totp_enabled: boolean;}, {
        avatar_url: string | null;
        created_at: string;
        email: string;
        id: string;
        name: string | null;
        totp_enabled: boolean;}>;
    memberships: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        role: z.ZodString;
        created_at: z.ZodString;
        organisation_name: z.ZodString;
        organisation_slug: z.ZodString;
        organisation_plan: z.ZodEnum<["free", "pro", "team"]>;
        organisation_data_region: z.ZodEnum<["default", "eu", "us", "apac"]>;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        id: string;
        organisation_data_region: "apac" | "default" | "eu" | "us";
        organisation_id: string;
        organisation_name: string;
        organisation_plan: "free" | "pro" | "team";
        organisation_slug: string;
        role: string;}, {
        created_at: string;
        id: string;
        organisation_data_region: "apac" | "default" | "eu" | "us";
        organisation_id: string;
        organisation_name: string;
        organisation_plan: "free" | "pro" | "team";
        organisation_slug: string;
        role: string;}>, "many">;
    invitations_sent: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        email: z.ZodString;
        role: z.ZodString;
        status: z.ZodString;
        expires_at: z.ZodString;
        accepted_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accepted_at: string | null;
        created_at: string;
        email: string;
        expires_at: string;
        id: string;
        organisation_id: string;
        role: string;
        status: string;}, {
        accepted_at: string | null;
        created_at: string;
        email: string;
        expires_at: string;
        id: string;
        organisation_id: string;
        role: string;
        status: string;}>, "many">;
    transfers: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        from_user_id: z.ZodString;
        to_email: z.ZodString;
        to_user_id: z.ZodNullable<z.ZodString>;
        status: z.ZodString;
        expires_at: z.ZodString;
        responded_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        expires_at: string;
        from_user_id: string;
        id: string;
        organisation_id: string;
        responded_at: string | null;
        status: string;
        to_email: string;
        to_user_id: string | null;}, {
        created_at: string;
        expires_at: string;
        from_user_id: string;
        id: string;
        organisation_id: string;
        responded_at: string | null;
        status: string;
        to_email: string;
        to_user_id: string | null;}>, "many">;
    tokens_created: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        workspace_id: z.ZodString;
        name: z.ZodString;
        token_prefix: z.ZodString;
        scopes: z.ZodArray<z.ZodString, "many">;
        disabled: z.ZodNumber;
        expires_at: z.ZodNullable<z.ZodString>;
        last_used_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        disabled: number;
        expires_at: string | null;
        id: string;
        last_used_at: string | null;
        name: string;
        organisation_id: string;
        scopes: string[];
        token_prefix: string;
        workspace_id: string;}, {
        created_at: string;
        disabled: number;
        expires_at: string | null;
        id: string;
        last_used_at: string | null;
        name: string;
        organisation_id: string;
        scopes: string[];
        token_prefix: string;
        workspace_id: string;}>, "many">;
    service_tokens_created: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        token_prefix: z.ZodString;
        scopes: z.ZodArray<z.ZodString, "many">;
        disabled: z.ZodNumber;
        expires_at: z.ZodNullable<z.ZodString>;
        last_used_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        description: string | null;
        disabled: number;
        expires_at: string | null;
        id: string;
        last_used_at: string | null;
        name: string;
        organisation_id: string;
        scopes: string[];
        token_prefix: string;}, {
        created_at: string;
        description: string | null;
        disabled: number;
        expires_at: string | null;
        id: string;
        last_used_at: string | null;
        name: string;
        organisation_id: string;
        scopes: string[];
        token_prefix: string;}>, "many">;
    audit_logs: z.ZodArray<z.ZodObject<{
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
    preferences: z.ZodObject<{
        emailNotifications: z.ZodOptional<z.ZodBoolean>;
        securityAlerts: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        emailNotifications?: boolean | undefined;
        securityAlerts?: boolean | undefined;}, {
        emailNotifications?: boolean | undefined;
        securityAlerts?: boolean | undefined;}>;
    sessions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        ip_address: z.ZodNullable<z.ZodString>;
        user_agent: z.ZodNullable<z.ZodString>;
        last_active_at: z.ZodString;
        expires_at: z.ZodString;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        expires_at: string;
        id: string;
        ip_address: string | null;
        last_active_at: string;
        user_agent: string | null;}, {
        created_at: string;
        expires_at: string;
        id: string;
        ip_address: string | null;
        last_active_at: string;
        user_agent: string | null;}>, "many">;
    regional: z.ZodObject<{
        default: z.ZodNullable<z.ZodObject<{
            audit_logs: z.ZodArray<z.ZodObject<{
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
            team_members: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                team_id: z.ZodString;
                user_id: z.ZodString;
                added_by: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                added_by: string;
                created_at: string;
                id: string;
                team_id: string;
                user_id: string;}, {
                added_by: string;
                created_at: string;
                id: string;
                team_id: string;
                user_id: string;}>, "many">;
            access_grants: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                request_id: z.ZodNullable<z.ZodString>;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                granted_by: z.ZodString;
                expires_at: z.ZodString;
                revoked_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                expires_at: string;
                granted_by: string;
                id: string;
                organisation_id: string;
                permissions: string[];
                request_id: string | null;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                revoked_at: string | null;}, {
                created_at: string;
                expires_at: string;
                granted_by: string;
                id: string;
                organisation_id: string;
                permissions: string[];
                request_id: string | null;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                revoked_at: string | null;}>, "many">;
            access_requests: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                reason: z.ZodString;
                duration_hours: z.ZodNumber;
                status: z.ZodString;
                reviewed_by: z.ZodNullable<z.ZodString>;
                reviewed_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                duration_hours: number;
                id: string;
                organisation_id: string;
                permissions: string[];
                reason: string;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                reviewed_at: string | null;
                reviewed_by: string | null;
                status: string;}, {
                created_at: string;
                duration_hours: number;
                id: string;
                organisation_id: string;
                permissions: string[];
                reason: string;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                reviewed_at: string | null;
                reviewed_by: string | null;
                status: string;}>, "many">;
            support_tickets: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                subject: z.ZodString;
                description: z.ZodString;
                category: z.ZodString;
                priority: z.ZodEnum<["low", "medium", "high", "urgent"]>;
                status: z.ZodString;
                resolved_at: z.ZodNullable<z.ZodString>;
                closed_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                category: string;
                closed_at: string | null;
                created_at: string;
                description: string;
                id: string;
                organisation_id: string;
                priority: "low" | "medium" | "high" | "urgent";
                resolved_at: string | null;
                status: string;
                subject: string;}, {
                category: string;
                closed_at: string | null;
                created_at: string;
                description: string;
                id: string;
                organisation_id: string;
                priority: "low" | "medium" | "high" | "urgent";
                resolved_at: string | null;
                status: string;
                subject: string;}>, "many">;
            support_ticket_messages: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                ticket_id: z.ZodString;
                message: z.ZodString;
                is_internal: z.ZodNumber;
                created_at: z.ZodString;
                organisation_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                is_internal: number;
                message: string;
                organisation_id: string;
                ticket_id: string;}, {
                created_at: string;
                id: string;
                is_internal: number;
                message: string;
                organisation_id: string;
                ticket_id: string;}>, "many">;
            notifications: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                type: z.ZodString;
                title: z.ZodString;
                message: z.ZodString;
                link: z.ZodNullable<z.ZodString>;
                read: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                link: string | null;
                message: string;
                organisation_id: string;
                read: number;
                title: string;
                type: string;}, {
                created_at: string;
                id: string;
                link: string | null;
                message: string;
                organisation_id: string;
                read: number;
                title: string;
                type: string;}>, "many">;
            doc_feedback: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                page: z.ZodString;
                value: z.ZodEnum<["negative", "neutral", "positive"]>;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                page: string;
                updated_at: string;
                value: "negative" | "neutral" | "positive";}, {
                created_at: string;
                id: string;
                page: string;
                updated_at: string;
                value: "negative" | "neutral" | "positive";}>, "many">;
            workspaces_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}, {
                created_at: string;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}>, "many">;
            pods_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                environment_id: z.ZodString;
                parent_id: z.ZodNullable<z.ZodString>;
                name: z.ZodString;
                slug: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                name: string;
                parent_id: string | null;
                slug: string;}, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                name: string;
                parent_id: string | null;
                slug: string;}>, "many">;
            secrets_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                environment_id: z.ZodString;
                pod_id: z.ZodNullable<z.ZodString>;
                key: z.ZodString;
                version: z.ZodNumber;
                description: z.ZodNullable<z.ZodString>;
                locked: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                key: string;
                locked: number;
                pod_id: string | null;
                version: number;}, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                key: string;
                locked: number;
                pod_id: string | null;
                version: number;}>, "many">;
            secret_versions_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                secret_id: z.ZodString;
                version: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                secret_id: string;
                version: number;}, {
                created_at: string;
                id: string;
                secret_id: string;
                version: number;}>, "many">;
            teams_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}, {
                created_at: string;
                description: string | null;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}>, "many">;
            team_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                team_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                effect: z.ZodEnum<["allow", "deny"]>;
                priority: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                effect: "allow" | "deny";
                id: string;
                permissions: string[];
                priority: number;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                team_id: string;}, {
                created_at: string;
                effect: "allow" | "deny";
                id: string;
                permissions: string[];
                priority: number;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                team_id: string;}>, "many">;
            global_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                resource_pattern: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                effect: z.ZodEnum<["allow", "deny"]>;
                priority: z.ZodNumber;
                enabled: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                effect: "allow" | "deny";
                enabled: number;
                id: string;
                name: string;
                organisation_id: string;
                permissions: string[];
                priority: number;
                resource_pattern: string;}, {
                created_at: string;
                effect: "allow" | "deny";
                enabled: number;
                id: string;
                name: string;
                organisation_id: string;
                permissions: string[];
                priority: number;
                resource_pattern: string;}>, "many">;
            rotation_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                secret_id: z.ZodString;
                secret_key: z.ZodString;
                interval_days: z.ZodNumber;
                enabled: z.ZodNumber;
                next_rotation_at: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                enabled: number;
                id: string;
                interval_days: number;
                next_rotation_at: string;
                organisation_id: string;
                secret_id: string;
                secret_key: string;}, {
                created_at: string;
                enabled: number;
                id: string;
                interval_days: number;
                next_rotation_at: string;
                organisation_id: string;
                secret_id: string;
                secret_key: string;}>, "many">;
            resource_tags_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod", "secret"]>;
                resource_id: z.ZodString;
                tag: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                organisation_id: string;
                resource_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                tag: string;}, {
                created_at: string;
                id: string;
                organisation_id: string;
                resource_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                tag: string;}>, "many">;
        }, "strip", z.ZodTypeAny, {
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            audit_logs: {
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
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];}, {
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            audit_logs: {
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
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];}>>;
        eu: z.ZodNullable<z.ZodObject<{
            audit_logs: z.ZodArray<z.ZodObject<{
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
            team_members: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                team_id: z.ZodString;
                user_id: z.ZodString;
                added_by: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                added_by: string;
                created_at: string;
                id: string;
                team_id: string;
                user_id: string;}, {
                added_by: string;
                created_at: string;
                id: string;
                team_id: string;
                user_id: string;}>, "many">;
            access_grants: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                request_id: z.ZodNullable<z.ZodString>;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                granted_by: z.ZodString;
                expires_at: z.ZodString;
                revoked_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                expires_at: string;
                granted_by: string;
                id: string;
                organisation_id: string;
                permissions: string[];
                request_id: string | null;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                revoked_at: string | null;}, {
                created_at: string;
                expires_at: string;
                granted_by: string;
                id: string;
                organisation_id: string;
                permissions: string[];
                request_id: string | null;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                revoked_at: string | null;}>, "many">;
            access_requests: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                reason: z.ZodString;
                duration_hours: z.ZodNumber;
                status: z.ZodString;
                reviewed_by: z.ZodNullable<z.ZodString>;
                reviewed_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                duration_hours: number;
                id: string;
                organisation_id: string;
                permissions: string[];
                reason: string;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                reviewed_at: string | null;
                reviewed_by: string | null;
                status: string;}, {
                created_at: string;
                duration_hours: number;
                id: string;
                organisation_id: string;
                permissions: string[];
                reason: string;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                reviewed_at: string | null;
                reviewed_by: string | null;
                status: string;}>, "many">;
            support_tickets: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                subject: z.ZodString;
                description: z.ZodString;
                category: z.ZodString;
                priority: z.ZodEnum<["low", "medium", "high", "urgent"]>;
                status: z.ZodString;
                resolved_at: z.ZodNullable<z.ZodString>;
                closed_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                category: string;
                closed_at: string | null;
                created_at: string;
                description: string;
                id: string;
                organisation_id: string;
                priority: "low" | "medium" | "high" | "urgent";
                resolved_at: string | null;
                status: string;
                subject: string;}, {
                category: string;
                closed_at: string | null;
                created_at: string;
                description: string;
                id: string;
                organisation_id: string;
                priority: "low" | "medium" | "high" | "urgent";
                resolved_at: string | null;
                status: string;
                subject: string;}>, "many">;
            support_ticket_messages: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                ticket_id: z.ZodString;
                message: z.ZodString;
                is_internal: z.ZodNumber;
                created_at: z.ZodString;
                organisation_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                is_internal: number;
                message: string;
                organisation_id: string;
                ticket_id: string;}, {
                created_at: string;
                id: string;
                is_internal: number;
                message: string;
                organisation_id: string;
                ticket_id: string;}>, "many">;
            notifications: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                type: z.ZodString;
                title: z.ZodString;
                message: z.ZodString;
                link: z.ZodNullable<z.ZodString>;
                read: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                link: string | null;
                message: string;
                organisation_id: string;
                read: number;
                title: string;
                type: string;}, {
                created_at: string;
                id: string;
                link: string | null;
                message: string;
                organisation_id: string;
                read: number;
                title: string;
                type: string;}>, "many">;
            doc_feedback: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                page: z.ZodString;
                value: z.ZodEnum<["negative", "neutral", "positive"]>;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                page: string;
                updated_at: string;
                value: "negative" | "neutral" | "positive";}, {
                created_at: string;
                id: string;
                page: string;
                updated_at: string;
                value: "negative" | "neutral" | "positive";}>, "many">;
            workspaces_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}, {
                created_at: string;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}>, "many">;
            pods_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                environment_id: z.ZodString;
                parent_id: z.ZodNullable<z.ZodString>;
                name: z.ZodString;
                slug: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                name: string;
                parent_id: string | null;
                slug: string;}, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                name: string;
                parent_id: string | null;
                slug: string;}>, "many">;
            secrets_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                environment_id: z.ZodString;
                pod_id: z.ZodNullable<z.ZodString>;
                key: z.ZodString;
                version: z.ZodNumber;
                description: z.ZodNullable<z.ZodString>;
                locked: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                key: string;
                locked: number;
                pod_id: string | null;
                version: number;}, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                key: string;
                locked: number;
                pod_id: string | null;
                version: number;}>, "many">;
            secret_versions_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                secret_id: z.ZodString;
                version: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                secret_id: string;
                version: number;}, {
                created_at: string;
                id: string;
                secret_id: string;
                version: number;}>, "many">;
            teams_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}, {
                created_at: string;
                description: string | null;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}>, "many">;
            team_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                team_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                effect: z.ZodEnum<["allow", "deny"]>;
                priority: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                effect: "allow" | "deny";
                id: string;
                permissions: string[];
                priority: number;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                team_id: string;}, {
                created_at: string;
                effect: "allow" | "deny";
                id: string;
                permissions: string[];
                priority: number;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                team_id: string;}>, "many">;
            global_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                resource_pattern: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                effect: z.ZodEnum<["allow", "deny"]>;
                priority: z.ZodNumber;
                enabled: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                effect: "allow" | "deny";
                enabled: number;
                id: string;
                name: string;
                organisation_id: string;
                permissions: string[];
                priority: number;
                resource_pattern: string;}, {
                created_at: string;
                effect: "allow" | "deny";
                enabled: number;
                id: string;
                name: string;
                organisation_id: string;
                permissions: string[];
                priority: number;
                resource_pattern: string;}>, "many">;
            rotation_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                secret_id: z.ZodString;
                secret_key: z.ZodString;
                interval_days: z.ZodNumber;
                enabled: z.ZodNumber;
                next_rotation_at: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                enabled: number;
                id: string;
                interval_days: number;
                next_rotation_at: string;
                organisation_id: string;
                secret_id: string;
                secret_key: string;}, {
                created_at: string;
                enabled: number;
                id: string;
                interval_days: number;
                next_rotation_at: string;
                organisation_id: string;
                secret_id: string;
                secret_key: string;}>, "many">;
            resource_tags_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod", "secret"]>;
                resource_id: z.ZodString;
                tag: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                organisation_id: string;
                resource_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                tag: string;}, {
                created_at: string;
                id: string;
                organisation_id: string;
                resource_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                tag: string;}>, "many">;
        }, "strip", z.ZodTypeAny, {
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            audit_logs: {
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
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];}, {
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            audit_logs: {
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
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];}>>;
        us: z.ZodNullable<z.ZodObject<{
            audit_logs: z.ZodArray<z.ZodObject<{
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
            team_members: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                team_id: z.ZodString;
                user_id: z.ZodString;
                added_by: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                added_by: string;
                created_at: string;
                id: string;
                team_id: string;
                user_id: string;}, {
                added_by: string;
                created_at: string;
                id: string;
                team_id: string;
                user_id: string;}>, "many">;
            access_grants: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                request_id: z.ZodNullable<z.ZodString>;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                granted_by: z.ZodString;
                expires_at: z.ZodString;
                revoked_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                expires_at: string;
                granted_by: string;
                id: string;
                organisation_id: string;
                permissions: string[];
                request_id: string | null;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                revoked_at: string | null;}, {
                created_at: string;
                expires_at: string;
                granted_by: string;
                id: string;
                organisation_id: string;
                permissions: string[];
                request_id: string | null;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                revoked_at: string | null;}>, "many">;
            access_requests: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                reason: z.ZodString;
                duration_hours: z.ZodNumber;
                status: z.ZodString;
                reviewed_by: z.ZodNullable<z.ZodString>;
                reviewed_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                duration_hours: number;
                id: string;
                organisation_id: string;
                permissions: string[];
                reason: string;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                reviewed_at: string | null;
                reviewed_by: string | null;
                status: string;}, {
                created_at: string;
                duration_hours: number;
                id: string;
                organisation_id: string;
                permissions: string[];
                reason: string;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                reviewed_at: string | null;
                reviewed_by: string | null;
                status: string;}>, "many">;
            support_tickets: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                subject: z.ZodString;
                description: z.ZodString;
                category: z.ZodString;
                priority: z.ZodEnum<["low", "medium", "high", "urgent"]>;
                status: z.ZodString;
                resolved_at: z.ZodNullable<z.ZodString>;
                closed_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                category: string;
                closed_at: string | null;
                created_at: string;
                description: string;
                id: string;
                organisation_id: string;
                priority: "low" | "medium" | "high" | "urgent";
                resolved_at: string | null;
                status: string;
                subject: string;}, {
                category: string;
                closed_at: string | null;
                created_at: string;
                description: string;
                id: string;
                organisation_id: string;
                priority: "low" | "medium" | "high" | "urgent";
                resolved_at: string | null;
                status: string;
                subject: string;}>, "many">;
            support_ticket_messages: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                ticket_id: z.ZodString;
                message: z.ZodString;
                is_internal: z.ZodNumber;
                created_at: z.ZodString;
                organisation_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                is_internal: number;
                message: string;
                organisation_id: string;
                ticket_id: string;}, {
                created_at: string;
                id: string;
                is_internal: number;
                message: string;
                organisation_id: string;
                ticket_id: string;}>, "many">;
            notifications: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                type: z.ZodString;
                title: z.ZodString;
                message: z.ZodString;
                link: z.ZodNullable<z.ZodString>;
                read: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                link: string | null;
                message: string;
                organisation_id: string;
                read: number;
                title: string;
                type: string;}, {
                created_at: string;
                id: string;
                link: string | null;
                message: string;
                organisation_id: string;
                read: number;
                title: string;
                type: string;}>, "many">;
            doc_feedback: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                page: z.ZodString;
                value: z.ZodEnum<["negative", "neutral", "positive"]>;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                page: string;
                updated_at: string;
                value: "negative" | "neutral" | "positive";}, {
                created_at: string;
                id: string;
                page: string;
                updated_at: string;
                value: "negative" | "neutral" | "positive";}>, "many">;
            workspaces_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}, {
                created_at: string;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}>, "many">;
            pods_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                environment_id: z.ZodString;
                parent_id: z.ZodNullable<z.ZodString>;
                name: z.ZodString;
                slug: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                name: string;
                parent_id: string | null;
                slug: string;}, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                name: string;
                parent_id: string | null;
                slug: string;}>, "many">;
            secrets_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                environment_id: z.ZodString;
                pod_id: z.ZodNullable<z.ZodString>;
                key: z.ZodString;
                version: z.ZodNumber;
                description: z.ZodNullable<z.ZodString>;
                locked: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                key: string;
                locked: number;
                pod_id: string | null;
                version: number;}, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                key: string;
                locked: number;
                pod_id: string | null;
                version: number;}>, "many">;
            secret_versions_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                secret_id: z.ZodString;
                version: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                secret_id: string;
                version: number;}, {
                created_at: string;
                id: string;
                secret_id: string;
                version: number;}>, "many">;
            teams_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}, {
                created_at: string;
                description: string | null;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}>, "many">;
            team_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                team_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                effect: z.ZodEnum<["allow", "deny"]>;
                priority: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                effect: "allow" | "deny";
                id: string;
                permissions: string[];
                priority: number;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                team_id: string;}, {
                created_at: string;
                effect: "allow" | "deny";
                id: string;
                permissions: string[];
                priority: number;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                team_id: string;}>, "many">;
            global_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                resource_pattern: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                effect: z.ZodEnum<["allow", "deny"]>;
                priority: z.ZodNumber;
                enabled: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                effect: "allow" | "deny";
                enabled: number;
                id: string;
                name: string;
                organisation_id: string;
                permissions: string[];
                priority: number;
                resource_pattern: string;}, {
                created_at: string;
                effect: "allow" | "deny";
                enabled: number;
                id: string;
                name: string;
                organisation_id: string;
                permissions: string[];
                priority: number;
                resource_pattern: string;}>, "many">;
            rotation_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                secret_id: z.ZodString;
                secret_key: z.ZodString;
                interval_days: z.ZodNumber;
                enabled: z.ZodNumber;
                next_rotation_at: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                enabled: number;
                id: string;
                interval_days: number;
                next_rotation_at: string;
                organisation_id: string;
                secret_id: string;
                secret_key: string;}, {
                created_at: string;
                enabled: number;
                id: string;
                interval_days: number;
                next_rotation_at: string;
                organisation_id: string;
                secret_id: string;
                secret_key: string;}>, "many">;
            resource_tags_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod", "secret"]>;
                resource_id: z.ZodString;
                tag: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                organisation_id: string;
                resource_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                tag: string;}, {
                created_at: string;
                id: string;
                organisation_id: string;
                resource_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                tag: string;}>, "many">;
        }, "strip", z.ZodTypeAny, {
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            audit_logs: {
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
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];}, {
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            audit_logs: {
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
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];}>>;
        apac: z.ZodNullable<z.ZodObject<{
            audit_logs: z.ZodArray<z.ZodObject<{
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
            team_members: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                team_id: z.ZodString;
                user_id: z.ZodString;
                added_by: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                added_by: string;
                created_at: string;
                id: string;
                team_id: string;
                user_id: string;}, {
                added_by: string;
                created_at: string;
                id: string;
                team_id: string;
                user_id: string;}>, "many">;
            access_grants: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                request_id: z.ZodNullable<z.ZodString>;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                granted_by: z.ZodString;
                expires_at: z.ZodString;
                revoked_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                expires_at: string;
                granted_by: string;
                id: string;
                organisation_id: string;
                permissions: string[];
                request_id: string | null;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                revoked_at: string | null;}, {
                created_at: string;
                expires_at: string;
                granted_by: string;
                id: string;
                organisation_id: string;
                permissions: string[];
                request_id: string | null;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                revoked_at: string | null;}>, "many">;
            access_requests: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                reason: z.ZodString;
                duration_hours: z.ZodNumber;
                status: z.ZodString;
                reviewed_by: z.ZodNullable<z.ZodString>;
                reviewed_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                duration_hours: number;
                id: string;
                organisation_id: string;
                permissions: string[];
                reason: string;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                reviewed_at: string | null;
                reviewed_by: string | null;
                status: string;}, {
                created_at: string;
                duration_hours: number;
                id: string;
                organisation_id: string;
                permissions: string[];
                reason: string;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                reviewed_at: string | null;
                reviewed_by: string | null;
                status: string;}>, "many">;
            support_tickets: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                subject: z.ZodString;
                description: z.ZodString;
                category: z.ZodString;
                priority: z.ZodEnum<["low", "medium", "high", "urgent"]>;
                status: z.ZodString;
                resolved_at: z.ZodNullable<z.ZodString>;
                closed_at: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                category: string;
                closed_at: string | null;
                created_at: string;
                description: string;
                id: string;
                organisation_id: string;
                priority: "low" | "medium" | "high" | "urgent";
                resolved_at: string | null;
                status: string;
                subject: string;}, {
                category: string;
                closed_at: string | null;
                created_at: string;
                description: string;
                id: string;
                organisation_id: string;
                priority: "low" | "medium" | "high" | "urgent";
                resolved_at: string | null;
                status: string;
                subject: string;}>, "many">;
            support_ticket_messages: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                ticket_id: z.ZodString;
                message: z.ZodString;
                is_internal: z.ZodNumber;
                created_at: z.ZodString;
                organisation_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                is_internal: number;
                message: string;
                organisation_id: string;
                ticket_id: string;}, {
                created_at: string;
                id: string;
                is_internal: number;
                message: string;
                organisation_id: string;
                ticket_id: string;}>, "many">;
            notifications: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                type: z.ZodString;
                title: z.ZodString;
                message: z.ZodString;
                link: z.ZodNullable<z.ZodString>;
                read: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                link: string | null;
                message: string;
                organisation_id: string;
                read: number;
                title: string;
                type: string;}, {
                created_at: string;
                id: string;
                link: string | null;
                message: string;
                organisation_id: string;
                read: number;
                title: string;
                type: string;}>, "many">;
            doc_feedback: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                page: z.ZodString;
                value: z.ZodEnum<["negative", "neutral", "positive"]>;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                page: string;
                updated_at: string;
                value: "negative" | "neutral" | "positive";}, {
                created_at: string;
                id: string;
                page: string;
                updated_at: string;
                value: "negative" | "neutral" | "positive";}>, "many">;
            workspaces_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}, {
                created_at: string;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}>, "many">;
            pods_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                environment_id: z.ZodString;
                parent_id: z.ZodNullable<z.ZodString>;
                name: z.ZodString;
                slug: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                name: string;
                parent_id: string | null;
                slug: string;}, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                name: string;
                parent_id: string | null;
                slug: string;}>, "many">;
            secrets_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                environment_id: z.ZodString;
                pod_id: z.ZodNullable<z.ZodString>;
                key: z.ZodString;
                version: z.ZodNumber;
                description: z.ZodNullable<z.ZodString>;
                locked: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                key: string;
                locked: number;
                pod_id: string | null;
                version: number;}, {
                created_at: string;
                description: string | null;
                environment_id: string;
                id: string;
                key: string;
                locked: number;
                pod_id: string | null;
                version: number;}>, "many">;
            secret_versions_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                secret_id: z.ZodString;
                version: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                secret_id: string;
                version: number;}, {
                created_at: string;
                id: string;
                secret_id: string;
                version: number;}>, "many">;
            teams_created: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                description: string | null;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}, {
                created_at: string;
                description: string | null;
                id: string;
                name: string;
                organisation_id: string;
                slug: string;}>, "many">;
            team_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                team_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
                resource_id: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                effect: z.ZodEnum<["allow", "deny"]>;
                priority: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                effect: "allow" | "deny";
                id: string;
                permissions: string[];
                priority: number;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                team_id: string;}, {
                created_at: string;
                effect: "allow" | "deny";
                id: string;
                permissions: string[];
                priority: number;
                resource_id: string;
                resource_type: "workspace" | "environment" | "pod";
                team_id: string;}>, "many">;
            global_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                name: z.ZodString;
                resource_pattern: z.ZodString;
                permissions: z.ZodArray<z.ZodString, "many">;
                effect: z.ZodEnum<["allow", "deny"]>;
                priority: z.ZodNumber;
                enabled: z.ZodNumber;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                effect: "allow" | "deny";
                enabled: number;
                id: string;
                name: string;
                organisation_id: string;
                permissions: string[];
                priority: number;
                resource_pattern: string;}, {
                created_at: string;
                effect: "allow" | "deny";
                enabled: number;
                id: string;
                name: string;
                organisation_id: string;
                permissions: string[];
                priority: number;
                resource_pattern: string;}>, "many">;
            rotation_policies_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                secret_id: z.ZodString;
                secret_key: z.ZodString;
                interval_days: z.ZodNumber;
                enabled: z.ZodNumber;
                next_rotation_at: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                enabled: number;
                id: string;
                interval_days: number;
                next_rotation_at: string;
                organisation_id: string;
                secret_id: string;
                secret_key: string;}, {
                created_at: string;
                enabled: number;
                id: string;
                interval_days: number;
                next_rotation_at: string;
                organisation_id: string;
                secret_id: string;
                secret_key: string;}>, "many">;
            resource_tags_authored: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                organisation_id: z.ZodString;
                resource_type: z.ZodEnum<["workspace", "environment", "pod", "secret"]>;
                resource_id: z.ZodString;
                tag: z.ZodString;
                created_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                created_at: string;
                id: string;
                organisation_id: string;
                resource_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                tag: string;}, {
                created_at: string;
                id: string;
                organisation_id: string;
                resource_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                tag: string;}>, "many">;
        }, "strip", z.ZodTypeAny, {
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            audit_logs: {
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
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];}, {
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            audit_logs: {
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
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];}>>;
    }, "strip", z.ZodTypeAny, {
        apac: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        default: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        eu: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        us: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;}, {
        apac: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        default: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        eu: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        us: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;}>;
}, "strip", z.ZodTypeAny, {
    audit_logs: {
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
    generated_at: string;
    invitations_sent: {
        status: string;
        email: string;
        role: string;
        id: string;
        organisation_id: string;
        created_at: string;
        expires_at: string;
        accepted_at: string | null;
    }[];
    memberships: {
        role: string;
        id: string;
        organisation_id: string;
        created_at: string;
        organisation_name: string;
        organisation_slug: string;
        organisation_plan: "free" | "pro" | "team";
        organisation_data_region: "apac" | "default" | "eu" | "us";
    }[];
    preferences: {
        emailNotifications?: boolean | undefined;
        securityAlerts?: boolean | undefined;
    };
    regional: {
        apac: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        default: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        eu: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        us: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
    };
    schema_version: 1;
    service_tokens_created: {
        disabled: number;
        description: string | null;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        expires_at: string | null;
        token_prefix: string;
        scopes: string[];
        last_used_at: string | null;
    }[];
    sessions: {
        id: string;
        ip_address: string | null;
        created_at: string;
        expires_at: string;
        user_agent: string | null;
        last_active_at: string;
    }[];
    tokens_created: {
        disabled: number;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        expires_at: string | null;
        workspace_id: string;
        token_prefix: string;
        scopes: string[];
        last_used_at: string | null;
    }[];
    transfers: {
        status: string;
        id: string;
        organisation_id: string;
        created_at: string;
        expires_at: string;
        from_user_id: string;
        to_email: string;
        to_user_id: string | null;
        responded_at: string | null;
    }[];
    user: {
        name: string | null;
        email: string;
        id: string;
        created_at: string;
        avatar_url: string | null;
        totp_enabled: boolean;
    };}, {
    audit_logs: {
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
    generated_at: string;
    invitations_sent: {
        status: string;
        email: string;
        role: string;
        id: string;
        organisation_id: string;
        created_at: string;
        expires_at: string;
        accepted_at: string | null;
    }[];
    memberships: {
        role: string;
        id: string;
        organisation_id: string;
        created_at: string;
        organisation_name: string;
        organisation_slug: string;
        organisation_plan: "free" | "pro" | "team";
        organisation_data_region: "apac" | "default" | "eu" | "us";
    }[];
    preferences: {
        emailNotifications?: boolean | undefined;
        securityAlerts?: boolean | undefined;
    };
    regional: {
        apac: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        default: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        eu: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
        us: {
            access_requests: {
                status: string;
                reason: string;
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                duration_hours: number;
                reviewed_by: string | null;
                reviewed_at: string | null;
            }[];
            support_tickets: {
                description: string;
                status: string;
                priority: "low" | "medium" | "high" | "urgent";
                category: string;
                id: string;
                organisation_id: string;
                created_at: string;
                subject: string;
                resolved_at: string | null;
                closed_at: string | null;
            }[];
            notifications: {
                type: string;
                title: string;
                link: string | null;
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                read: number;
            }[];
            audit_logs: {
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
            team_members: {
                id: string;
                created_at: string;
                team_id: string;
                user_id: string;
                added_by: string;
            }[];
            access_grants: {
                id: string;
                organisation_id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                request_id: string | null;
                granted_by: string;
                expires_at: string;
                revoked_at: string | null;
            }[];
            support_ticket_messages: {
                id: string;
                organisation_id: string;
                message: string;
                created_at: string;
                ticket_id: string;
                is_internal: number;
            }[];
            doc_feedback: {
                value: "negative" | "neutral" | "positive";
                id: string;
                created_at: string;
                page: string;
                updated_at: string;
            }[];
            workspaces_created: {
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            pods_created: {
                description: string | null;
                name: string;
                id: string;
                created_at: string;
                slug: string;
                environment_id: string;
                parent_id: string | null;
            }[];
            secrets_created: {
                locked: number;
                description: string | null;
                key: string;
                id: string;
                created_at: string;
                version: number;
                environment_id: string;
                pod_id: string | null;
            }[];
            secret_versions_created: {
                id: string;
                created_at: string;
                version: number;
                secret_id: string;
            }[];
            teams_created: {
                description: string | null;
                name: string;
                id: string;
                organisation_id: string;
                created_at: string;
                slug: string;
            }[];
            team_policies_authored: {
                priority: number;
                id: string;
                resource_type: "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
                permissions: string[];
                team_id: string;
                effect: "allow" | "deny";
            }[];
            global_policies_authored: {
                enabled: number;
                name: string;
                priority: number;
                id: string;
                organisation_id: string;
                created_at: string;
                permissions: string[];
                effect: "allow" | "deny";
                resource_pattern: string;
            }[];
            rotation_policies_authored: {
                enabled: number;
                id: string;
                organisation_id: string;
                created_at: string;
                secret_id: string;
                secret_key: string;
                interval_days: number;
                next_rotation_at: string;
            }[];
            resource_tags_authored: {
                tag: string;
                id: string;
                organisation_id: string;
                resource_type: "secret" | "workspace" | "environment" | "pod";
                resource_id: string;
                created_at: string;
            }[];
        } | null;
    };
    schema_version: 1;
    service_tokens_created: {
        disabled: number;
        description: string | null;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        expires_at: string | null;
        token_prefix: string;
        scopes: string[];
        last_used_at: string | null;
    }[];
    sessions: {
        id: string;
        ip_address: string | null;
        created_at: string;
        expires_at: string;
        user_agent: string | null;
        last_active_at: string;
    }[];
    tokens_created: {
        disabled: number;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        expires_at: string | null;
        workspace_id: string;
        token_prefix: string;
        scopes: string[];
        last_used_at: string | null;
    }[];
    transfers: {
        status: string;
        id: string;
        organisation_id: string;
        created_at: string;
        expires_at: string;
        from_user_id: string;
        to_email: string;
        to_user_id: string | null;
        responded_at: string | null;
    }[];
    user: {
        name: string | null;
        email: string;
        id: string;
        created_at: string;
        avatar_url: string | null;
        totp_enabled: boolean;
    };}>;
export type DataExportResponse = z.infer<typeof DataExportResponseSchema>;
//# sourceMappingURL=auth.d.ts.map