/**
 * Zod schemas for the Deployments API.
 * Move-only extraction from `apps/api/src/routes/deployments/index.ts`.
 */
import { z } from 'zod';
export declare const StartDeploymentBodySchema: z.ZodObject<{
    provider: z.ZodEnum<["terraform", "pulumi", "custom"]>;
    tokenName: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata?: Record<string, unknown> | undefined;
    provider: "custom" | "terraform" | "pulumi";
    tokenName?: string | undefined;}, {
    metadata?: Record<string, unknown> | undefined;
    provider: "custom" | "terraform" | "pulumi";
    tokenName?: string | undefined;}>;
export declare const UpdateDeploymentBodySchema: z.ZodObject<{
    status: z.ZodEnum<["running", "completed", "failed", "rolled_back"]>;
    resourcesCreated: z.ZodOptional<z.ZodNumber>;
    resourcesUpdated: z.ZodOptional<z.ZodNumber>;
    resourcesDeleted: z.ZodOptional<z.ZodNumber>;
    errorMessage: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    errorMessage?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    resourcesCreated?: number | undefined;
    resourcesDeleted?: number | undefined;
    resourcesUpdated?: number | undefined;
    status: "rolled_back" | "completed" | "failed" | "running";}, {
    errorMessage?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    resourcesCreated?: number | undefined;
    resourcesDeleted?: number | undefined;
    resourcesUpdated?: number | undefined;
    status: "rolled_back" | "completed" | "failed" | "running";}>;
export declare const DeploymentStatusFilterSchema: z.ZodEnum<["running", "completed", "failed", "rolled_back"]>;
export declare const DeploymentProviderFilterSchema: z.ZodEnum<["terraform", "pulumi", "custom"]>;
export declare const ListDeploymentsFilterFieldsSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["running", "completed", "failed", "rolled_back"]>>;
    provider: z.ZodOptional<z.ZodEnum<["terraform", "pulumi", "custom"]>>;
}, "strip", z.ZodTypeAny, {
    provider?: "custom" | "terraform" | "pulumi" | undefined;
    status?: "rolled_back" | "completed" | "failed" | "running" | undefined;}, {
    provider?: "custom" | "terraform" | "pulumi" | undefined;
    status?: "rolled_back" | "completed" | "failed" | "running" | undefined;}>;
export type StartDeploymentBody = z.infer<typeof StartDeploymentBodySchema>;
export type UpdateDeploymentBody = z.infer<typeof UpdateDeploymentBodySchema>;
export declare const DeploymentSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    token_id: z.ZodNullable<z.ZodString>;
    token_name: z.ZodNullable<z.ZodString>;
    provider: z.ZodEnum<["terraform", "pulumi", "custom"]>;
    status: z.ZodEnum<["running", "completed", "failed", "rolled_back"]>;
    resources_created: z.ZodNumber;
    resources_updated: z.ZodNumber;
    resources_deleted: z.ZodNumber;
    error_message: z.ZodNullable<z.ZodString>;
    metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    started_at: z.ZodString;
    completed_at: z.ZodNullable<z.ZodString>;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    completed_at: string | null;
    created_at: string;
    error_message: string | null;
    id: string;
    metadata: Record<string, unknown> | null;
    organisation_id: string;
    provider: "custom" | "terraform" | "pulumi";
    resources_created: number;
    resources_deleted: number;
    resources_updated: number;
    started_at: string;
    status: "rolled_back" | "completed" | "failed" | "running";
    token_id: string | null;
    token_name: string | null;}, {
    completed_at: string | null;
    created_at: string;
    error_message: string | null;
    id: string;
    metadata: Record<string, unknown> | null;
    organisation_id: string;
    provider: "custom" | "terraform" | "pulumi";
    resources_created: number;
    resources_deleted: number;
    resources_updated: number;
    started_at: string;
    status: "rolled_back" | "completed" | "failed" | "running";
    token_id: string | null;
    token_name: string | null;}>;
/**
 * Stub returned by start and update when deployment tracking is switched off
 * for the organisation. Nothing is stored, so only the ID and status exist.
 */
export declare const DeploymentTrackingDisabledSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: string;}, {
    id: string;
    status: string;}>;
export declare const DeploymentStartedResponseSchema: z.ZodObject<{
    data: z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        token_id: z.ZodNullable<z.ZodString>;
        token_name: z.ZodNullable<z.ZodString>;
        provider: z.ZodEnum<["terraform", "pulumi", "custom"]>;
        status: z.ZodEnum<["running", "completed", "failed", "rolled_back"]>;
        resources_created: z.ZodNumber;
        resources_updated: z.ZodNumber;
        resources_deleted: z.ZodNumber;
        error_message: z.ZodNullable<z.ZodString>;
        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        started_at: z.ZodString;
        completed_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        completed_at: string | null;
        created_at: string;
        error_message: string | null;
        id: string;
        metadata: Record<string, unknown> | null;
        organisation_id: string;
        provider: "custom" | "terraform" | "pulumi";
        resources_created: number;
        resources_deleted: number;
        resources_updated: number;
        started_at: string;
        status: "rolled_back" | "completed" | "failed" | "running";
        token_id: string | null;
        token_name: string | null;}, {
        completed_at: string | null;
        created_at: string;
        error_message: string | null;
        id: string;
        metadata: Record<string, unknown> | null;
        organisation_id: string;
        provider: "custom" | "terraform" | "pulumi";
        resources_created: number;
        resources_deleted: number;
        resources_updated: number;
        started_at: string;
        status: "rolled_back" | "completed" | "failed" | "running";
        token_id: string | null;
        token_name: string | null;}>, z.ZodObject<{
        id: z.ZodString;
        status: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: string;}, {
        id: string;
        status: string;}>]>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "rolled_back" | "completed" | "failed" | "running";
        metadata: Record<string, unknown> | null;
        id: string;
        organisation_id: string;
        created_at: string;
        provider: "custom" | "terraform" | "pulumi";
        token_id: string | null;
        token_name: string | null;
        resources_created: number;
        resources_updated: number;
        resources_deleted: number;
        error_message: string | null;
        started_at: string;
        completed_at: string | null;
    } | {
        status: string;
        id: string;
    };
}, {
    data: {
        status: "rolled_back" | "completed" | "failed" | "running";
        metadata: Record<string, unknown> | null;
        id: string;
        organisation_id: string;
        created_at: string;
        provider: "custom" | "terraform" | "pulumi";
        token_id: string | null;
        token_name: string | null;
        resources_created: number;
        resources_updated: number;
        resources_deleted: number;
        error_message: string | null;
        started_at: string;
        completed_at: string | null;
    } | {
        status: string;
        id: string;
    };
}>;
export declare const DeploymentUpdatedResponseSchema: z.ZodObject<{
    data: z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        token_id: z.ZodNullable<z.ZodString>;
        token_name: z.ZodNullable<z.ZodString>;
        provider: z.ZodEnum<["terraform", "pulumi", "custom"]>;
        status: z.ZodEnum<["running", "completed", "failed", "rolled_back"]>;
        resources_created: z.ZodNumber;
        resources_updated: z.ZodNumber;
        resources_deleted: z.ZodNumber;
        error_message: z.ZodNullable<z.ZodString>;
        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        started_at: z.ZodString;
        completed_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        completed_at: string | null;
        created_at: string;
        error_message: string | null;
        id: string;
        metadata: Record<string, unknown> | null;
        organisation_id: string;
        provider: "custom" | "terraform" | "pulumi";
        resources_created: number;
        resources_deleted: number;
        resources_updated: number;
        started_at: string;
        status: "rolled_back" | "completed" | "failed" | "running";
        token_id: string | null;
        token_name: string | null;}, {
        completed_at: string | null;
        created_at: string;
        error_message: string | null;
        id: string;
        metadata: Record<string, unknown> | null;
        organisation_id: string;
        provider: "custom" | "terraform" | "pulumi";
        resources_created: number;
        resources_deleted: number;
        resources_updated: number;
        started_at: string;
        status: "rolled_back" | "completed" | "failed" | "running";
        token_id: string | null;
        token_name: string | null;}>, z.ZodObject<{
        id: z.ZodString;
        status: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: string;}, {
        id: string;
        status: string;}>]>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "rolled_back" | "completed" | "failed" | "running";
        metadata: Record<string, unknown> | null;
        id: string;
        organisation_id: string;
        created_at: string;
        provider: "custom" | "terraform" | "pulumi";
        token_id: string | null;
        token_name: string | null;
        resources_created: number;
        resources_updated: number;
        resources_deleted: number;
        error_message: string | null;
        started_at: string;
        completed_at: string | null;
    } | {
        status: string;
        id: string;
    };
}, {
    data: {
        status: "rolled_back" | "completed" | "failed" | "running";
        metadata: Record<string, unknown> | null;
        id: string;
        organisation_id: string;
        created_at: string;
        provider: "custom" | "terraform" | "pulumi";
        token_id: string | null;
        token_name: string | null;
        resources_created: number;
        resources_updated: number;
        resources_deleted: number;
        error_message: string | null;
        started_at: string;
        completed_at: string | null;
    } | {
        status: string;
        id: string;
    };
}>;
export declare const DeploymentResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        token_id: z.ZodNullable<z.ZodString>;
        token_name: z.ZodNullable<z.ZodString>;
        provider: z.ZodEnum<["terraform", "pulumi", "custom"]>;
        status: z.ZodEnum<["running", "completed", "failed", "rolled_back"]>;
        resources_created: z.ZodNumber;
        resources_updated: z.ZodNumber;
        resources_deleted: z.ZodNumber;
        error_message: z.ZodNullable<z.ZodString>;
        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        started_at: z.ZodString;
        completed_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        completed_at: string | null;
        created_at: string;
        error_message: string | null;
        id: string;
        metadata: Record<string, unknown> | null;
        organisation_id: string;
        provider: "custom" | "terraform" | "pulumi";
        resources_created: number;
        resources_deleted: number;
        resources_updated: number;
        started_at: string;
        status: "rolled_back" | "completed" | "failed" | "running";
        token_id: string | null;
        token_name: string | null;}, {
        completed_at: string | null;
        created_at: string;
        error_message: string | null;
        id: string;
        metadata: Record<string, unknown> | null;
        organisation_id: string;
        provider: "custom" | "terraform" | "pulumi";
        resources_created: number;
        resources_deleted: number;
        resources_updated: number;
        started_at: string;
        status: "rolled_back" | "completed" | "failed" | "running";
        token_id: string | null;
        token_name: string | null;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "rolled_back" | "completed" | "failed" | "running";
        metadata: Record<string, unknown> | null;
        id: string;
        organisation_id: string;
        created_at: string;
        provider: "custom" | "terraform" | "pulumi";
        token_id: string | null;
        token_name: string | null;
        resources_created: number;
        resources_updated: number;
        resources_deleted: number;
        error_message: string | null;
        started_at: string;
        completed_at: string | null;
    };
}, {
    data: {
        status: "rolled_back" | "completed" | "failed" | "running";
        metadata: Record<string, unknown> | null;
        id: string;
        organisation_id: string;
        created_at: string;
        provider: "custom" | "terraform" | "pulumi";
        token_id: string | null;
        token_name: string | null;
        resources_created: number;
        resources_updated: number;
        resources_deleted: number;
        error_message: string | null;
        started_at: string;
        completed_at: string | null;
    };
}>;
export declare const DeploymentListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        token_id: z.ZodNullable<z.ZodString>;
        token_name: z.ZodNullable<z.ZodString>;
        provider: z.ZodEnum<["terraform", "pulumi", "custom"]>;
        status: z.ZodEnum<["running", "completed", "failed", "rolled_back"]>;
        resources_created: z.ZodNumber;
        resources_updated: z.ZodNumber;
        resources_deleted: z.ZodNumber;
        error_message: z.ZodNullable<z.ZodString>;
        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        started_at: z.ZodString;
        completed_at: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        completed_at: string | null;
        created_at: string;
        error_message: string | null;
        id: string;
        metadata: Record<string, unknown> | null;
        organisation_id: string;
        provider: "custom" | "terraform" | "pulumi";
        resources_created: number;
        resources_deleted: number;
        resources_updated: number;
        started_at: string;
        status: "rolled_back" | "completed" | "failed" | "running";
        token_id: string | null;
        token_name: string | null;}, {
        completed_at: string | null;
        created_at: string;
        error_message: string | null;
        id: string;
        metadata: Record<string, unknown> | null;
        organisation_id: string;
        provider: "custom" | "terraform" | "pulumi";
        resources_created: number;
        resources_deleted: number;
        resources_updated: number;
        started_at: string;
        status: "rolled_back" | "completed" | "failed" | "running";
        token_id: string | null;
        token_name: string | null;}>, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "rolled_back" | "completed" | "failed" | "running";
        metadata: Record<string, unknown> | null;
        id: string;
        organisation_id: string;
        created_at: string;
        provider: "custom" | "terraform" | "pulumi";
        token_id: string | null;
        token_name: string | null;
        resources_created: number;
        resources_updated: number;
        resources_deleted: number;
        error_message: string | null;
        started_at: string;
        completed_at: string | null;
    }[];
    total: number;}, {
    data: {
        status: "rolled_back" | "completed" | "failed" | "running";
        metadata: Record<string, unknown> | null;
        id: string;
        organisation_id: string;
        created_at: string;
        provider: "custom" | "terraform" | "pulumi";
        token_id: string | null;
        token_name: string | null;
        resources_created: number;
        resources_updated: number;
        resources_deleted: number;
        error_message: string | null;
        started_at: string;
        completed_at: string | null;
    }[];
    total: number;}>;
export type Deployment = z.infer<typeof DeploymentSchema>;
export type DeploymentListResponse = z.infer<typeof DeploymentListResponseSchema>;
//# sourceMappingURL=deployments.d.ts.map