/**
 * Zod schemas for the Dynamic Secrets API.
 * Move-only extraction from `apps/api/src/routes/dynamic-secrets/index.ts`.
 */
import { z } from 'zod';
export declare const CreateConfigBodySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    provider: z.ZodEnum<[string, ...string[]]>;
    providerConfig: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    rootCredentials: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    defaultTtlSeconds: z.ZodNumber;
    maxTtlSeconds: z.ZodNumber;
    systemMaxTtlSeconds: z.ZodNumber;
    maxConcurrentLeases: z.ZodNumber;
    maxLeasesPerIdentity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    defaultTtlSeconds: number;
    description?: string | undefined;
    maxConcurrentLeases: number;
    maxLeasesPerIdentity: number;
    maxTtlSeconds: number;
    name: string;
    provider: string;
    providerConfig: Record<string, unknown>;
    rootCredentials: Record<string, unknown>;
    systemMaxTtlSeconds: number;}, {
    defaultTtlSeconds: number;
    description?: string | undefined;
    maxConcurrentLeases: number;
    maxLeasesPerIdentity: number;
    maxTtlSeconds: number;
    name: string;
    provider: string;
    providerConfig: Record<string, unknown>;
    rootCredentials: Record<string, unknown>;
    systemMaxTtlSeconds: number;}>;
export declare const UpdateConfigBodySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    providerConfig: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    rootCredentials: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    defaultTtlSeconds: z.ZodOptional<z.ZodNumber>;
    maxTtlSeconds: z.ZodOptional<z.ZodNumber>;
    systemMaxTtlSeconds: z.ZodOptional<z.ZodNumber>;
    maxConcurrentLeases: z.ZodOptional<z.ZodNumber>;
    maxLeasesPerIdentity: z.ZodOptional<z.ZodNumber>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    defaultTtlSeconds?: number | undefined;
    description?: string | null | undefined;
    enabled?: boolean | undefined;
    maxConcurrentLeases?: number | undefined;
    maxLeasesPerIdentity?: number | undefined;
    maxTtlSeconds?: number | undefined;
    name?: string | undefined;
    providerConfig?: Record<string, unknown> | undefined;
    rootCredentials?: Record<string, unknown> | undefined;
    systemMaxTtlSeconds?: number | undefined;}, {
    defaultTtlSeconds?: number | undefined;
    description?: string | null | undefined;
    enabled?: boolean | undefined;
    maxConcurrentLeases?: number | undefined;
    maxLeasesPerIdentity?: number | undefined;
    maxTtlSeconds?: number | undefined;
    name?: string | undefined;
    providerConfig?: Record<string, unknown> | undefined;
    rootCredentials?: Record<string, unknown> | undefined;
    systemMaxTtlSeconds?: number | undefined;}>;
export declare const IssueLeaseBodySchema: z.ZodObject<{
    ttl: z.ZodOptional<z.ZodNumber>;
    wrap: z.ZodOptional<z.ZodObject<{
        ttl: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        ttl?: number | undefined;
    }, {
        ttl?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    ttl?: number | undefined;
    wrap?: {
        ttl?: number | undefined;
    } | undefined;}, {
    ttl?: number | undefined;
    wrap?: {
        ttl?: number | undefined;
    } | undefined;}>;
export declare const RenewLeaseBodySchema: z.ZodObject<{
    increment: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    increment?: number | undefined;
}, {
    increment?: number | undefined;
}>;
export declare const ListLeasesQuerySchema: z.ZodObject<{
    configId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["pending", "active", "expired", "revoked", "irrevocable"]>>;
    limit: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    configId?: string | undefined;
    limit?: string | undefined;
    status?: "revoked" | "pending" | "active" | "expired" | "irrevocable" | undefined;}, {
    configId?: string | undefined;
    limit?: string | undefined;
    status?: "revoked" | "pending" | "active" | "expired" | "irrevocable" | undefined;}>;
export declare const DynamicAnalyticsQuerySchema: z.ZodObject<{
    days: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    days?: string | undefined;
}, {
    days?: string | undefined;
}>;
export declare const DynamicConfigSchema: z.ZodObject<{
    id: z.ZodString;
    organisationId: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    provider: z.ZodEnum<["azure_sp", "aws_iam", "destroy_network", "mock"]>;
    providerConfig: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    defaultTtlSeconds: z.ZodNumber;
    maxTtlSeconds: z.ZodNumber;
    systemMaxTtlSeconds: z.ZodNumber;
    maxConcurrentLeases: z.ZodNumber;
    maxLeasesPerIdentity: z.ZodNumber;
    enabled: z.ZodNumber;
    useByok: z.ZodNumber;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    defaultTtlSeconds: number;
    description: string | null;
    enabled: number;
    id: string;
    maxConcurrentLeases: number;
    maxLeasesPerIdentity: number;
    maxTtlSeconds: number;
    name: string;
    organisationId: string;
    provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
    providerConfig: Record<string, unknown>;
    systemMaxTtlSeconds: number;
    updatedAt: string;
    useByok: number;}, {
    createdAt: string;
    createdBy: string;
    defaultTtlSeconds: number;
    description: string | null;
    enabled: number;
    id: string;
    maxConcurrentLeases: number;
    maxLeasesPerIdentity: number;
    maxTtlSeconds: number;
    name: string;
    organisationId: string;
    provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
    providerConfig: Record<string, unknown>;
    systemMaxTtlSeconds: number;
    updatedAt: string;
    useByok: number;}>;
export declare const DynamicConfigListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisationId: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        provider: z.ZodEnum<["azure_sp", "aws_iam", "destroy_network", "mock"]>;
        providerConfig: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        defaultTtlSeconds: z.ZodNumber;
        maxTtlSeconds: z.ZodNumber;
        systemMaxTtlSeconds: z.ZodNumber;
        maxConcurrentLeases: z.ZodNumber;
        maxLeasesPerIdentity: z.ZodNumber;
        enabled: z.ZodNumber;
        useByok: z.ZodNumber;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        defaultTtlSeconds: number;
        description: string | null;
        enabled: number;
        id: string;
        maxConcurrentLeases: number;
        maxLeasesPerIdentity: number;
        maxTtlSeconds: number;
        name: string;
        organisationId: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        providerConfig: Record<string, unknown>;
        systemMaxTtlSeconds: number;
        updatedAt: string;
        useByok: number;}, {
        createdAt: string;
        createdBy: string;
        defaultTtlSeconds: number;
        description: string | null;
        enabled: number;
        id: string;
        maxConcurrentLeases: number;
        maxLeasesPerIdentity: number;
        maxTtlSeconds: number;
        name: string;
        organisationId: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        providerConfig: Record<string, unknown>;
        systemMaxTtlSeconds: number;
        updatedAt: string;
        useByok: number;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        enabled: number;
        description: string | null;
        name: string;
        id: string;
        createdAt: string;
        createdBy: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        providerConfig: Record<string, unknown>;
        defaultTtlSeconds: number;
        maxTtlSeconds: number;
        systemMaxTtlSeconds: number;
        maxConcurrentLeases: number;
        maxLeasesPerIdentity: number;
        organisationId: string;
        useByok: number;
        updatedAt: string;
    }[];
}, {
    data: {
        enabled: number;
        description: string | null;
        name: string;
        id: string;
        createdAt: string;
        createdBy: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        providerConfig: Record<string, unknown>;
        defaultTtlSeconds: number;
        maxTtlSeconds: number;
        systemMaxTtlSeconds: number;
        maxConcurrentLeases: number;
        maxLeasesPerIdentity: number;
        organisationId: string;
        useByok: number;
        updatedAt: string;
    }[];
}>;
export declare const DynamicConfigResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        organisationId: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        provider: z.ZodEnum<["azure_sp", "aws_iam", "destroy_network", "mock"]>;
        providerConfig: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        defaultTtlSeconds: z.ZodNumber;
        maxTtlSeconds: z.ZodNumber;
        systemMaxTtlSeconds: z.ZodNumber;
        maxConcurrentLeases: z.ZodNumber;
        maxLeasesPerIdentity: z.ZodNumber;
        enabled: z.ZodNumber;
        useByok: z.ZodNumber;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        defaultTtlSeconds: number;
        description: string | null;
        enabled: number;
        id: string;
        maxConcurrentLeases: number;
        maxLeasesPerIdentity: number;
        maxTtlSeconds: number;
        name: string;
        organisationId: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        providerConfig: Record<string, unknown>;
        systemMaxTtlSeconds: number;
        updatedAt: string;
        useByok: number;}, {
        createdAt: string;
        createdBy: string;
        defaultTtlSeconds: number;
        description: string | null;
        enabled: number;
        id: string;
        maxConcurrentLeases: number;
        maxLeasesPerIdentity: number;
        maxTtlSeconds: number;
        name: string;
        organisationId: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        providerConfig: Record<string, unknown>;
        systemMaxTtlSeconds: number;
        updatedAt: string;
        useByok: number;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        enabled: number;
        description: string | null;
        name: string;
        id: string;
        createdAt: string;
        createdBy: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        providerConfig: Record<string, unknown>;
        defaultTtlSeconds: number;
        maxTtlSeconds: number;
        systemMaxTtlSeconds: number;
        maxConcurrentLeases: number;
        maxLeasesPerIdentity: number;
        organisationId: string;
        useByok: number;
        updatedAt: string;
    };
}, {
    data: {
        enabled: number;
        description: string | null;
        name: string;
        id: string;
        createdAt: string;
        createdBy: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        providerConfig: Record<string, unknown>;
        defaultTtlSeconds: number;
        maxTtlSeconds: number;
        systemMaxTtlSeconds: number;
        maxConcurrentLeases: number;
        maxLeasesPerIdentity: number;
        organisationId: string;
        useByok: number;
        updatedAt: string;
    };
}>;
export declare const DynamicConfigCreatedResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        provider: z.ZodEnum<["azure_sp", "aws_iam", "destroy_network", "mock"]>;
        defaultTtlSeconds: z.ZodNumber;
        maxTtlSeconds: z.ZodNumber;
        systemMaxTtlSeconds: z.ZodNumber;
        enabled: z.ZodNumber;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        defaultTtlSeconds: number;
        enabled: number;
        id: string;
        maxTtlSeconds: number;
        name: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        systemMaxTtlSeconds: number;}, {
        createdAt: string;
        defaultTtlSeconds: number;
        enabled: number;
        id: string;
        maxTtlSeconds: number;
        name: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        systemMaxTtlSeconds: number;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        enabled: number;
        name: string;
        id: string;
        createdAt: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        defaultTtlSeconds: number;
        maxTtlSeconds: number;
        systemMaxTtlSeconds: number;
    };
}, {
    data: {
        enabled: number;
        name: string;
        id: string;
        createdAt: string;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        defaultTtlSeconds: number;
        maxTtlSeconds: number;
        systemMaxTtlSeconds: number;
    };
}>;
export declare const DynamicConfigUpdatedResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;}, {
        id: string;
        name: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        id: string;
    };
}, {
    data: {
        name: string;
        id: string;
    };
}>;
export declare const DynamicConfigValidationResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        valid: z.ZodBoolean;
        error: z.ZodNullable<z.ZodString>;
        checkedAt: z.ZodString;
        provider: z.ZodEnum<["azure_sp", "aws_iam", "destroy_network", "mock"]>;
    }, "strip", z.ZodTypeAny, {
        checkedAt: string;
        error: string | null;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        valid: boolean;}, {
        checkedAt: string;
        error: string | null;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        valid: boolean;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        error: string | null;
        valid: boolean;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        checkedAt: string;
    };
}, {
    data: {
        error: string | null;
        valid: boolean;
        provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
        checkedAt: string;
    };
}>;
export declare const DynamicLeaseSchema: z.ZodObject<{
    id: z.ZodString;
    configId: z.ZodString;
    parentTokenId: z.ZodString;
    parentTokenType: z.ZodEnum<["session", "service_token", "access_token"]>;
    issuedToUserId: z.ZodString;
    issuedAt: z.ZodString;
    expiresAt: z.ZodString;
    maxExpiresAt: z.ZodString;
    status: z.ZodEnum<["pending", "active", "expired", "revoked", "irrevocable"]>;
    revokedAt: z.ZodNullable<z.ZodString>;
    revokedBy: z.ZodNullable<z.ZodEnum<["expiry", "manual", "cascade", "orphan_sweep", "force"]>>;
}, "strip", z.ZodTypeAny, {
    configId: string;
    expiresAt: string;
    id: string;
    issuedAt: string;
    issuedToUserId: string;
    maxExpiresAt: string;
    parentTokenId: string;
    parentTokenType: "access_token" | "service_token" | "session";
    revokedAt: string | null;
    revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
    status: "revoked" | "pending" | "active" | "expired" | "irrevocable";}, {
    configId: string;
    expiresAt: string;
    id: string;
    issuedAt: string;
    issuedToUserId: string;
    maxExpiresAt: string;
    parentTokenId: string;
    parentTokenType: "access_token" | "service_token" | "session";
    revokedAt: string | null;
    revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
    status: "revoked" | "pending" | "active" | "expired" | "irrevocable";}>;
export declare const DynamicLeaseListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        configId: z.ZodString;
        parentTokenId: z.ZodString;
        parentTokenType: z.ZodEnum<["session", "service_token", "access_token"]>;
        issuedToUserId: z.ZodString;
        issuedAt: z.ZodString;
        expiresAt: z.ZodString;
        maxExpiresAt: z.ZodString;
        status: z.ZodEnum<["pending", "active", "expired", "revoked", "irrevocable"]>;
        revokedAt: z.ZodNullable<z.ZodString>;
        revokedBy: z.ZodNullable<z.ZodEnum<["expiry", "manual", "cascade", "orphan_sweep", "force"]>>;
    }, "strip", z.ZodTypeAny, {
        configId: string;
        expiresAt: string;
        id: string;
        issuedAt: string;
        issuedToUserId: string;
        maxExpiresAt: string;
        parentTokenId: string;
        parentTokenType: "access_token" | "service_token" | "session";
        revokedAt: string | null;
        revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
        status: "revoked" | "pending" | "active" | "expired" | "irrevocable";}, {
        configId: string;
        expiresAt: string;
        id: string;
        issuedAt: string;
        issuedToUserId: string;
        maxExpiresAt: string;
        parentTokenId: string;
        parentTokenType: "access_token" | "service_token" | "session";
        revokedAt: string | null;
        revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
        status: "revoked" | "pending" | "active" | "expired" | "irrevocable";}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "revoked" | "pending" | "active" | "expired" | "irrevocable";
        id: string;
        expiresAt: string;
        configId: string;
        parentTokenId: string;
        parentTokenType: "access_token" | "service_token" | "session";
        issuedToUserId: string;
        issuedAt: string;
        maxExpiresAt: string;
        revokedAt: string | null;
        revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
    }[];
}, {
    data: {
        status: "revoked" | "pending" | "active" | "expired" | "irrevocable";
        id: string;
        expiresAt: string;
        configId: string;
        parentTokenId: string;
        parentTokenType: "access_token" | "service_token" | "session";
        issuedToUserId: string;
        issuedAt: string;
        maxExpiresAt: string;
        revokedAt: string | null;
        revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
    }[];
}>;
export declare const DynamicLeaseRevokedResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<true>;
    alreadyRevoked: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    alreadyRevoked?: boolean | undefined;
    success: true;}, {
    alreadyRevoked?: boolean | undefined;
    success: true;}>;
export declare const DynamicLeaseForceRevokedResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<true>;
}, "strip", z.ZodTypeAny, {
    success: true;
}, {
    success: true;
}>;
export declare const DynamicLeaseRenewedResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        leaseId: z.ZodString;
        expiresAt: z.ZodString;
        maxExpiresAt: z.ZodString;
        ttlSeconds: z.ZodNumber;
        credentialsRotated: z.ZodBoolean;
        credentials: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        credentials: Record<string, string> | null;
        credentialsRotated: boolean;
        expiresAt: string;
        leaseId: string;
        maxExpiresAt: string;
        ttlSeconds: number;}, {
        credentials: Record<string, string> | null;
        credentialsRotated: boolean;
        expiresAt: string;
        leaseId: string;
        maxExpiresAt: string;
        ttlSeconds: number;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        credentials: Record<string, string> | null;
        expiresAt: string;
        maxExpiresAt: string;
        leaseId: string;
        ttlSeconds: number;
        credentialsRotated: boolean;
    };
}, {
    data: {
        credentials: Record<string, string> | null;
        expiresAt: string;
        maxExpiresAt: string;
        leaseId: string;
        ttlSeconds: number;
        credentialsRotated: boolean;
    };
}>;
export declare const DynamicUnwrapResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        leaseId: z.ZodString;
        issuedAt: z.ZodString;
        expiresAt: z.ZodString;
        credentials: z.ZodRecord<z.ZodString, z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        credentials: Record<string, string>;
        expiresAt: string;
        issuedAt: string;
        leaseId: string;}, {
        credentials: Record<string, string>;
        expiresAt: string;
        issuedAt: string;
        leaseId: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        credentials: Record<string, string>;
        expiresAt: string;
        issuedAt: string;
        leaseId: string;
    };
}, {
    data: {
        credentials: Record<string, string>;
        expiresAt: string;
        issuedAt: string;
        leaseId: string;
    };
}>;
export type CreateConfigBody = z.infer<typeof CreateConfigBodySchema>;
export type UpdateConfigBody = z.infer<typeof UpdateConfigBodySchema>;
export type IssueLeaseBody = z.infer<typeof IssueLeaseBodySchema>;
export type RenewLeaseBody = z.infer<typeof RenewLeaseBodySchema>;
export type ListLeasesQuery = z.infer<typeof ListLeasesQuerySchema>;
export type DynamicAnalyticsQuery = z.infer<typeof DynamicAnalyticsQuerySchema>;
/** Response of `POST /dynamic-secrets/configs/:configId/lease`. */
export declare const DynamicLeaseIssuedResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        leaseId: z.ZodString;
        issuedAt: z.ZodString;
        expiresAt: z.ZodString;
        maxExpiresAt: z.ZodString;
        ttlSeconds: z.ZodNumber;
        requestedTtl: z.ZodNullable<z.ZodNumber>;
        credentials: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        wrapped: z.ZodNullable<z.ZodObject<{
            token: z.ZodString;
            exchangeExpiresAt: z.ZodString;
            ttlSeconds: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            exchangeExpiresAt: string;
            token: string;
            ttlSeconds: number;}, {
            exchangeExpiresAt: string;
            token: string;
            ttlSeconds: number;}>>;
    }, "strip", z.ZodTypeAny, {
        credentials: Record<string, unknown> | null;
        expiresAt: string;
        issuedAt: string;
        leaseId: string;
        maxExpiresAt: string;
        requestedTtl: number | null;
        ttlSeconds: number;
        wrapped: {
            token: string;
            ttlSeconds: number;
            exchangeExpiresAt: string;
        } | null;}, {
        credentials: Record<string, unknown> | null;
        expiresAt: string;
        issuedAt: string;
        leaseId: string;
        maxExpiresAt: string;
        requestedTtl: number | null;
        ttlSeconds: number;
        wrapped: {
            token: string;
            ttlSeconds: number;
            exchangeExpiresAt: string;
        } | null;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        credentials: Record<string, unknown> | null;
        expiresAt: string;
        issuedAt: string;
        maxExpiresAt: string;
        leaseId: string;
        ttlSeconds: number;
        requestedTtl: number | null;
        wrapped: {
            token: string;
            ttlSeconds: number;
            exchangeExpiresAt: string;
        } | null;
    };
}, {
    data: {
        credentials: Record<string, unknown> | null;
        expiresAt: string;
        issuedAt: string;
        maxExpiresAt: string;
        leaseId: string;
        ttlSeconds: number;
        requestedTtl: number | null;
        wrapped: {
            token: string;
            ttlSeconds: number;
            exchangeExpiresAt: string;
        } | null;
    };
}>;
export declare const DynamicConfigDeletedResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<true>;
    drained: z.ZodObject<{
        considered: z.ZodNumber;
        revoked: z.ZodNumber;
        failed: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        considered: number;
        failed: number;
        revoked: number;}, {
        considered: number;
        failed: number;
        revoked: number;}>;
}, "strip", z.ZodTypeAny, {
    drained: {
        revoked: number;
        failed: number;
        considered: number;
    };
    success: true;}, {
    drained: {
        revoked: number;
        failed: number;
        considered: number;
    };
    success: true;}>;
export declare const DynamicLeaseDetailSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    config_id: z.ZodString;
    parent_token_id: z.ZodString;
    parent_token_type: z.ZodEnum<["session", "service_token", "access_token"]>;
    issued_to_user_id: z.ZodString;
    issued_at: z.ZodString;
    expires_at: z.ZodString;
    max_expires_at: z.ZodString;
    external_id: z.ZodString;
    external_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    status: z.ZodEnum<["pending", "active", "expired", "revoked", "irrevocable"]>;
    workflow_instance_id: z.ZodNullable<z.ZodString>;
    revocation_attempts: z.ZodNumber;
    revoked_at: z.ZodNullable<z.ZodString>;
    revoked_by: z.ZodNullable<z.ZodEnum<["expiry", "manual", "cascade", "orphan_sweep", "force"]>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    config_id: string;
    created_at: string;
    expires_at: string;
    external_id: string;
    external_metadata: Record<string, unknown>;
    id: string;
    issued_at: string;
    issued_to_user_id: string;
    max_expires_at: string;
    organisation_id: string;
    parent_token_id: string;
    parent_token_type: "access_token" | "service_token" | "session";
    revocation_attempts: number;
    revoked_at: string | null;
    revoked_by: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
    status: "revoked" | "pending" | "active" | "expired" | "irrevocable";
    updated_at: string;
    workflow_instance_id: string | null;}, {
    config_id: string;
    created_at: string;
    expires_at: string;
    external_id: string;
    external_metadata: Record<string, unknown>;
    id: string;
    issued_at: string;
    issued_to_user_id: string;
    max_expires_at: string;
    organisation_id: string;
    parent_token_id: string;
    parent_token_type: "access_token" | "service_token" | "session";
    revocation_attempts: number;
    revoked_at: string | null;
    revoked_by: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
    status: "revoked" | "pending" | "active" | "expired" | "irrevocable";
    updated_at: string;
    workflow_instance_id: string | null;}>;
export declare const DynamicLeaseAuditEntrySchema: z.ZodObject<{
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
} & {
    prev_hash: z.ZodNullable<z.ZodString>;
    entry_hash: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    action: string;
    actor_id: string;
    actor_role: string;
    created_at: string;
    entry_hash: string | null;
    id: string;
    ip_address: string | null;
    metadata: Record<string, unknown> | null;
    organisation_id: string;
    prev_hash: string | null;
    resource_id: string | null;
    resource_type: string;
    source: string | null;}, {
    action: string;
    actor_id: string;
    actor_role: string;
    created_at: string;
    entry_hash: string | null;
    id: string;
    ip_address: string | null;
    metadata: Record<string, unknown> | null;
    organisation_id: string;
    prev_hash: string | null;
    resource_id: string | null;
    resource_type: string;
    source: string | null;}>;
export declare const DynamicLeaseDetailResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        lease: z.ZodObject<{
            id: z.ZodString;
            organisation_id: z.ZodString;
            config_id: z.ZodString;
            parent_token_id: z.ZodString;
            parent_token_type: z.ZodEnum<["session", "service_token", "access_token"]>;
            issued_to_user_id: z.ZodString;
            issued_at: z.ZodString;
            expires_at: z.ZodString;
            max_expires_at: z.ZodString;
            external_id: z.ZodString;
            external_metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            status: z.ZodEnum<["pending", "active", "expired", "revoked", "irrevocable"]>;
            workflow_instance_id: z.ZodNullable<z.ZodString>;
            revocation_attempts: z.ZodNumber;
            revoked_at: z.ZodNullable<z.ZodString>;
            revoked_by: z.ZodNullable<z.ZodEnum<["expiry", "manual", "cascade", "orphan_sweep", "force"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            config_id: string;
            created_at: string;
            expires_at: string;
            external_id: string;
            external_metadata: Record<string, unknown>;
            id: string;
            issued_at: string;
            issued_to_user_id: string;
            max_expires_at: string;
            organisation_id: string;
            parent_token_id: string;
            parent_token_type: "access_token" | "service_token" | "session";
            revocation_attempts: number;
            revoked_at: string | null;
            revoked_by: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
            status: "revoked" | "pending" | "active" | "expired" | "irrevocable";
            updated_at: string;
            workflow_instance_id: string | null;}, {
            config_id: string;
            created_at: string;
            expires_at: string;
            external_id: string;
            external_metadata: Record<string, unknown>;
            id: string;
            issued_at: string;
            issued_to_user_id: string;
            max_expires_at: string;
            organisation_id: string;
            parent_token_id: string;
            parent_token_type: "access_token" | "service_token" | "session";
            revocation_attempts: number;
            revoked_at: string | null;
            revoked_by: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
            status: "revoked" | "pending" | "active" | "expired" | "irrevocable";
            updated_at: string;
            workflow_instance_id: string | null;}>;
        audit: z.ZodArray<z.ZodObject<{
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
        } & {
            prev_hash: z.ZodNullable<z.ZodString>;
            entry_hash: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            action: string;
            actor_id: string;
            actor_role: string;
            created_at: string;
            entry_hash: string | null;
            id: string;
            ip_address: string | null;
            metadata: Record<string, unknown> | null;
            organisation_id: string;
            prev_hash: string | null;
            resource_id: string | null;
            resource_type: string;
            source: string | null;}, {
            action: string;
            actor_id: string;
            actor_role: string;
            created_at: string;
            entry_hash: string | null;
            id: string;
            ip_address: string | null;
            metadata: Record<string, unknown> | null;
            organisation_id: string;
            prev_hash: string | null;
            resource_id: string | null;
            resource_type: string;
            source: string | null;}>, "many">;
    }, "strip", z.ZodTypeAny, {
        audit: {
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
            prev_hash: string | null;
            entry_hash: string | null;
        }[];
        lease: {
            status: "revoked" | "pending" | "active" | "expired" | "irrevocable";
            id: string;
            organisation_id: string;
            created_at: string;
            expires_at: string;
            revoked_at: string | null;
            updated_at: string;
            config_id: string;
            parent_token_id: string;
            parent_token_type: "access_token" | "service_token" | "session";
            issued_to_user_id: string;
            issued_at: string;
            max_expires_at: string;
            external_id: string;
            external_metadata: Record<string, unknown>;
            workflow_instance_id: string | null;
            revocation_attempts: number;
            revoked_by: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
        };}, {
        audit: {
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
            prev_hash: string | null;
            entry_hash: string | null;
        }[];
        lease: {
            status: "revoked" | "pending" | "active" | "expired" | "irrevocable";
            id: string;
            organisation_id: string;
            created_at: string;
            expires_at: string;
            revoked_at: string | null;
            updated_at: string;
            config_id: string;
            parent_token_id: string;
            parent_token_type: "access_token" | "service_token" | "session";
            issued_to_user_id: string;
            issued_at: string;
            max_expires_at: string;
            external_id: string;
            external_metadata: Record<string, unknown>;
            workflow_instance_id: string | null;
            revocation_attempts: number;
            revoked_by: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
        };}>;
}, "strip", z.ZodTypeAny, {
    data: {
        audit: {
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
            prev_hash: string | null;
            entry_hash: string | null;
        }[];
        lease: {
            status: "revoked" | "pending" | "active" | "expired" | "irrevocable";
            id: string;
            organisation_id: string;
            created_at: string;
            expires_at: string;
            revoked_at: string | null;
            updated_at: string;
            config_id: string;
            parent_token_id: string;
            parent_token_type: "access_token" | "service_token" | "session";
            issued_to_user_id: string;
            issued_at: string;
            max_expires_at: string;
            external_id: string;
            external_metadata: Record<string, unknown>;
            workflow_instance_id: string | null;
            revocation_attempts: number;
            revoked_by: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
        };
    };
}, {
    data: {
        audit: {
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
            prev_hash: string | null;
            entry_hash: string | null;
        }[];
        lease: {
            status: "revoked" | "pending" | "active" | "expired" | "irrevocable";
            id: string;
            organisation_id: string;
            created_at: string;
            expires_at: string;
            revoked_at: string | null;
            updated_at: string;
            config_id: string;
            parent_token_id: string;
            parent_token_type: "access_token" | "service_token" | "session";
            issued_to_user_id: string;
            issued_at: string;
            max_expires_at: string;
            external_id: string;
            external_metadata: Record<string, unknown>;
            workflow_instance_id: string | null;
            revocation_attempts: number;
            revoked_by: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force" | null;
        };
    };
}>;
export declare const DynamicAnalyticsResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        daysWindow: z.ZodNumber;
        issueSeries: z.ZodArray<z.ZodObject<{
            date: z.ZodString;
            count: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            count: number;
            date: string;}, {
            count: number;
            date: string;}>, "many">;
        revokeBreakdown: z.ZodArray<z.ZodObject<{
            revokedBy: z.ZodEnum<["expiry", "manual", "cascade", "orphan_sweep", "force"]>;
            count: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            count: number;
            revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force";}, {
            count: number;
            revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force";}>, "many">;
        activeByConfig: z.ZodArray<z.ZodObject<{
            configId: z.ZodString;
            configName: z.ZodString;
            count: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            configId: string;
            configName: string;
            count: number;}, {
            configId: string;
            configName: string;
            count: number;}>, "many">;
        providerUsage: z.ZodArray<z.ZodObject<{
            provider: z.ZodEnum<["azure_sp", "aws_iam", "destroy_network", "mock"]>;
            count: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            count: number;
            provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";}, {
            count: number;
            provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";}>, "many">;
        irrevocableCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        activeByConfig: {
            configId: string;
            count: number;
            configName: string;
        }[];
        daysWindow: number;
        irrevocableCount: number;
        issueSeries: {
            date: string;
            count: number;
        }[];
        providerUsage: {
            provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
            count: number;
        }[];
        revokeBreakdown: {
            revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force";
            count: number;
        }[];}, {
        activeByConfig: {
            configId: string;
            count: number;
            configName: string;
        }[];
        daysWindow: number;
        irrevocableCount: number;
        issueSeries: {
            date: string;
            count: number;
        }[];
        providerUsage: {
            provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
            count: number;
        }[];
        revokeBreakdown: {
            revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force";
            count: number;
        }[];}>;
}, "strip", z.ZodTypeAny, {
    data: {
        daysWindow: number;
        issueSeries: {
            date: string;
            count: number;
        }[];
        revokeBreakdown: {
            revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force";
            count: number;
        }[];
        activeByConfig: {
            configId: string;
            count: number;
            configName: string;
        }[];
        providerUsage: {
            provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
            count: number;
        }[];
        irrevocableCount: number;
    };
}, {
    data: {
        daysWindow: number;
        issueSeries: {
            date: string;
            count: number;
        }[];
        revokeBreakdown: {
            revokedBy: "expiry" | "manual" | "cascade" | "orphan_sweep" | "force";
            count: number;
        }[];
        activeByConfig: {
            configId: string;
            count: number;
            configName: string;
        }[];
        providerUsage: {
            provider: "azure_sp" | "aws_iam" | "destroy_network" | "mock";
            count: number;
        }[];
        irrevocableCount: number;
    };
}>;
export type DynamicLeaseDetailResponse = z.infer<typeof DynamicLeaseDetailResponseSchema>;
export type DynamicAnalyticsResponse = z.infer<typeof DynamicAnalyticsResponseSchema>;
//# sourceMappingURL=dynamic-secrets.d.ts.map