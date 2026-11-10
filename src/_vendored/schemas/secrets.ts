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
    podId: z.ZodNullable<z.ZodString>;
    locked: z.ZodNumber;
    lockedBy: z.ZodNullable<z.ZodString>;
    lockedAt: z.ZodNullable<z.ZodString>;
    createdBy: z.ZodString;
    createdByName: z.ZodNullable<z.ZodString>;
    createdByEmail: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    createdByEmail: string | null;
    createdByName: string | null;
    id: string;
    key: string;
    locked: number;
    lockedAt: string | null;
    lockedBy: string | null;
    podId: string | null;
    updatedAt: string;
    version: number;}, {
    createdAt: string;
    createdBy: string;
    createdByEmail: string | null;
    createdByName: string | null;
    id: string;
    key: string;
    locked: number;
    lockedAt: string | null;
    lockedBy: string | null;
    podId: string | null;
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
/**
 * A single revealed secret, as `GET /secrets/:key` and
 * `GET /secrets/:key/versions/:version` return it. Batch reveal items stay on
 * `RevealedSecretSchema`: there the encoding is reported once for the page.
 */
export declare const RevealedSingleSecretSchema: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodString;
    version: z.ZodNumber;
} & {
    encoding: z.ZodEnum<["utf-8", "base64"]>;
}, "strip", z.ZodTypeAny, {
    encoding: "base64" | "utf-8";
    key: string;
    value: string;
    version: number;}, {
    encoding: "base64" | "utf-8";
    key: string;
    value: string;
    version: number;}>;
/**
 * Asks the server to generate the value. The caller never holds it: the
 * response carries the key and version, never the value.
 */
export declare const GenerateSecretSchema: z.ZodObject<{
    bytes: z.ZodOptional<z.ZodNumber>;
    encoding: z.ZodOptional<z.ZodEnum<["base64url", "hex"]>>;
}, "strip", z.ZodTypeAny, {
    bytes?: number | undefined;
    encoding?: "base64url" | "hex" | undefined;}, {
    bytes?: number | undefined;
    encoding?: "base64url" | "hex" | undefined;}>;
export declare const CreateSecretBodySchema: z.ZodEffects<z.ZodObject<{
    key: z.ZodString;
    value: z.ZodOptional<z.ZodString>;
    generate: z.ZodOptional<z.ZodObject<{
        bytes: z.ZodOptional<z.ZodNumber>;
        encoding: z.ZodOptional<z.ZodEnum<["base64url", "hex"]>>;
    }, "strip", z.ZodTypeAny, {
        bytes?: number | undefined;
        encoding?: "base64url" | "hex" | undefined;}, {
        bytes?: number | undefined;
        encoding?: "base64url" | "hex" | undefined;}>>;
    podId: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    description?: string | null | undefined;
    generate?: {
        encoding?: "base64url" | "hex" | undefined;
        bytes?: number | undefined;
    } | undefined;
    key: string;
    metadata?: Record<string, string> | null | undefined;
    podId?: string | undefined;
    value?: string | undefined;}, {
    description?: string | null | undefined;
    generate?: {
        encoding?: "base64url" | "hex" | undefined;
        bytes?: number | undefined;
    } | undefined;
    key: string;
    metadata?: Record<string, string> | null | undefined;
    podId?: string | undefined;
    value?: string | undefined;}>, {
    key: string;
    description?: string | null | undefined;
    value?: string | undefined;
    metadata?: Record<string, string> | null | undefined;
    podId?: string | undefined;
    generate?: {
        encoding?: "base64url" | "hex" | undefined;
        bytes?: number | undefined;
    } | undefined;
}, {
    key: string;
    description?: string | null | undefined;
    value?: string | undefined;
    metadata?: Record<string, string> | null | undefined;
    podId?: string | undefined;
    generate?: {
        encoding?: "base64url" | "hex" | undefined;
        bytes?: number | undefined;
    } | undefined;
}>;
export declare const RotateSecretBodySchema: z.ZodEffects<z.ZodObject<{
    value: z.ZodOptional<z.ZodString>;
    generate: z.ZodOptional<z.ZodObject<{
        bytes: z.ZodOptional<z.ZodNumber>;
        encoding: z.ZodOptional<z.ZodEnum<["base64url", "hex"]>>;
    }, "strip", z.ZodTypeAny, {
        bytes?: number | undefined;
        encoding?: "base64url" | "hex" | undefined;}, {
        bytes?: number | undefined;
        encoding?: "base64url" | "hex" | undefined;}>>;
}, "strip", z.ZodTypeAny, {
    generate?: {
        encoding?: "base64url" | "hex" | undefined;
        bytes?: number | undefined;
    } | undefined;
    value?: string | undefined;}, {
    generate?: {
        encoding?: "base64url" | "hex" | undefined;
        bytes?: number | undefined;
    } | undefined;
    value?: string | undefined;}>, {
    value?: string | undefined;
    generate?: {
        encoding?: "base64url" | "hex" | undefined;
        bytes?: number | undefined;
    } | undefined;
}, {
    value?: string | undefined;
    generate?: {
        encoding?: "base64url" | "hex" | undefined;
        bytes?: number | undefined;
    } | undefined;
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
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        description?: string | null | undefined;
        key: string;
        metadata?: Record<string, string> | null | undefined;
        podId?: string | null | undefined;
        value: string;}, {
        description?: string | null | undefined;
        key: string;
        metadata?: Record<string, string> | null | undefined;
        podId?: string | null | undefined;
        value: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    secrets: {
        key: string;
        value: string;
        description?: string | null | undefined;
        metadata?: Record<string, string> | null | undefined;
        podId?: string | null | undefined;
    }[];
}, {
    secrets: {
        key: string;
        value: string;
        description?: string | null | undefined;
        metadata?: Record<string, string> | null | undefined;
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
export declare const BATCH_ITEM_STATUSES: readonly ["created", "updated", "deleted", "skipped", "error"];
/**
 * Stable reason codes for a batch item that was skipped or failed. Codes, not
 * prose, so a client can branch on them and so a database error message can
 * never reach a response.
 */
export declare const BATCH_ITEM_REASONS: readonly ["already_exists", "duplicate_in_request", "not_found", "locked", "validation_failed", "pod_not_found", "write_failed"];
export declare const BatchItemResultSchema: z.ZodObject<{
    key: z.ZodString;
    status: z.ZodEnum<["created", "updated", "deleted", "skipped", "error"]>;
    version: z.ZodOptional<z.ZodNumber>;
    reason: z.ZodOptional<z.ZodEnum<["already_exists", "duplicate_in_request", "not_found", "locked", "validation_failed", "pod_not_found", "write_failed"]>>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    error?: string | undefined;
    key: string;
    reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
    status: "created" | "deleted" | "updated" | "error" | "skipped";
    version?: number | undefined;}, {
    error?: string | undefined;
    key: string;
    reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
    status: "created" | "deleted" | "updated" | "error" | "skipped";
    version?: number | undefined;}>;
export declare const BatchSummarySchema: z.ZodObject<{
    created: z.ZodNumber;
    updated: z.ZodNumber;
    deleted: z.ZodNumber;
    skipped: z.ZodNumber;
    errors: z.ZodNumber;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    created: number;
    deleted: number;
    errors: number;
    skipped: number;
    total: number;
    updated: number;}, {
    created: number;
    deleted: number;
    errors: number;
    skipped: number;
    total: number;
    updated: number;}>;
/**
 * Result of a batch create, update or delete.
 *
 * Batches complete inside the request, so `status` is always `completed` and
 * `results` is always present. `jobId` and `status` remain because earlier
 * versions queued the work and had clients poll `GET /batch/:jobId`; a client
 * written against that contract sees a finished job and stops polling.
 */
export declare const BatchResultSchema: z.ZodObject<{
    jobId: z.ZodString;
    status: z.ZodLiteral<"completed">;
    itemCount: z.ZodNumber;
    results: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        status: z.ZodEnum<["created", "updated", "deleted", "skipped", "error"]>;
        version: z.ZodOptional<z.ZodNumber>;
        reason: z.ZodOptional<z.ZodEnum<["already_exists", "duplicate_in_request", "not_found", "locked", "validation_failed", "pod_not_found", "write_failed"]>>;
        error: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        error?: string | undefined;
        key: string;
        reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
        status: "created" | "deleted" | "updated" | "error" | "skipped";
        version?: number | undefined;}, {
        error?: string | undefined;
        key: string;
        reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
        status: "created" | "deleted" | "updated" | "error" | "skipped";
        version?: number | undefined;}>, "many">;
    summary: z.ZodObject<{
        created: z.ZodNumber;
        updated: z.ZodNumber;
        deleted: z.ZodNumber;
        skipped: z.ZodNumber;
        errors: z.ZodNumber;
        total: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        created: number;
        deleted: number;
        errors: number;
        skipped: number;
        total: number;
        updated: number;}, {
        created: number;
        deleted: number;
        errors: number;
        skipped: number;
        total: number;
        updated: number;}>;
}, "strip", z.ZodTypeAny, {
    itemCount: number;
    jobId: string;
    results: {
        key: string;
        status: "created" | "deleted" | "updated" | "error" | "skipped";
        error?: string | undefined;
        reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
        version?: number | undefined;
    }[];
    status: "completed";
    summary: {
        created: number;
        deleted: number;
        updated: number;
        skipped: number;
        total: number;
        errors: number;
    };}, {
    itemCount: number;
    jobId: string;
    results: {
        key: string;
        status: "created" | "deleted" | "updated" | "error" | "skipped";
        error?: string | undefined;
        reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
        version?: number | undefined;
    }[];
    status: "completed";
    summary: {
        created: number;
        deleted: number;
        updated: number;
        skipped: number;
        total: number;
        errors: number;
    };}>;
export declare const BatchResultResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        jobId: z.ZodString;
        status: z.ZodLiteral<"completed">;
        itemCount: z.ZodNumber;
        results: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            status: z.ZodEnum<["created", "updated", "deleted", "skipped", "error"]>;
            version: z.ZodOptional<z.ZodNumber>;
            reason: z.ZodOptional<z.ZodEnum<["already_exists", "duplicate_in_request", "not_found", "locked", "validation_failed", "pod_not_found", "write_failed"]>>;
            error: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            error?: string | undefined;
            key: string;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            version?: number | undefined;}, {
            error?: string | undefined;
            key: string;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            version?: number | undefined;}>, "many">;
        summary: z.ZodObject<{
            created: z.ZodNumber;
            updated: z.ZodNumber;
            deleted: z.ZodNumber;
            skipped: z.ZodNumber;
            errors: z.ZodNumber;
            total: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            created: number;
            deleted: number;
            errors: number;
            skipped: number;
            total: number;
            updated: number;}, {
            created: number;
            deleted: number;
            errors: number;
            skipped: number;
            total: number;
            updated: number;}>;
    }, "strip", z.ZodTypeAny, {
        itemCount: number;
        jobId: string;
        results: {
            key: string;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            error?: string | undefined;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            version?: number | undefined;
        }[];
        status: "completed";
        summary: {
            created: number;
            deleted: number;
            updated: number;
            skipped: number;
            total: number;
            errors: number;
        };}, {
        itemCount: number;
        jobId: string;
        results: {
            key: string;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            error?: string | undefined;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            version?: number | undefined;
        }[];
        status: "completed";
        summary: {
            created: number;
            deleted: number;
            updated: number;
            skipped: number;
            total: number;
            errors: number;
        };}>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "completed";
        jobId: string;
        summary: {
            created: number;
            deleted: number;
            updated: number;
            skipped: number;
            total: number;
            errors: number;
        };
        itemCount: number;
        results: {
            key: string;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            error?: string | undefined;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            version?: number | undefined;
        }[];
    };
}, {
    data: {
        status: "completed";
        jobId: string;
        summary: {
            created: number;
            deleted: number;
            updated: number;
            skipped: number;
            total: number;
            errors: number;
        };
        itemCount: number;
        results: {
            key: string;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            error?: string | undefined;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            version?: number | undefined;
        }[];
    };
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
    createdByName: z.ZodNullable<z.ZodString>;
    createdByEmail: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    createdByEmail: string | null;
    createdByName: string | null;
    id: string;
    version: number;}, {
    createdAt: string;
    createdBy: string;
    createdByEmail: string | null;
    createdByName: string | null;
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
        version?: number | undefined;
        podId?: string | null | undefined;
    }[];
}, {
    secrets: {
        key: string;
        encryptedValue: string;
        iv: string;
        description?: string | null | undefined;
        metadata?: Record<string, string> | null | undefined;
        version?: number | undefined;
        podId?: string | null | undefined;
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
        podId: z.ZodNullable<z.ZodString>;
        locked: z.ZodNumber;
        lockedBy: z.ZodNullable<z.ZodString>;
        lockedAt: z.ZodNullable<z.ZodString>;
        createdBy: z.ZodString;
        createdByName: z.ZodNullable<z.ZodString>;
        createdByEmail: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        createdByEmail: string | null;
        createdByName: string | null;
        id: string;
        key: string;
        locked: number;
        lockedAt: string | null;
        lockedBy: string | null;
        podId: string | null;
        updatedAt: string;
        version: number;}, {
        createdAt: string;
        createdBy: string;
        createdByEmail: string | null;
        createdByName: string | null;
        id: string;
        key: string;
        locked: number;
        lockedAt: string | null;
        lockedBy: string | null;
        podId: string | null;
        updatedAt: string;
        version: number;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        locked: number;
        key: string;
        id: string;
        version: number;
        createdAt: string;
        createdBy: string;
        createdByName: string | null;
        updatedAt: string;
        podId: string | null;
        createdByEmail: string | null;
        lockedBy: string | null;
        lockedAt: string | null;
    }[];
}, {
    data: {
        locked: number;
        key: string;
        id: string;
        version: number;
        createdAt: string;
        createdBy: string;
        createdByName: string | null;
        updatedAt: string;
        podId: string | null;
        createdByEmail: string | null;
        lockedBy: string | null;
        lockedAt: string | null;
    }[];
}>;
export declare const RevealedSecretResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        key: z.ZodString;
        value: z.ZodString;
        version: z.ZodNumber;
    } & {
        encoding: z.ZodEnum<["utf-8", "base64"]>;
    }, "strip", z.ZodTypeAny, {
        encoding: "base64" | "utf-8";
        key: string;
        value: string;
        version: number;}, {
        encoding: "base64" | "utf-8";
        key: string;
        value: string;
        version: number;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        key: string;
        value: string;
        version: number;
        encoding: "base64" | "utf-8";
    };
}, {
    data: {
        key: string;
        value: string;
        version: number;
        encoding: "base64" | "utf-8";
    };
}>;
/**
 * Batch reveal request.
 *
 * Sent as a POST body rather than a query string: key names are sensitive
 * enough that they must not land in URLs, access logs, or browser history.
 *
 * `keys` omitted means "every secret in the environment", which is what a
 * `cf pull` does. The 100 cap matches the other batch endpoints and bounds
 * both the decrypt work and the rate-limit charge for one call.
 */
export declare const RevealSecretsBatchBodySchema: z.ZodObject<{
    keys: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    podId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    format: z.ZodOptional<z.ZodEnum<["utf-8", "base64"]>>;
    limit: z.ZodOptional<z.ZodNumber>;
    cursor: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    cursor?: string | undefined;
    format?: "base64" | "utf-8" | undefined;
    keys?: string[] | undefined;
    limit?: number | undefined;
    podId?: string | null | undefined;}, {
    cursor?: string | undefined;
    format?: "base64" | "utf-8" | undefined;
    keys?: string[] | undefined;
    limit?: number | undefined;
    podId?: string | null | undefined;}>;
export declare const RevealedSecretsBatchResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        secrets: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodString;
            version: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            key: string;
            value: string;
            version: number;}, {
            key: string;
            value: string;
            version: number;}>, "many">;
        /** Keys that were asked for but do not exist. Reported rather than 404ing
         *  the whole call, so one stale key cannot block a working bootstrap. */
        missing: z.ZodArray<z.ZodString, "many">;
        encoding: z.ZodEnum<["utf-8", "base64"]>;
        nextCursor: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        encoding: "base64" | "utf-8";
        missing: string[];
        nextCursor: string | null;
        secrets: {
            key: string;
            value: string;
            version: number;
        }[];}, {
        encoding: "base64" | "utf-8";
        missing: string[];
        nextCursor: string | null;
        secrets: {
            key: string;
            value: string;
            version: number;
        }[];}>;
}, "strip", z.ZodTypeAny, {
    data: {
        secrets: {
            key: string;
            value: string;
            version: number;
        }[];
        encoding: "base64" | "utf-8";
        missing: string[];
        nextCursor: string | null;
    };
}, {
    data: {
        secrets: {
            key: string;
            value: string;
            version: number;
        }[];
        encoding: "base64" | "utf-8";
        missing: string[];
        nextCursor: string | null;
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
        createdByName: z.ZodNullable<z.ZodString>;
        createdByEmail: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        createdByEmail: string | null;
        createdByName: string | null;
        id: string;
        version: number;}, {
        createdAt: string;
        createdBy: string;
        createdByEmail: string | null;
        createdByName: string | null;
        id: string;
        version: number;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        version: number;
        createdAt: string;
        createdBy: string;
        createdByName: string | null;
        createdByEmail: string | null;
    }[];
}, {
    data: {
        id: string;
        version: number;
        createdAt: string;
        createdBy: string;
        createdByName: string | null;
        createdByEmail: string | null;
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
export type RevealedSingleSecret = z.infer<typeof RevealedSingleSecretSchema>;
export type GenerateSecret = z.infer<typeof GenerateSecretSchema>;
export type CreateSecretBody = z.infer<typeof CreateSecretBodySchema>;
export type RotateSecretBody = z.infer<typeof RotateSecretBodySchema>;
export type RollbackSecretBody = z.infer<typeof RollbackSecretBodySchema>;
export type MoveSecretBody = z.infer<typeof MoveSecretBodySchema>;
export type UpdateSettingsBody = z.infer<typeof UpdateSettingsBodySchema>;
export type BatchCreateBody = z.infer<typeof BatchCreateBodySchema>;
export type BatchUpdateBody = z.infer<typeof BatchUpdateBodySchema>;
export type BatchDeleteBody = z.infer<typeof BatchDeleteBodySchema>;
export type BatchItemResult = z.infer<typeof BatchItemResultSchema>;
export type BatchItemReason = (typeof BATCH_ITEM_REASONS)[number];
export type BatchSummary = z.infer<typeof BatchSummarySchema>;
export type BatchResult = z.infer<typeof BatchResultSchema>;
export type RevealSecretsBatchBody = z.infer<typeof RevealSecretsBatchBodySchema>;
export type SecretSettings = z.infer<typeof SecretSettingsSchema>;
export type SecretVersionListItem = z.infer<typeof SecretVersionListItemSchema>;
export type LegacyImportInput = z.infer<typeof LegacyImportInputSchema>;
export type SetSecretRulesInput = z.infer<typeof SetSecretRulesInputSchema>;
/** Query parameters read by `GET /secrets`. */
export declare const ListSecretsQuerySchema: z.ZodObject<{
    podId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    podId?: string | undefined;
}, {
    podId?: string | undefined;
}>;
/** Query parameters read by `GET /secrets/:key`. */
export declare const RevealSecretQuerySchema: z.ZodObject<{
    version: z.ZodOptional<z.ZodNumber>;
    format: z.ZodOptional<z.ZodEnum<["utf-8", "base64"]>>;
}, "strip", z.ZodTypeAny, {
    format?: "base64" | "utf-8" | undefined;
    version?: number | undefined;}, {
    format?: "base64" | "utf-8" | undefined;
    version?: number | undefined;}>;
/** Query parameters read by `GET /secrets/:key/versions/:version`. */
export declare const RevealSecretVersionQuerySchema: z.ZodObject<{
    format: z.ZodOptional<z.ZodEnum<["utf-8", "base64"]>>;
}, "strip", z.ZodTypeAny, {
    format?: "base64" | "utf-8" | undefined;
}, {
    format?: "base64" | "utf-8" | undefined;
}>;
/** Response of `GET /secrets/export`. Values stay encrypted. */
export declare const SecretsExportResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        version: z.ZodLiteral<1>;
        exportedAt: z.ZodString;
        exportedBy: z.ZodString;
        organisationId: z.ZodString;
        workspaceId: z.ZodString;
        workspaceName: z.ZodString;
        environmentId: z.ZodString;
        environmentName: z.ZodString;
        secretCount: z.ZodNumber;
        secrets: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            encryptedValue: z.ZodString;
            iv: z.ZodString;
            version: z.ZodNumber;
            description: z.ZodNullable<z.ZodString>;
            metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>;
            podId: z.ZodNullable<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            createdAt: string;
            description: string | null;
            encryptedValue: string;
            iv: string;
            key: string;
            metadata: Record<string, string> | null;
            podId: string | null;
            updatedAt: string;
            version: number;}, {
            createdAt: string;
            description: string | null;
            encryptedValue: string;
            iv: string;
            key: string;
            metadata: Record<string, string> | null;
            podId: string | null;
            updatedAt: string;
            version: number;}>, "many">;
    }, "strip", z.ZodTypeAny, {
        environmentId: string;
        environmentName: string;
        exportedAt: string;
        exportedBy: string;
        organisationId: string;
        secretCount: number;
        secrets: {
            description: string | null;
            key: string;
            metadata: Record<string, string> | null;
            version: number;
            createdAt: string;
            updatedAt: string;
            podId: string | null;
            encryptedValue: string;
            iv: string;
        }[];
        version: 1;
        workspaceId: string;
        workspaceName: string;}, {
        environmentId: string;
        environmentName: string;
        exportedAt: string;
        exportedBy: string;
        organisationId: string;
        secretCount: number;
        secrets: {
            description: string | null;
            key: string;
            metadata: Record<string, string> | null;
            version: number;
            createdAt: string;
            updatedAt: string;
            podId: string | null;
            encryptedValue: string;
            iv: string;
        }[];
        version: 1;
        workspaceId: string;
        workspaceName: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        secrets: {
            description: string | null;
            key: string;
            metadata: Record<string, string> | null;
            version: number;
            createdAt: string;
            updatedAt: string;
            podId: string | null;
            encryptedValue: string;
            iv: string;
        }[];
        version: 1;
        organisationId: string;
        environmentId: string;
        workspaceName: string;
        secretCount: number;
        workspaceId: string;
        exportedAt: string;
        exportedBy: string;
        environmentName: string;
    };
}, {
    data: {
        secrets: {
            description: string | null;
            key: string;
            metadata: Record<string, string> | null;
            version: number;
            createdAt: string;
            updatedAt: string;
            podId: string | null;
            encryptedValue: string;
            iv: string;
        }[];
        version: 1;
        organisationId: string;
        environmentId: string;
        workspaceName: string;
        secretCount: number;
        workspaceId: string;
        exportedAt: string;
        exportedBy: string;
        environmentName: string;
    };
}>;
/** Response of `GET /secrets/:key/rules`. */
export declare const SecretRulesResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        key: z.ZodString;
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
        key: string;
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
        })[];}, {
        key: string;
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
        })[];}>;
}, "strip", z.ZodTypeAny, {
    data: {
        key: string;
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
    };
}, {
    data: {
        key: string;
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
    };
}>;
/** Response of `PUT /secrets/:key/rules`. */
export declare const SetSecretRulesResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        key: z.ZodString;
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
        rotationDisabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        key: string;
        rotationDisabled: boolean;
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
        })[];}, {
        key: string;
        rotationDisabled: boolean;
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
        })[];}>;
}, "strip", z.ZodTypeAny, {
    data: {
        key: string;
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
        rotationDisabled: boolean;
    };
}, {
    data: {
        key: string;
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
        rotationDisabled: boolean;
    };
}>;
/**
 * Job record an earlier API version stored when it queued a batch. The route
 * returns whatever was stored, so most fields depend on how far the job got.
 */
export declare const LegacyBatchJobSchema: z.ZodObject<{
    status: z.ZodEnum<["processing", "completed", "failed"]>;
    type: z.ZodOptional<z.ZodEnum<["create", "update", "delete"]>>;
    itemCount: z.ZodOptional<z.ZodNumber>;
    encryptionErrors: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    preValidationErrors: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    results: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        status: z.ZodEnum<["created", "updated", "deleted", "skipped", "error"]>;
        version: z.ZodOptional<z.ZodNumber>;
        reason: z.ZodOptional<z.ZodEnum<["already_exists", "duplicate_in_request", "not_found", "locked", "validation_failed", "pod_not_found", "write_failed"]>>;
        error: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        error?: string | undefined;
        key: string;
        reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
        status: "created" | "deleted" | "updated" | "error" | "skipped";
        version?: number | undefined;}, {
        error?: string | undefined;
        key: string;
        reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
        status: "created" | "deleted" | "updated" | "error" | "skipped";
        version?: number | undefined;}>, "many">>>;
    summary: z.ZodOptional<z.ZodObject<{
        created: z.ZodNumber;
        updated: z.ZodNumber;
        deleted: z.ZodNumber;
        skipped: z.ZodNumber;
        errors: z.ZodNumber;
        total: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        created: number;
        deleted: number;
        errors: number;
        skipped: number;
        total: number;
        updated: number;}, {
        created: number;
        deleted: number;
        errors: number;
        skipped: number;
        total: number;
        updated: number;}>>;
    error: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    completedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    completedAt?: string | undefined;
    createdAt?: string | undefined;
    encryptionErrors?: unknown[] | undefined;
    error?: string | undefined;
    itemCount?: number | undefined;
    preValidationErrors?: unknown[] | undefined;
    results?: {
        key: string;
        status: "created" | "deleted" | "updated" | "error" | "skipped";
        error?: string | undefined;
        reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
        version?: number | undefined;
    }[] | null | undefined;
    status: "processing" | "completed" | "failed";
    summary?: {
        created: number;
        deleted: number;
        updated: number;
        skipped: number;
        total: number;
        errors: number;
    } | undefined;
    type?: "delete" | "create" | "update" | undefined;}, {
    completedAt?: string | undefined;
    createdAt?: string | undefined;
    encryptionErrors?: unknown[] | undefined;
    error?: string | undefined;
    itemCount?: number | undefined;
    preValidationErrors?: unknown[] | undefined;
    results?: {
        key: string;
        status: "created" | "deleted" | "updated" | "error" | "skipped";
        error?: string | undefined;
        reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
        version?: number | undefined;
    }[] | null | undefined;
    status: "processing" | "completed" | "failed";
    summary?: {
        created: number;
        deleted: number;
        updated: number;
        skipped: number;
        total: number;
        errors: number;
    } | undefined;
    type?: "delete" | "create" | "update" | undefined;}>;
export declare const LegacyBatchJobResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        status: z.ZodEnum<["processing", "completed", "failed"]>;
        type: z.ZodOptional<z.ZodEnum<["create", "update", "delete"]>>;
        itemCount: z.ZodOptional<z.ZodNumber>;
        encryptionErrors: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
        preValidationErrors: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
        results: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            status: z.ZodEnum<["created", "updated", "deleted", "skipped", "error"]>;
            version: z.ZodOptional<z.ZodNumber>;
            reason: z.ZodOptional<z.ZodEnum<["already_exists", "duplicate_in_request", "not_found", "locked", "validation_failed", "pod_not_found", "write_failed"]>>;
            error: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            error?: string | undefined;
            key: string;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            version?: number | undefined;}, {
            error?: string | undefined;
            key: string;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            version?: number | undefined;}>, "many">>>;
        summary: z.ZodOptional<z.ZodObject<{
            created: z.ZodNumber;
            updated: z.ZodNumber;
            deleted: z.ZodNumber;
            skipped: z.ZodNumber;
            errors: z.ZodNumber;
            total: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            created: number;
            deleted: number;
            errors: number;
            skipped: number;
            total: number;
            updated: number;}, {
            created: number;
            deleted: number;
            errors: number;
            skipped: number;
            total: number;
            updated: number;}>>;
        error: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodOptional<z.ZodString>;
        completedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        completedAt?: string | undefined;
        createdAt?: string | undefined;
        encryptionErrors?: unknown[] | undefined;
        error?: string | undefined;
        itemCount?: number | undefined;
        preValidationErrors?: unknown[] | undefined;
        results?: {
            key: string;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            error?: string | undefined;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            version?: number | undefined;
        }[] | null | undefined;
        status: "processing" | "completed" | "failed";
        summary?: {
            created: number;
            deleted: number;
            updated: number;
            skipped: number;
            total: number;
            errors: number;
        } | undefined;
        type?: "delete" | "create" | "update" | undefined;}, {
        completedAt?: string | undefined;
        createdAt?: string | undefined;
        encryptionErrors?: unknown[] | undefined;
        error?: string | undefined;
        itemCount?: number | undefined;
        preValidationErrors?: unknown[] | undefined;
        results?: {
            key: string;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            error?: string | undefined;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            version?: number | undefined;
        }[] | null | undefined;
        status: "processing" | "completed" | "failed";
        summary?: {
            created: number;
            deleted: number;
            updated: number;
            skipped: number;
            total: number;
            errors: number;
        } | undefined;
        type?: "delete" | "create" | "update" | undefined;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "processing" | "completed" | "failed";
        error?: string | undefined;
        type?: "delete" | "create" | "update" | undefined;
        createdAt?: string | undefined;
        completedAt?: string | undefined;
        summary?: {
            created: number;
            deleted: number;
            updated: number;
            skipped: number;
            total: number;
            errors: number;
        } | undefined;
        itemCount?: number | undefined;
        results?: {
            key: string;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            error?: string | undefined;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            version?: number | undefined;
        }[] | null | undefined;
        encryptionErrors?: unknown[] | undefined;
        preValidationErrors?: unknown[] | undefined;
    };
}, {
    data: {
        status: "processing" | "completed" | "failed";
        error?: string | undefined;
        type?: "delete" | "create" | "update" | undefined;
        createdAt?: string | undefined;
        completedAt?: string | undefined;
        summary?: {
            created: number;
            deleted: number;
            updated: number;
            skipped: number;
            total: number;
            errors: number;
        } | undefined;
        itemCount?: number | undefined;
        results?: {
            key: string;
            status: "created" | "deleted" | "updated" | "error" | "skipped";
            error?: string | undefined;
            reason?: "locked" | "already_exists" | "duplicate_in_request" | "not_found" | "validation_failed" | "pod_not_found" | "write_failed" | undefined;
            version?: number | undefined;
        }[] | null | undefined;
        encryptionErrors?: unknown[] | undefined;
        preValidationErrors?: unknown[] | undefined;
    };
}>;
//# sourceMappingURL=secrets.d.ts.map