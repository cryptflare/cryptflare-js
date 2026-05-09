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
export type StartDeploymentBody = z.infer<typeof StartDeploymentBodySchema>;
export type UpdateDeploymentBody = z.infer<typeof UpdateDeploymentBodySchema>;
//# sourceMappingURL=deployments.d.ts.map