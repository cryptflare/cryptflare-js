/**
 * Zod schemas for the Policies API (global + team policies, access requests
 * + grants, policy templates). Move-only extraction from
 * `apps/api/src/routes/policies/index.ts`.
 */
import { z } from 'zod';
export declare const PolicySuccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare const ClearedResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    cleared: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    cleared: number;
    success: boolean;}, {
    cleared: number;
    success: boolean;}>;
export declare const GlobalPolicySchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    name: z.ZodString;
    resource_pattern: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
    effect: z.ZodEnum<["allow", "deny"]>;
    conditions: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    priority: z.ZodNumber;
    enabled: z.ZodNumber;
    template_id: z.ZodNullable<z.ZodString>;
    created_by: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    conditions: Record<string, unknown> | null;
    created_at: string;
    created_by: string;
    effect: "allow" | "deny";
    enabled: number;
    id: string;
    name: string;
    organisation_id: string;
    permissions: string[];
    priority: number;
    resource_pattern: string;
    template_id: string | null;
    updated_at: string | null;}, {
    conditions: Record<string, unknown> | null;
    created_at: string;
    created_by: string;
    effect: "allow" | "deny";
    enabled: number;
    id: string;
    name: string;
    organisation_id: string;
    permissions: string[];
    priority: number;
    resource_pattern: string;
    template_id: string | null;
    updated_at: string | null;}>;
export declare const GlobalPolicyListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        resource_pattern: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        effect: z.ZodEnum<["allow", "deny"]>;
        conditions: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        priority: z.ZodNumber;
        enabled: z.ZodNumber;
        template_id: z.ZodNullable<z.ZodString>;
        created_by: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        conditions: Record<string, unknown> | null;
        created_at: string;
        created_by: string;
        effect: "allow" | "deny";
        enabled: number;
        id: string;
        name: string;
        organisation_id: string;
        permissions: string[];
        priority: number;
        resource_pattern: string;
        template_id: string | null;
        updated_at: string | null;}, {
        conditions: Record<string, unknown> | null;
        created_at: string;
        created_by: string;
        effect: "allow" | "deny";
        enabled: number;
        id: string;
        name: string;
        organisation_id: string;
        permissions: string[];
        priority: number;
        resource_pattern: string;
        template_id: string | null;
        updated_at: string | null;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        enabled: number;
        name: string;
        priority: number;
        id: string;
        organisation_id: string;
        created_at: string;
        permissions: string[];
        updated_at: string | null;
        resource_pattern: string;
        effect: "allow" | "deny";
        conditions: Record<string, unknown> | null;
        template_id: string | null;
        created_by: string;
    }[];
}, {
    data: {
        enabled: number;
        name: string;
        priority: number;
        id: string;
        organisation_id: string;
        created_at: string;
        permissions: string[];
        updated_at: string | null;
        resource_pattern: string;
        effect: "allow" | "deny";
        conditions: Record<string, unknown> | null;
        template_id: string | null;
        created_by: string;
    }[];
}>;
export declare const OrgTeamPolicySchema: z.ZodObject<{
    id: z.ZodString;
    team_id: z.ZodString;
    team_name: z.ZodString;
    team_slug: z.ZodString;
    resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
    resource_id: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
    effect: z.ZodEnum<["allow", "deny"]>;
    conditions: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    priority: z.ZodNumber;
    template_id: z.ZodNullable<z.ZodString>;
    created_by: z.ZodString;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conditions: Record<string, unknown> | null;
    created_at: string;
    created_by: string;
    effect: "allow" | "deny";
    id: string;
    permissions: string[];
    priority: number;
    resource_id: string;
    resource_type: "workspace" | "environment" | "pod";
    team_id: string;
    team_name: string;
    team_slug: string;
    template_id: string | null;}, {
    conditions: Record<string, unknown> | null;
    created_at: string;
    created_by: string;
    effect: "allow" | "deny";
    id: string;
    permissions: string[];
    priority: number;
    resource_id: string;
    resource_type: "workspace" | "environment" | "pod";
    team_id: string;
    team_name: string;
    team_slug: string;
    template_id: string | null;}>;
export declare const OrgTeamPolicyListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        team_id: z.ZodString;
        team_name: z.ZodString;
        team_slug: z.ZodString;
        resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
        resource_id: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        effect: z.ZodEnum<["allow", "deny"]>;
        conditions: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        priority: z.ZodNumber;
        template_id: z.ZodNullable<z.ZodString>;
        created_by: z.ZodString;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        conditions: Record<string, unknown> | null;
        created_at: string;
        created_by: string;
        effect: "allow" | "deny";
        id: string;
        permissions: string[];
        priority: number;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        team_id: string;
        team_name: string;
        team_slug: string;
        template_id: string | null;}, {
        conditions: Record<string, unknown> | null;
        created_at: string;
        created_by: string;
        effect: "allow" | "deny";
        id: string;
        permissions: string[];
        priority: number;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        team_id: string;
        team_name: string;
        team_slug: string;
        template_id: string | null;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        priority: number;
        id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        effect: "allow" | "deny";
        conditions: Record<string, unknown> | null;
        template_id: string | null;
        created_by: string;
        team_id: string;
        team_name: string;
        team_slug: string;
    }[];
}, {
    data: {
        priority: number;
        id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        effect: "allow" | "deny";
        conditions: Record<string, unknown> | null;
        template_id: string | null;
        created_by: string;
        team_id: string;
        team_name: string;
        team_slug: string;
    }[];
}>;
export declare const GlobalPolicyResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        resource_pattern: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        effect: z.ZodEnum<["allow", "deny"]>;
        conditions: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        priority: z.ZodNumber;
        enabled: z.ZodNumber;
        template_id: z.ZodNullable<z.ZodString>;
        created_by: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        conditions: Record<string, unknown> | null;
        created_at: string;
        created_by: string;
        effect: "allow" | "deny";
        enabled: number;
        id: string;
        name: string;
        organisation_id: string;
        permissions: string[];
        priority: number;
        resource_pattern: string;
        template_id: string | null;
        updated_at: string | null;}, {
        conditions: Record<string, unknown> | null;
        created_at: string;
        created_by: string;
        effect: "allow" | "deny";
        enabled: number;
        id: string;
        name: string;
        organisation_id: string;
        permissions: string[];
        priority: number;
        resource_pattern: string;
        template_id: string | null;
        updated_at: string | null;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        enabled: number;
        name: string;
        priority: number;
        id: string;
        organisation_id: string;
        created_at: string;
        permissions: string[];
        updated_at: string | null;
        resource_pattern: string;
        effect: "allow" | "deny";
        conditions: Record<string, unknown> | null;
        template_id: string | null;
        created_by: string;
    };
}, {
    data: {
        enabled: number;
        name: string;
        priority: number;
        id: string;
        organisation_id: string;
        created_at: string;
        permissions: string[];
        updated_at: string | null;
        resource_pattern: string;
        effect: "allow" | "deny";
        conditions: Record<string, unknown> | null;
        template_id: string | null;
        created_by: string;
    };
}>;
export declare const ScopedGlobalPolicyResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        resource_pattern: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        effect: z.ZodEnum<["allow", "deny"]>;
        conditions: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        priority: z.ZodNumber;
        enabled: z.ZodNumber;
        template_id: z.ZodNullable<z.ZodString>;
        created_by: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        conditions: Record<string, unknown> | null;
        created_at: string;
        created_by: string;
        effect: "allow" | "deny";
        enabled: number;
        id: string;
        name: string;
        organisation_id: string;
        permissions: string[];
        priority: number;
        resource_pattern: string;
        template_id: string | null;
        updated_at: string | null;}, {
        conditions: Record<string, unknown> | null;
        created_at: string;
        created_by: string;
        effect: "allow" | "deny";
        enabled: number;
        id: string;
        name: string;
        organisation_id: string;
        permissions: string[];
        priority: number;
        resource_pattern: string;
        template_id: string | null;
        updated_at: string | null;}>;
    scope: z.ZodLiteral<"global">;
}, "strip", z.ZodTypeAny, {
    data: {
        enabled: number;
        name: string;
        priority: number;
        id: string;
        organisation_id: string;
        created_at: string;
        permissions: string[];
        updated_at: string | null;
        resource_pattern: string;
        effect: "allow" | "deny";
        conditions: Record<string, unknown> | null;
        template_id: string | null;
        created_by: string;
    };
    scope: "global";}, {
    data: {
        enabled: number;
        name: string;
        priority: number;
        id: string;
        organisation_id: string;
        created_at: string;
        permissions: string[];
        updated_at: string | null;
        resource_pattern: string;
        effect: "allow" | "deny";
        conditions: Record<string, unknown> | null;
        template_id: string | null;
        created_by: string;
    };
    scope: "global";}>;
export declare const PoliciesTeamPolicySchema: z.ZodObject<{
    id: z.ZodString;
    team_id: z.ZodString;
    resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
    resource_id: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
    effect: z.ZodEnum<["allow", "deny"]>;
    conditions: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    priority: z.ZodNumber;
    template_id: z.ZodNullable<z.ZodString>;
    created_by: z.ZodString;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conditions: Record<string, unknown> | null;
    created_at: string;
    created_by: string;
    effect: "allow" | "deny";
    id: string;
    permissions: string[];
    priority: number;
    resource_id: string;
    resource_type: "workspace" | "environment" | "pod";
    team_id: string;
    template_id: string | null;}, {
    conditions: Record<string, unknown> | null;
    created_at: string;
    created_by: string;
    effect: "allow" | "deny";
    id: string;
    permissions: string[];
    priority: number;
    resource_id: string;
    resource_type: "workspace" | "environment" | "pod";
    team_id: string;
    template_id: string | null;}>;
export declare const ScopedTeamPolicyResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        team_id: z.ZodString;
        resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
        resource_id: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        effect: z.ZodEnum<["allow", "deny"]>;
        conditions: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        priority: z.ZodNumber;
        template_id: z.ZodNullable<z.ZodString>;
        created_by: z.ZodString;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        conditions: Record<string, unknown> | null;
        created_at: string;
        created_by: string;
        effect: "allow" | "deny";
        id: string;
        permissions: string[];
        priority: number;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        team_id: string;
        template_id: string | null;}, {
        conditions: Record<string, unknown> | null;
        created_at: string;
        created_by: string;
        effect: "allow" | "deny";
        id: string;
        permissions: string[];
        priority: number;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        team_id: string;
        template_id: string | null;}>;
    scope: z.ZodLiteral<"team">;
}, "strip", z.ZodTypeAny, {
    data: {
        priority: number;
        id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        effect: "allow" | "deny";
        conditions: Record<string, unknown> | null;
        template_id: string | null;
        created_by: string;
        team_id: string;
    };
    scope: "team";}, {
    data: {
        priority: number;
        id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        effect: "allow" | "deny";
        conditions: Record<string, unknown> | null;
        template_id: string | null;
        created_by: string;
        team_id: string;
    };
    scope: "team";}>;
export declare const SimulationResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        allowed: z.ZodBoolean;
        reason: z.ZodString;
        evaluationChain: z.ZodArray<z.ZodUnknown, "many">;
    }, "strip", z.ZodTypeAny, {
        allowed: boolean;
        evaluationChain: unknown[];
        reason: string;}, {
        allowed: boolean;
        evaluationChain: unknown[];
        reason: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        reason: string;
        allowed: boolean;
        evaluationChain: unknown[];
    };
}, {
    data: {
        reason: string;
        allowed: boolean;
        evaluationChain: unknown[];
    };
}>;
export declare const ImportResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        teamsImported: z.ZodNumber;
        policiesImported: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        policiesImported: number;
        teamsImported: number;}, {
        policiesImported: number;
        teamsImported: number;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        teamsImported: number;
        policiesImported: number;
    };
}, {
    data: {
        teamsImported: number;
        policiesImported: number;
    };
}>;
export declare const AccessRequestSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    requester_id: z.ZodString;
    resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
    resource_id: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
    reason: z.ZodString;
    duration_hours: z.ZodNumber;
    status: z.ZodEnum<["pending", "approved", "denied", "expired"]>;
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
    requester_id: string;
    resource_id: string;
    resource_type: "workspace" | "environment" | "pod";
    reviewed_at: string | null;
    reviewed_by: string | null;
    status: "pending" | "expired" | "approved" | "denied";}, {
    created_at: string;
    duration_hours: number;
    id: string;
    organisation_id: string;
    permissions: string[];
    reason: string;
    requester_id: string;
    resource_id: string;
    resource_type: "workspace" | "environment" | "pod";
    reviewed_at: string | null;
    reviewed_by: string | null;
    status: "pending" | "expired" | "approved" | "denied";}>;
export declare const AccessRequestResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        requester_id: z.ZodString;
        resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
        resource_id: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        reason: z.ZodString;
        duration_hours: z.ZodNumber;
        status: z.ZodEnum<["pending", "approved", "denied", "expired"]>;
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
        requester_id: string;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        reviewed_at: string | null;
        reviewed_by: string | null;
        status: "pending" | "expired" | "approved" | "denied";}, {
        created_at: string;
        duration_hours: number;
        id: string;
        organisation_id: string;
        permissions: string[];
        reason: string;
        requester_id: string;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        reviewed_at: string | null;
        reviewed_by: string | null;
        status: "pending" | "expired" | "approved" | "denied";}>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "pending" | "expired" | "approved" | "denied";
        reason: string;
        id: string;
        organisation_id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        requester_id: string;
        duration_hours: number;
        reviewed_by: string | null;
        reviewed_at: string | null;
    };
}, {
    data: {
        status: "pending" | "expired" | "approved" | "denied";
        reason: string;
        id: string;
        organisation_id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        requester_id: string;
        duration_hours: number;
        reviewed_by: string | null;
        reviewed_at: string | null;
    };
}>;
export declare const AccessRequestListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        requester_id: z.ZodString;
        resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
        resource_id: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        reason: z.ZodString;
        duration_hours: z.ZodNumber;
        status: z.ZodEnum<["pending", "approved", "denied", "expired"]>;
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
        requester_id: string;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        reviewed_at: string | null;
        reviewed_by: string | null;
        status: "pending" | "expired" | "approved" | "denied";}, {
        created_at: string;
        duration_hours: number;
        id: string;
        organisation_id: string;
        permissions: string[];
        reason: string;
        requester_id: string;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        reviewed_at: string | null;
        reviewed_by: string | null;
        status: "pending" | "expired" | "approved" | "denied";}>, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "pending" | "expired" | "approved" | "denied";
        reason: string;
        id: string;
        organisation_id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        requester_id: string;
        duration_hours: number;
        reviewed_by: string | null;
        reviewed_at: string | null;
    }[];
    total: number;}, {
    data: {
        status: "pending" | "expired" | "approved" | "denied";
        reason: string;
        id: string;
        organisation_id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        requester_id: string;
        duration_hours: number;
        reviewed_by: string | null;
        reviewed_at: string | null;
    }[];
    total: number;}>;
export declare const ApprovedAccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    expiresAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    expiresAt: string;
    success: boolean;}, {
    expiresAt: string;
    success: boolean;}>;
export declare const AccessGrantSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    request_id: z.ZodNullable<z.ZodString>;
    user_id: z.ZodString;
    resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
    resource_id: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
    granted_by: z.ZodString;
    expires_at: z.ZodString;
    revoked_at: z.ZodNullable<z.ZodString>;
    confirmation_method: z.ZodNullable<z.ZodEnum<["totp"]>>;
    confirmed_at: z.ZodNullable<z.ZodString>;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    confirmation_method: "totp" | null;
    confirmed_at: string | null;
    created_at: string;
    expires_at: string;
    granted_by: string;
    id: string;
    organisation_id: string;
    permissions: string[];
    request_id: string | null;
    resource_id: string;
    resource_type: "workspace" | "environment" | "pod";
    revoked_at: string | null;
    user_id: string;}, {
    confirmation_method: "totp" | null;
    confirmed_at: string | null;
    created_at: string;
    expires_at: string;
    granted_by: string;
    id: string;
    organisation_id: string;
    permissions: string[];
    request_id: string | null;
    resource_id: string;
    resource_type: "workspace" | "environment" | "pod";
    revoked_at: string | null;
    user_id: string;}>;
export declare const ApproveAccessRequestInputSchema: z.ZodObject<{
    confirmation: z.ZodOptional<z.ZodObject<{
        method: z.ZodLiteral<"totp">;
        code: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
        method: "totp";}, {
        code: string;
        method: "totp";}>>;
}, "strip", z.ZodTypeAny, {
    confirmation?: {
        code: string;
        method: "totp";
    } | undefined;
}, {
    confirmation?: {
        code: string;
        method: "totp";
    } | undefined;
}>;
export declare const AccessGrantListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        request_id: z.ZodNullable<z.ZodString>;
        user_id: z.ZodString;
        resource_type: z.ZodEnum<["workspace", "environment", "pod"]>;
        resource_id: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        granted_by: z.ZodString;
        expires_at: z.ZodString;
        revoked_at: z.ZodNullable<z.ZodString>;
        confirmation_method: z.ZodNullable<z.ZodEnum<["totp"]>>;
        confirmed_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        confirmation_method: "totp" | null;
        confirmed_at: string | null;
        created_at: string;
        expires_at: string;
        granted_by: string;
        id: string;
        organisation_id: string;
        permissions: string[];
        request_id: string | null;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        revoked_at: string | null;
        user_id: string;}, {
        confirmation_method: "totp" | null;
        confirmed_at: string | null;
        created_at: string;
        expires_at: string;
        granted_by: string;
        id: string;
        organisation_id: string;
        permissions: string[];
        request_id: string | null;
        resource_id: string;
        resource_type: "workspace" | "environment" | "pod";
        revoked_at: string | null;
        user_id: string;}>, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        organisation_id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        user_id: string;
        request_id: string | null;
        granted_by: string;
        expires_at: string;
        revoked_at: string | null;
        confirmation_method: "totp" | null;
        confirmed_at: string | null;
    }[];
    total: number;}, {
    data: {
        id: string;
        organisation_id: string;
        resource_type: "workspace" | "environment" | "pod";
        resource_id: string;
        created_at: string;
        permissions: string[];
        user_id: string;
        request_id: string | null;
        granted_by: string;
        expires_at: string;
        revoked_at: string | null;
        confirmation_method: "totp" | null;
        confirmed_at: string | null;
    }[];
    total: number;}>;
export declare const PolicyTemplateSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    category: z.ZodString;
    severity: z.ZodString;
    icon: z.ZodString;
    scope: z.ZodOptional<z.ZodString>;
    teamResourceType: z.ZodOptional<z.ZodString>;
    effect: z.ZodEnum<["allow", "deny"]>;
    resourcePattern: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
    priority: z.ZodNumber;
    conditions: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    parameters: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
    documentation: z.ZodObject<{
        summary: z.ZodString;
        whyItMatters: z.ZodString;
        exampleUse: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        exampleUse: string;
        summary: string;
        whyItMatters: string;}, {
        exampleUse: string;
        summary: string;
        whyItMatters: string;}>;
    compliance: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
}, "strip", z.ZodTypeAny, {
    category: string;
    compliance?: Record<string, unknown>[] | undefined;
    conditions: Record<string, unknown>;
    description: string;
    documentation: {
        summary: string;
        whyItMatters: string;
        exampleUse: string;
    };
    effect: "allow" | "deny";
    icon: string;
    id: string;
    name: string;
    parameters: Record<string, unknown>[];
    permissions: string[];
    priority: number;
    resourcePattern: string;
    scope?: string | undefined;
    severity: string;
    teamResourceType?: string | undefined;}, {
    category: string;
    compliance?: Record<string, unknown>[] | undefined;
    conditions: Record<string, unknown>;
    description: string;
    documentation: {
        summary: string;
        whyItMatters: string;
        exampleUse: string;
    };
    effect: "allow" | "deny";
    icon: string;
    id: string;
    name: string;
    parameters: Record<string, unknown>[];
    permissions: string[];
    priority: number;
    resourcePattern: string;
    scope?: string | undefined;
    severity: string;
    teamResourceType?: string | undefined;}>;
export declare const PolicyTemplateListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        category: z.ZodString;
        severity: z.ZodString;
        icon: z.ZodString;
        scope: z.ZodOptional<z.ZodString>;
        teamResourceType: z.ZodOptional<z.ZodString>;
        effect: z.ZodEnum<["allow", "deny"]>;
        resourcePattern: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        priority: z.ZodNumber;
        conditions: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        parameters: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
        documentation: z.ZodObject<{
            summary: z.ZodString;
            whyItMatters: z.ZodString;
            exampleUse: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            exampleUse: string;
            summary: string;
            whyItMatters: string;}, {
            exampleUse: string;
            summary: string;
            whyItMatters: string;}>;
        compliance: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    }, "strip", z.ZodTypeAny, {
        category: string;
        compliance?: Record<string, unknown>[] | undefined;
        conditions: Record<string, unknown>;
        description: string;
        documentation: {
            summary: string;
            whyItMatters: string;
            exampleUse: string;
        };
        effect: "allow" | "deny";
        icon: string;
        id: string;
        name: string;
        parameters: Record<string, unknown>[];
        permissions: string[];
        priority: number;
        resourcePattern: string;
        scope?: string | undefined;
        severity: string;
        teamResourceType?: string | undefined;}, {
        category: string;
        compliance?: Record<string, unknown>[] | undefined;
        conditions: Record<string, unknown>;
        description: string;
        documentation: {
            summary: string;
            whyItMatters: string;
            exampleUse: string;
        };
        effect: "allow" | "deny";
        icon: string;
        id: string;
        name: string;
        parameters: Record<string, unknown>[];
        permissions: string[];
        priority: number;
        resourcePattern: string;
        scope?: string | undefined;
        severity: string;
        teamResourceType?: string | undefined;}>, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    data: {
        description: string;
        name: string;
        priority: number;
        category: string;
        id: string;
        permissions: string[];
        severity: string;
        effect: "allow" | "deny";
        conditions: Record<string, unknown>;
        icon: string;
        resourcePattern: string;
        parameters: Record<string, unknown>[];
        documentation: {
            summary: string;
            whyItMatters: string;
            exampleUse: string;
        };
        compliance?: Record<string, unknown>[] | undefined;
        scope?: string | undefined;
        teamResourceType?: string | undefined;
    }[];
    total: number;}, {
    data: {
        description: string;
        name: string;
        priority: number;
        category: string;
        id: string;
        permissions: string[];
        severity: string;
        effect: "allow" | "deny";
        conditions: Record<string, unknown>;
        icon: string;
        resourcePattern: string;
        parameters: Record<string, unknown>[];
        documentation: {
            summary: string;
            whyItMatters: string;
            exampleUse: string;
        };
        compliance?: Record<string, unknown>[] | undefined;
        scope?: string | undefined;
        teamResourceType?: string | undefined;
    }[];
    total: number;}>;
export declare const PolicyTemplateResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        category: z.ZodString;
        severity: z.ZodString;
        icon: z.ZodString;
        scope: z.ZodOptional<z.ZodString>;
        teamResourceType: z.ZodOptional<z.ZodString>;
        effect: z.ZodEnum<["allow", "deny"]>;
        resourcePattern: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        priority: z.ZodNumber;
        conditions: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        parameters: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
        documentation: z.ZodObject<{
            summary: z.ZodString;
            whyItMatters: z.ZodString;
            exampleUse: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            exampleUse: string;
            summary: string;
            whyItMatters: string;}, {
            exampleUse: string;
            summary: string;
            whyItMatters: string;}>;
        compliance: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    }, "strip", z.ZodTypeAny, {
        category: string;
        compliance?: Record<string, unknown>[] | undefined;
        conditions: Record<string, unknown>;
        description: string;
        documentation: {
            summary: string;
            whyItMatters: string;
            exampleUse: string;
        };
        effect: "allow" | "deny";
        icon: string;
        id: string;
        name: string;
        parameters: Record<string, unknown>[];
        permissions: string[];
        priority: number;
        resourcePattern: string;
        scope?: string | undefined;
        severity: string;
        teamResourceType?: string | undefined;}, {
        category: string;
        compliance?: Record<string, unknown>[] | undefined;
        conditions: Record<string, unknown>;
        description: string;
        documentation: {
            summary: string;
            whyItMatters: string;
            exampleUse: string;
        };
        effect: "allow" | "deny";
        icon: string;
        id: string;
        name: string;
        parameters: Record<string, unknown>[];
        permissions: string[];
        priority: number;
        resourcePattern: string;
        scope?: string | undefined;
        severity: string;
        teamResourceType?: string | undefined;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        description: string;
        name: string;
        priority: number;
        category: string;
        id: string;
        permissions: string[];
        severity: string;
        effect: "allow" | "deny";
        conditions: Record<string, unknown>;
        icon: string;
        resourcePattern: string;
        parameters: Record<string, unknown>[];
        documentation: {
            summary: string;
            whyItMatters: string;
            exampleUse: string;
        };
        compliance?: Record<string, unknown>[] | undefined;
        scope?: string | undefined;
        teamResourceType?: string | undefined;
    };
}, {
    data: {
        description: string;
        name: string;
        priority: number;
        category: string;
        id: string;
        permissions: string[];
        severity: string;
        effect: "allow" | "deny";
        conditions: Record<string, unknown>;
        icon: string;
        resourcePattern: string;
        parameters: Record<string, unknown>[];
        documentation: {
            summary: string;
            whyItMatters: string;
            exampleUse: string;
        };
        compliance?: Record<string, unknown>[] | undefined;
        scope?: string | undefined;
        teamResourceType?: string | undefined;
    };
}>;
export declare const AppliedTemplateCountsResponseSchema: z.ZodObject<{
    data: z.ZodRecord<z.ZodString, z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, number>;
}, {
    data: Record<string, number>;
}>;
export declare const CreateGlobalPolicyInputSchema: z.ZodObject<{
    name: z.ZodString;
    resourcePattern: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
    effect: z.ZodEnum<["allow", "deny"]>;
    conditions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    priority: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    conditions?: Record<string, unknown> | undefined;
    effect: "allow" | "deny";
    name: string;
    permissions: string[];
    priority?: number | undefined;
    resourcePattern: string;}, {
    conditions?: Record<string, unknown> | undefined;
    effect: "allow" | "deny";
    name: string;
    permissions: string[];
    priority?: number | undefined;
    resourcePattern: string;}>;
export declare const UpdateGlobalPolicyInputSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    resourcePattern: z.ZodOptional<z.ZodString>;
    permissions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    effect: z.ZodOptional<z.ZodEnum<["allow", "deny"]>>;
    conditions: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    priority: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    conditions?: Record<string, unknown> | null | undefined;
    effect?: "allow" | "deny" | undefined;
    name?: string | undefined;
    permissions?: string[] | undefined;
    priority?: number | undefined;
    resourcePattern?: string | undefined;}, {
    conditions?: Record<string, unknown> | null | undefined;
    effect?: "allow" | "deny" | undefined;
    name?: string | undefined;
    permissions?: string[] | undefined;
    priority?: number | undefined;
    resourcePattern?: string | undefined;}>;
export declare const TogglePolicyInputSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled: boolean;
}>;
export declare const SimulatePolicyInputSchema: z.ZodObject<{
    userId: z.ZodString;
    action: z.ZodString;
    resourceType: z.ZodEnum<["workspace", "environment", "pod"]>;
    resourceId: z.ZodString;
    ipAddress: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    mfaRecent: z.ZodOptional<z.ZodBoolean>;
    secretAgeDays: z.ZodOptional<z.ZodNumber>;
    resourceTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    timestamp: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    action: string;
    country?: string | undefined;
    ipAddress?: string | undefined;
    mfaRecent?: boolean | undefined;
    resourceId: string;
    resourceTags?: string[] | undefined;
    resourceType: "workspace" | "environment" | "pod";
    secretAgeDays?: number | undefined;
    timestamp?: string | undefined;
    userId: string;}, {
    action: string;
    country?: string | undefined;
    ipAddress?: string | undefined;
    mfaRecent?: boolean | undefined;
    resourceId: string;
    resourceTags?: string[] | undefined;
    resourceType: "workspace" | "environment" | "pod";
    secretAgeDays?: number | undefined;
    timestamp?: string | undefined;
    userId: string;}>;
export declare const ImportPoliciesInputSchema: z.ZodObject<{
    teams: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        policies: z.ZodOptional<z.ZodArray<z.ZodObject<{
            resource_type: z.ZodString;
            resource_id: z.ZodString;
            permissions: z.ZodArray<z.ZodString, "many">;
            effect: z.ZodString;
            conditions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            conditions?: Record<string, unknown> | undefined;
            effect: string;
            permissions: string[];
            resource_id: string;
            resource_type: string;}, {
            conditions?: Record<string, unknown> | undefined;
            effect: string;
            permissions: string[];
            resource_id: string;
            resource_type: string;}>, "many">>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        name: string;
        policies?: {
            resource_type: string;
            resource_id: string;
            permissions: string[];
            effect: string;
            conditions?: Record<string, unknown> | undefined;
        }[] | undefined;
        slug: string;}, {
        description?: string | undefined;
        name: string;
        policies?: {
            resource_type: string;
            resource_id: string;
            permissions: string[];
            effect: string;
            conditions?: Record<string, unknown> | undefined;
        }[] | undefined;
        slug: string;}>, "many">>;
    global_policies: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        resource_pattern: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
        effect: z.ZodString;
        conditions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        priority: z.ZodOptional<z.ZodNumber>;
        enabled: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        conditions?: Record<string, unknown> | undefined;
        effect: string;
        enabled?: boolean | undefined;
        name: string;
        permissions: string[];
        priority?: number | undefined;
        resource_pattern: string;}, {
        conditions?: Record<string, unknown> | undefined;
        effect: string;
        enabled?: boolean | undefined;
        name: string;
        permissions: string[];
        priority?: number | undefined;
        resource_pattern: string;}>, "many">>;
}, "strip", z.ZodTypeAny, {
    global_policies?: {
        name: string;
        permissions: string[];
        resource_pattern: string;
        effect: string;
        enabled?: boolean | undefined;
        priority?: number | undefined;
        conditions?: Record<string, unknown> | undefined;
    }[] | undefined;
    teams?: {
        name: string;
        slug: string;
        description?: string | undefined;
        policies?: {
            resource_type: string;
            resource_id: string;
            permissions: string[];
            effect: string;
            conditions?: Record<string, unknown> | undefined;
        }[] | undefined;
    }[] | undefined;}, {
    global_policies?: {
        name: string;
        permissions: string[];
        resource_pattern: string;
        effect: string;
        enabled?: boolean | undefined;
        priority?: number | undefined;
        conditions?: Record<string, unknown> | undefined;
    }[] | undefined;
    teams?: {
        name: string;
        slug: string;
        description?: string | undefined;
        policies?: {
            resource_type: string;
            resource_id: string;
            permissions: string[];
            effect: string;
            conditions?: Record<string, unknown> | undefined;
        }[] | undefined;
    }[] | undefined;}>;
export declare const AccessRequestStatusFilterSchema: z.ZodEnum<["pending", "approved", "denied", "expired"]>;
export declare const CreateAccessRequestInputSchema: z.ZodObject<{
    resourceType: z.ZodEnum<["workspace", "environment", "pod"]>;
    resourceId: z.ZodString;
    permissions: z.ZodArray<z.ZodString, "many">;
    reason: z.ZodString;
    durationHours: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    durationHours: number;
    permissions: string[];
    reason: string;
    resourceId: string;
    resourceType: "workspace" | "environment" | "pod";}, {
    durationHours: number;
    permissions: string[];
    reason: string;
    resourceId: string;
    resourceType: "workspace" | "environment" | "pod";}>;
export declare const ClearAccessRequestsInputSchema: z.ZodObject<{
    statuses: z.ZodArray<z.ZodEnum<["denied", "expired"]>, "many">;
}, "strip", z.ZodTypeAny, {
    statuses: ("expired" | "denied")[];
}, {
    statuses: ("expired" | "denied")[];
}>;
export declare const AccessGrantStatusFilterSchema: z.ZodEnum<["active", "expired", "revoked"]>;
export declare const ClearAccessGrantsInputSchema: z.ZodObject<{
    statuses: z.ZodArray<z.ZodEnum<["revoked", "expired"]>, "many">;
}, "strip", z.ZodTypeAny, {
    statuses: ("revoked" | "expired")[];
}, {
    statuses: ("revoked" | "expired")[];
}>;
export declare const ApplyPolicyTemplateInputSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodNumber>;
    enabled: z.ZodOptional<z.ZodBoolean>;
    parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    scopeOverride: z.ZodOptional<z.ZodObject<{
        resourceType: z.ZodEnum<["workspace", "environment", "pod"]>;
        resourceId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        resourceId: string;
        resourceType: "workspace" | "environment" | "pod";}, {
        resourceId: string;
        resourceType: "workspace" | "environment" | "pod";}>>;
}, "strip", z.ZodTypeAny, {
    enabled?: boolean | undefined;
    name?: string | undefined;
    parameters?: Record<string, unknown> | undefined;
    priority?: number | undefined;
    scopeOverride?: {
        resourceType: "workspace" | "environment" | "pod";
        resourceId: string;
    } | undefined;}, {
    enabled?: boolean | undefined;
    name?: string | undefined;
    parameters?: Record<string, unknown> | undefined;
    priority?: number | undefined;
    scopeOverride?: {
        resourceType: "workspace" | "environment" | "pod";
        resourceId: string;
    } | undefined;}>;
export type GlobalPolicy = z.infer<typeof GlobalPolicySchema>;
export type OrgTeamPolicy = z.infer<typeof OrgTeamPolicySchema>;
export type PoliciesTeamPolicy = z.infer<typeof PoliciesTeamPolicySchema>;
export type AccessRequest = z.infer<typeof AccessRequestSchema>;
export type AccessGrant = z.infer<typeof AccessGrantSchema>;
export type PolicyTemplate = z.infer<typeof PolicyTemplateSchema>;
export type CreateGlobalPolicyInput = z.infer<typeof CreateGlobalPolicyInputSchema>;
export type UpdateGlobalPolicyInput = z.infer<typeof UpdateGlobalPolicyInputSchema>;
export type SimulatePolicyInput = z.infer<typeof SimulatePolicyInputSchema>;
export type ImportPoliciesInput = z.infer<typeof ImportPoliciesInputSchema>;
export type CreateAccessRequestInput = z.infer<typeof CreateAccessRequestInputSchema>;
export type ApplyPolicyTemplateInput = z.infer<typeof ApplyPolicyTemplateInputSchema>;
export type ApproveAccessRequestInput = z.infer<typeof ApproveAccessRequestInputSchema>;
//# sourceMappingURL=policies.d.ts.map