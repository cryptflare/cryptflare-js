/**
 * Zod schemas for the Teams API.
 * Move-only extraction from `apps/api/src/routes/teams/index.ts`.
 */
import { z } from 'zod';
export declare const TeamSuccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare const TeamListItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    memberCount: z.ZodNumber;
    policyCount: z.ZodNumber;
    creatorName: z.ZodNullable<z.ZodString>;
    creatorEmail: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    creatorEmail: string | null;
    creatorName: string | null;
    description: string | null;
    id: string;
    memberCount: number;
    name: string;
    policyCount: number;
    slug: string;}, {
    createdAt: string;
    createdBy: string;
    creatorEmail: string | null;
    creatorName: string | null;
    description: string | null;
    id: string;
    memberCount: number;
    name: string;
    policyCount: number;
    slug: string;}>;
export declare const TeamListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
        memberCount: z.ZodNumber;
        policyCount: z.ZodNumber;
        creatorName: z.ZodNullable<z.ZodString>;
        creatorEmail: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        creatorEmail: string | null;
        creatorName: string | null;
        description: string | null;
        id: string;
        memberCount: number;
        name: string;
        policyCount: number;
        slug: string;}, {
        createdAt: string;
        createdBy: string;
        creatorEmail: string | null;
        creatorName: string | null;
        description: string | null;
        id: string;
        memberCount: number;
        name: string;
        policyCount: number;
        slug: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        description: string | null;
        name: string;
        id: string;
        createdAt: string;
        slug: string;
        createdBy: string;
        memberCount: number;
        policyCount: number;
        creatorName: string | null;
        creatorEmail: string | null;
    }[];
}, {
    data: {
        description: string | null;
        name: string;
        id: string;
        createdAt: string;
        slug: string;
        createdBy: string;
        memberCount: number;
        policyCount: number;
        creatorName: string | null;
        creatorEmail: string | null;
    }[];
}>;
export declare const TeamSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    created_by: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    created_at: string;
    created_by: string;
    description: string | null;
    id: string;
    name: string;
    organisation_id: string;
    slug: string;
    updated_at: string | null;}, {
    created_at: string;
    created_by: string;
    description: string | null;
    id: string;
    name: string;
    organisation_id: string;
    slug: string;
    updated_at: string | null;}>;
export declare const TeamMemberSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    userName: z.ZodNullable<z.ZodString>;
    userEmail: z.ZodNullable<z.ZodString>;
    addedBy: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    addedBy: string;
    createdAt: string;
    id: string;
    userEmail: string | null;
    userId: string;
    userName: string | null;}, {
    addedBy: string;
    createdAt: string;
    id: string;
    userEmail: string | null;
    userId: string;
    userName: string | null;}>;
export declare const TeamPolicySchema: z.ZodObject<{
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
export declare const TeamDetailResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        created_by: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodNullable<z.ZodString>;
    } & {
        members: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            userName: z.ZodNullable<z.ZodString>;
            userEmail: z.ZodNullable<z.ZodString>;
            addedBy: z.ZodString;
            createdAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            addedBy: string;
            createdAt: string;
            id: string;
            userEmail: string | null;
            userId: string;
            userName: string | null;}, {
            addedBy: string;
            createdAt: string;
            id: string;
            userEmail: string | null;
            userId: string;
            userName: string | null;}>, "many">;
        policies: z.ZodArray<z.ZodObject<{
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
            template_id: string | null;}>, "many">;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        created_by: string;
        description: string | null;
        id: string;
        members: {
            id: string;
            userId: string;
            createdAt: string;
            userName: string | null;
            userEmail: string | null;
            addedBy: string;
        }[];
        name: string;
        organisation_id: string;
        policies: {
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
        }[];
        slug: string;
        updated_at: string | null;}, {
        created_at: string;
        created_by: string;
        description: string | null;
        id: string;
        members: {
            id: string;
            userId: string;
            createdAt: string;
            userName: string | null;
            userEmail: string | null;
            addedBy: string;
        }[];
        name: string;
        organisation_id: string;
        policies: {
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
        }[];
        slug: string;
        updated_at: string | null;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        description: string | null;
        members: {
            id: string;
            userId: string;
            createdAt: string;
            userName: string | null;
            userEmail: string | null;
            addedBy: string;
        }[];
        policies: {
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
        }[];
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
        updated_at: string | null;
        created_by: string;
    };
}, {
    data: {
        description: string | null;
        members: {
            id: string;
            userId: string;
            createdAt: string;
            userName: string | null;
            userEmail: string | null;
            addedBy: string;
        }[];
        policies: {
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
        }[];
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
        updated_at: string | null;
        created_by: string;
    };
}>;
export declare const TeamResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        created_by: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        created_by: string;
        description: string | null;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;
        updated_at: string | null;}, {
        created_at: string;
        created_by: string;
        description: string | null;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;
        updated_at: string | null;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        description: string | null;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
        updated_at: string | null;
        created_by: string;
    };
}, {
    data: {
        description: string | null;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
        updated_at: string | null;
        created_by: string;
    };
}>;
export declare const TeamMemberListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        userName: z.ZodNullable<z.ZodString>;
        userEmail: z.ZodNullable<z.ZodString>;
        addedBy: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        addedBy: string;
        createdAt: string;
        id: string;
        userEmail: string | null;
        userId: string;
        userName: string | null;}, {
        addedBy: string;
        createdAt: string;
        id: string;
        userEmail: string | null;
        userId: string;
        userName: string | null;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        userId: string;
        createdAt: string;
        userName: string | null;
        userEmail: string | null;
        addedBy: string;
    }[];
}, {
    data: {
        id: string;
        userId: string;
        createdAt: string;
        userName: string | null;
        userEmail: string | null;
        addedBy: string;
    }[];
}>;
export declare const TeamMemberRowSchema: z.ZodObject<{
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
    user_id: string;}>;
export declare const TeamMemberRowResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
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
        user_id: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        created_at: string;
        user_id: string;
        team_id: string;
        added_by: string;
    };
}, {
    data: {
        id: string;
        created_at: string;
        user_id: string;
        team_id: string;
        added_by: string;
    };
}>;
export declare const TeamPolicyListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
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
    }[];
}>;
export declare const TeamPolicyResponseSchema: z.ZodObject<{
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
    };
}>;
export type TeamListItem = z.infer<typeof TeamListItemSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type TeamPolicy = z.infer<typeof TeamPolicySchema>;
export type TeamMemberRow = z.infer<typeof TeamMemberRowSchema>;
//# sourceMappingURL=teams.d.ts.map