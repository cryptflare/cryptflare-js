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
export declare const SecretSettingsSchema: z.ZodObject<{
    description: z.ZodNullable<z.ZodString>;
    metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>;
    maxVersions: z.ZodNumber;
    casEnabled: z.ZodBoolean;
    autoDeleteDays: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    autoDeleteDays: number | null;
    casEnabled: boolean;
    description: string | null;
    maxVersions: number;
    metadata: Record<string, string> | null;}, {
    autoDeleteDays: number | null;
    casEnabled: boolean;
    description: string | null;
    maxVersions: number;
    metadata: Record<string, string> | null;}>;
export declare const SecretVersionListItemSchema: z.ZodObject<{
    id: z.ZodString;
    version: z.ZodNumber;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    id: string;
    version: number;}, {
    createdAt: string;
    createdBy: string;
    id: string;
    version: number;}>;
export declare const LegacyImportInputSchema: z.ZodObject<{
    secrets: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        encryptedValue: z.ZodString;
        iv: z.ZodString;
        version: z.ZodOptional<z.ZodNumber>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>>;
        podId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        description?: string | null | undefined;
        encryptedValue: string;
        iv: string;
        key: string;
        metadata?: Record<string, string> | null | undefined;
        podId?: string | null | undefined;
        version?: number | undefined;}, {
        description?: string | null | undefined;
        encryptedValue: string;
        iv: string;
        key: string;
        metadata?: Record<string, string> | null | undefined;
        podId?: string | null | undefined;
        version?: number | undefined;}>, "many">;
}, "strip", z.ZodTypeAny, {
    secrets: {
        key: string;
        encryptedValue: string;
        iv: string;
        description?: string | null | undefined;
        metadata?: Record<string, string> | null | undefined;
        podId?: string | null | undefined;
        version?: number | undefined;
    }[];
}, {
    secrets: {
        key: string;
        encryptedValue: string;
        iv: string;
        description?: string | null | undefined;
        metadata?: Record<string, string> | null | undefined;
        podId?: string | null | undefined;
        version?: number | undefined;
    }[];
}>;
export declare const SetSecretRulesInputSchema: z.ZodObject<{
    rules: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    rules: ({
        type: "min_length";
        value: number;
    } | {
        type: "max_length";
        value: number;
    } | {
        type: "regex";
        pattern: string;
        label?: string | undefined;
    } | {
        type: "format";
        format: "json" | "uuid" | "base64" | "url" | "pem" | "connection_string";
    } | {
        type: "no_common_passwords";
    } | {
        type: "entropy_min";
        bits: number;
    })[];
}, {
    rules: ({
        type: "min_length";
        value: number;
    } | {
        type: "max_length";
        value: number;
    } | {
        type: "regex";
        pattern: string;
        label?: string | undefined;
    } | {
        type: "format";
        format: "json" | "uuid" | "base64" | "url" | "pem" | "connection_string";
    } | {
        type: "no_common_passwords";
    } | {
        type: "entropy_min";
        bits: number;
    })[];
}>;
export declare const SecretSuccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare const SecretKeyVersionResponseSchema: z.ZodObject<{
    key: z.ZodString;
    version: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    key: string;
    version: number;}, {
    key: string;
    version: number;}>;
export declare const SecretListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
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
        version: number;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        key: string;
        id: string;
        createdAt: string;
        version: number;
        updatedAt: string;
        createdBy: string;
    }[];
}, {
    data: {
        key: string;
        id: string;
        createdAt: string;
        version: number;
        updatedAt: string;
        createdBy: string;
    }[];
}>;
export declare const RevealedSecretResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    data: {
        key: string;
        value: string;
        version: number;
    };
}, {
    data: {
        key: string;
        value: string;
        version: number;
    };
}>;
export declare const SecretSettingsResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        description: z.ZodNullable<z.ZodString>;
        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>;
        maxVersions: z.ZodNumber;
        casEnabled: z.ZodBoolean;
        autoDeleteDays: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        autoDeleteDays: number | null;
        casEnabled: boolean;
        description: string | null;
        maxVersions: number;
        metadata: Record<string, string> | null;}, {
        autoDeleteDays: number | null;
        casEnabled: boolean;
        description: string | null;
        maxVersions: number;
        metadata: Record<string, string> | null;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        description: string | null;
        metadata: Record<string, string> | null;
        maxVersions: number;
        casEnabled: boolean;
        autoDeleteDays: number | null;
    };
}, {
    data: {
        description: string | null;
        metadata: Record<string, string> | null;
        maxVersions: number;
        casEnabled: boolean;
        autoDeleteDays: number | null;
    };
}>;
export declare const SecretVersionListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        version: z.ZodNumber;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        id: string;
        version: number;}, {
        createdAt: string;
        createdBy: string;
        id: string;
        version: number;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: string;
        version: number;
        createdBy: string;
    }[];
}, {
    data: {
        id: string;
        createdAt: string;
        version: number;
        createdBy: string;
    }[];
}>;
export declare const LegacyImportResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        imported: z.ZodNumber;
        skipped: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        imported: number;
        skipped: number;}, {
        imported: number;
        skipped: number;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        imported: number;
        skipped: number;
    };
}, {
    data: {
        imported: number;
        skipped: number;
    };
}>;
export declare const ImportExternalResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        source: z.ZodEnum<[string, ...string[]]>;
        conflictPolicy: z.ZodEnum<[string, ...string[]]>;
        imported: z.ZodNumber;
        overwritten: z.ZodNumber;
        skipped: z.ZodNumber;
        failed: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            finalKey: z.ZodOptional<z.ZodString>;
            status: z.ZodEnum<["imported", "overwritten", "skipped", "failed"]>;
            reason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            finalKey?: string | undefined;
            key: string;
            reason?: string | undefined;
            status: "imported" | "failed" | "skipped" | "overwritten";}, {
            finalKey?: string | undefined;
            key: string;
            reason?: string | undefined;
            status: "imported" | "failed" | "skipped" | "overwritten";}>, "many">;
    }, "strip", z.ZodTypeAny, {
        conflictPolicy: string;
        failed: number;
        imported: number;
        items: {
            key: string;
            status: "imported" | "failed" | "skipped" | "overwritten";
            reason?: string | undefined;
            finalKey?: string | undefined;
        }[];
        overwritten: number;
        skipped: number;
        source: string;}, {
        conflictPolicy: string;
        failed: number;
        imported: number;
        items: {
            key: string;
            status: "imported" | "failed" | "skipped" | "overwritten";
            reason?: string | undefined;
            finalKey?: string | undefined;
        }[];
        overwritten: number;
        skipped: number;
        source: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        imported: number;
        failed: number;
        items: {
            key: string;
            status: "imported" | "failed" | "skipped" | "overwritten";
            reason?: string | undefined;
            finalKey?: string | undefined;
        }[];
        skipped: number;
        source: string;
        conflictPolicy: string;
        overwritten: number;
    };
}, {
    data: {
        imported: number;
        failed: number;
        items: {
            key: string;
            status: "imported" | "failed" | "skipped" | "overwritten";
            reason?: string | undefined;
            finalKey?: string | undefined;
        }[];
        skipped: number;
        source: string;
        conflictPolicy: string;
        overwritten: number;
    };
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
export type SecretSettings = z.infer<typeof SecretSettingsSchema>;
export type SecretVersionListItem = z.infer<typeof SecretVersionListItemSchema>;
export type LegacyImportInput = z.infer<typeof LegacyImportInputSchema>;
export type SetSecretRulesInput = z.infer<typeof SetSecretRulesInputSchema>;
//# sourceMappingURL=secrets.d.ts.map