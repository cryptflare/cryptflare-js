/**
 * Zod schemas for the Rotation Policies API.
 * Move-only extraction from `apps/api/src/routes/rotation-policies/index.ts`.
 */
import { z } from 'zod';
export declare const RotationPolicyItemSchema: z.ZodObject<{
    id: z.ZodString;
    organisationId: z.ZodString;
    workspaceId: z.ZodString;
    environmentId: z.ZodString;
    secretId: z.ZodString;
    secretKey: z.ZodString;
    intervalDays: z.ZodNumber;
    generateLength: z.ZodNumber;
    generateCharset: z.ZodString;
    enabled: z.ZodNumber;
    nextRotationAt: z.ZodString;
    lastRotatedAt: z.ZodNullable<z.ZodString>;
    lastError: z.ZodNullable<z.ZodString>;
    retryCount: z.ZodNumber;
    notifyOnRotation: z.ZodNumber;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    enabled: number;
    environmentId: string;
    generateCharset: string;
    generateLength: number;
    id: string;
    intervalDays: number;
    lastError: string | null;
    lastRotatedAt: string | null;
    nextRotationAt: string;
    notifyOnRotation: number;
    organisationId: string;
    retryCount: number;
    secretId: string;
    secretKey: string;
    updatedAt: string;
    workspaceId: string;}, {
    createdAt: string;
    createdBy: string;
    enabled: number;
    environmentId: string;
    generateCharset: string;
    generateLength: number;
    id: string;
    intervalDays: number;
    lastError: string | null;
    lastRotatedAt: string | null;
    nextRotationAt: string;
    notifyOnRotation: number;
    organisationId: string;
    retryCount: number;
    secretId: string;
    secretKey: string;
    updatedAt: string;
    workspaceId: string;}>;
export declare const CreateRotationPolicyBodySchema: z.ZodObject<{
    intervalDays: z.ZodEffects<z.ZodNumber, number, number>;
    generateLength: z.ZodOptional<z.ZodNumber>;
    generateCharset: z.ZodOptional<z.ZodEnum<["alphanumeric", "hex", "base64", "ascii"]>>;
    notifyOnRotation: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    generateCharset?: "base64" | "ascii" | "hex" | "alphanumeric" | undefined;
    generateLength?: number | undefined;
    intervalDays: number;
    notifyOnRotation?: boolean | undefined;}, {
    generateCharset?: "base64" | "ascii" | "hex" | "alphanumeric" | undefined;
    generateLength?: number | undefined;
    intervalDays: number;
    notifyOnRotation?: boolean | undefined;}>;
export declare const UpdateRotationPolicyBodySchema: z.ZodObject<{
    intervalDays: z.ZodOptional<z.ZodEffects<z.ZodNumber, number, number>>;
    generateLength: z.ZodOptional<z.ZodNumber>;
    generateCharset: z.ZodOptional<z.ZodEnum<["alphanumeric", "hex", "base64", "ascii"]>>;
    notifyOnRotation: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    generateCharset?: "base64" | "ascii" | "hex" | "alphanumeric" | undefined;
    generateLength?: number | undefined;
    intervalDays?: number | undefined;
    notifyOnRotation?: boolean | undefined;}, {
    generateCharset?: "base64" | "ascii" | "hex" | "alphanumeric" | undefined;
    generateLength?: number | undefined;
    intervalDays?: number | undefined;
    notifyOnRotation?: boolean | undefined;}>;
export type RotationPolicyItem = z.infer<typeof RotationPolicyItemSchema>;
export type CreateRotationPolicyBody = z.infer<typeof CreateRotationPolicyBodySchema>;
export type UpdateRotationPolicyBody = z.infer<typeof UpdateRotationPolicyBodySchema>;
//# sourceMappingURL=rotation-policies.d.ts.map