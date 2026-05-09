/**
 * Zod schemas for the Secrets API. Single source of truth shared by
 * `apps/api` (request validation + OpenAPI generation) and
 * `packages/sdk/typescript` (`z.infer<>` types for SDK consumers).
 *
 * Move-only extraction: every schema previously declared inline in
 * `apps/api/src/routes/secrets/index.ts` lives here. Behaviour is
 * unchanged. Adding new fields here automatically flows to both ends.
 */
import { z } from 'zod';
export declare const SecretValidationRuleSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"min_length">;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "min_length";
    value: number;}, {
    type: "min_length";
    value: number;}>, z.ZodObject<{
    type: z.ZodLiteral<"max_length">;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "max_length";
    value: number;}, {
    type: "max_length";
    value: number;}>, z.ZodObject<{
    type: z.ZodLiteral<"regex">;
    pattern: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    label?: string | undefined;
    pattern: string;
    type: "regex";}, {
    label?: string | undefined;
    pattern: string;
    type: "regex";}>, z.ZodObject<{
    type: z.ZodLiteral<"format">;
    format: z.ZodEnum<["uuid", "json", "base64", "url", "pem", "connection_string"]>;
}, "strip", z.ZodTypeAny, {
    format: "json" | "uuid" | "base64" | "url" | "pem" | "connection_string";
    type: "format";}, {
    format: "json" | "uuid" | "base64" | "url" | "pem" | "connection_string";
    type: "format";}>, z.ZodObject<{
    type: z.ZodLiteral<"no_common_passwords">;
}, "strip", z.ZodTypeAny, {
    type: "no_common_passwords";
}, {
    type: "no_common_passwords";
}>, z.ZodObject<{
    type: z.ZodLiteral<"entropy_min">;
    bits: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    bits: number;
    type: "entropy_min";}, {
    bits: number;
    type: "entropy_min";}>]>;
export declare const SecretValidationRulesSchema: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"min_length">;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "min_length";
    value: number;}, {
    type: "min_length";
    value: number;}>, z.ZodObject<{
    type: z.ZodLiteral<"max_length">;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "max_length";
    value: number;}, {
    type: "max_length";
    value: number;}>, z.ZodObject<{
    type: z.ZodLiteral<"regex">;
    pattern: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    label?: string | undefined;
    pattern: string;
    type: "regex";}, {
    label?: string | undefined;
    pattern: string;
    type: "regex";}>, z.ZodObject<{
    type: z.ZodLiteral<"format">;
    format: z.ZodEnum<["uuid", "json", "base64", "url", "pem", "connection_string"]>;
}, "strip", z.ZodTypeAny, {
    format: "json" | "uuid" | "base64" | "url" | "pem" | "connection_string";
    type: "format";}, {
    format: "json" | "uuid" | "base64" | "url" | "pem" | "connection_string";
    type: "format";}>, z.ZodObject<{
    type: z.ZodLiteral<"no_common_passwords">;
}, "strip", z.ZodTypeAny, {
    type: "no_common_passwords";
}, {
    type: "no_common_passwords";
}>, z.ZodObject<{
    type: z.ZodLiteral<"entropy_min">;
    bits: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    bits: number;
    type: "entropy_min";}, {
    bits: number;
    type: "entropy_min";}>]>, "many">;
export declare const SecretListItemSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    version: z.ZodNumber;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    id: string;
    key: string;
    updatedAt: string;
    version: number;}, {
    createdAt: string;
    createdBy: string;
    id: string;
    key: string;
    updatedAt: string;
    version: number;}>;
export declare const RevealedSecretSchema: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodString;
    version: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    key: string;
    value: string;
    version: number;}, {
    key: string;
    value: string;
    version: number;}>;
export declare const CreateSecretBodySchema: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodString;
    podId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    key: string;
    podId?: string | undefined;
    value: string;}, {
    key: string;
    podId?: string | undefined;
    value: string;}>;
export declare const RotateSecretBodySchema: z.ZodObject<{
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
}, {
    value: string;
}>;
export declare const RollbackSecretBodySchema: z.ZodObject<{
    version: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    version: number;
}, {
    version: number;
}>;
export declare const MoveSecretBodySchema: z.ZodObject<{
    podId: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    podId: string | null;
}, {
    podId: string | null;
}>;
export declare const UpdateSettingsBodySchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>>;
    maxVersions: z.ZodOptional<z.ZodNumber>;
    casEnabled: z.ZodOptional<z.ZodBoolean>;
    autoDeleteDays: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    autoDeleteDays?: number | null | undefined;
    casEnabled?: boolean | undefined;
    description?: string | null | undefined;
    maxVersions?: number | undefined;
    metadata?: Record<string, string> | null | undefined;}, {
    autoDeleteDays?: number | null | undefined;
    casEnabled?: boolean | undefined;
    description?: string | null | undefined;
    maxVersions?: number | undefined;
    metadata?: Record<string, string> | null | undefined;}>;
export declare const BatchCreateBodySchema: z.ZodObject<{
    secrets: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodString;
        podId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        podId?: string | null | undefined;
        value: string;}, {
        key: string;
        podId?: string | null | undefined;
        value: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    secrets: {
        key: string;
        value: string;
        podId?: string | null | undefined;
    }[];
}, {
    secrets: {
        key: string;
        value: string;
        podId?: string | null | undefined;
    }[];
}>;
export declare const BatchUpdateBodySchema: z.ZodObject<{
    secrets: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value: string;}, {
        key: string;
        value: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    secrets: {
        key: string;
        value: string;
    }[];
}, {
    secrets: {
        key: string;
        value: string;
    }[];
}>;
export declare const BatchDeleteBodySchema: z.ZodObject<{
    keys: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    keys: string[];
}, {
    keys: string[];
}>;
export type SecretValidationRule = z.infer<typeof SecretValidationRuleSchema>;
export type SecretValidationRules = z.infer<typeof SecretValidationRulesSchema>;
export type SecretListItem = z.infer<typeof SecretListItemSchema>;
export type RevealedSecret = z.infer<typeof RevealedSecretSchema>;
export type CreateSecretBody = z.infer<typeof CreateSecretBodySchema>;
export type RotateSecretBody = z.infer<typeof RotateSecretBodySchema>;
export type RollbackSecretBody = z.infer<typeof RollbackSecretBodySchema>;
export type MoveSecretBody = z.infer<typeof MoveSecretBodySchema>;
export type UpdateSettingsBody = z.infer<typeof UpdateSettingsBodySchema>;
export type BatchCreateBody = z.infer<typeof BatchCreateBodySchema>;
export type BatchUpdateBody = z.infer<typeof BatchUpdateBodySchema>;
export type BatchDeleteBody = z.infer<typeof BatchDeleteBodySchema>;
//# sourceMappingURL=secrets.d.ts.map