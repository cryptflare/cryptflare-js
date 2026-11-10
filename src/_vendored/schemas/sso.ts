/**
 * Zod schemas for SSO connection management.
 * Move-only extraction from `apps/api/src/routes/sso/oidc.ts`.
 */
import { z } from 'zod';
export declare const SsoToggleBodySchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled: boolean;
}>;
export declare const SsoCheckQuerySchema: z.ZodObject<{
    domain: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    domain?: string | undefined;
}, {
    domain?: string | undefined;
}>;
/** Response of `GET /auth/sso/check`. */
export declare const SsoCheckResponseSchema: z.ZodObject<{
    forceSso: z.ZodBoolean;
    orgSlug: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    forceSso: boolean;
    orgSlug?: string | undefined;}, {
    forceSso: boolean;
    orgSlug?: string | undefined;}>;
export declare const SsoInitiateQuerySchema: z.ZodObject<{
    org: z.ZodOptional<z.ZodString>;
    domain: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    domain?: string | undefined;
    org?: string | undefined;}, {
    domain?: string | undefined;
    org?: string | undefined;}>;
export declare const SsoOidcCallbackQuerySchema: z.ZodObject<{
    code: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    error: z.ZodOptional<z.ZodString>;
    error_description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code?: string | undefined;
    error?: string | undefined;
    error_description?: string | undefined;
    state?: string | undefined;}, {
    code?: string | undefined;
    error?: string | undefined;
    error_description?: string | undefined;
    state?: string | undefined;}>;
export declare const SsoConnectionSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    name: z.ZodString;
    provider: z.ZodEnum<["entra_id", "google", "okta", "auth0", "oidc", "saml"]>;
    config: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    allowed_domains: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    default_role: z.ZodEnum<[string, ...string[]]>;
    force_sso: z.ZodNumber;
    enabled: z.ZodNumber;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    allowed_domains: string[] | null;
    config: Record<string, unknown>;
    created_at: string;
    default_role: string;
    enabled: number;
    force_sso: number;
    id: string;
    name: string;
    organisation_id: string;
    provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
    updated_at: string;}, {
    allowed_domains: string[] | null;
    config: Record<string, unknown>;
    created_at: string;
    default_role: string;
    enabled: number;
    force_sso: number;
    id: string;
    name: string;
    organisation_id: string;
    provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
    updated_at: string;}>;
export declare const SsoConnectionListResponseSchema: z.ZodObject<{
    connections: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        provider: z.ZodEnum<["entra_id", "google", "okta", "auth0", "oidc", "saml"]>;
        config: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        allowed_domains: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        default_role: z.ZodEnum<[string, ...string[]]>;
        force_sso: z.ZodNumber;
        enabled: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        allowed_domains: string[] | null;
        config: Record<string, unknown>;
        created_at: string;
        default_role: string;
        enabled: number;
        force_sso: number;
        id: string;
        name: string;
        organisation_id: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        updated_at: string;}, {
        allowed_domains: string[] | null;
        config: Record<string, unknown>;
        created_at: string;
        default_role: string;
        enabled: number;
        force_sso: number;
        id: string;
        name: string;
        organisation_id: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        updated_at: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    connections: {
        enabled: number;
        config: Record<string, unknown>;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        updated_at: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        allowed_domains: string[] | null;
        default_role: string;
        force_sso: number;
    }[];
}, {
    connections: {
        enabled: number;
        config: Record<string, unknown>;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        updated_at: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        allowed_domains: string[] | null;
        default_role: string;
        force_sso: number;
    }[];
}>;
export declare const SsoConnectionResponseSchema: z.ZodObject<{
    connection: z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        provider: z.ZodEnum<["entra_id", "google", "okta", "auth0", "oidc", "saml"]>;
        config: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        allowed_domains: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        default_role: z.ZodEnum<[string, ...string[]]>;
        force_sso: z.ZodNumber;
        enabled: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        allowed_domains: string[] | null;
        config: Record<string, unknown>;
        created_at: string;
        default_role: string;
        enabled: number;
        force_sso: number;
        id: string;
        name: string;
        organisation_id: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        updated_at: string;}, {
        allowed_domains: string[] | null;
        config: Record<string, unknown>;
        created_at: string;
        default_role: string;
        enabled: number;
        force_sso: number;
        id: string;
        name: string;
        organisation_id: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        updated_at: string;}>;
}, "strip", z.ZodTypeAny, {
    connection: {
        enabled: number;
        config: Record<string, unknown>;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        updated_at: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        allowed_domains: string[] | null;
        default_role: string;
        force_sso: number;
    };
}, {
    connection: {
        enabled: number;
        config: Record<string, unknown>;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        updated_at: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        allowed_domains: string[] | null;
        default_role: string;
        force_sso: number;
    };
}>;
export declare const SsoConnectionToggleResponseSchema: z.ZodObject<{
    connection: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        provider: z.ZodEnum<["entra_id", "google", "okta", "auth0", "oidc", "saml"]>;
        config: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        allowed_domains: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        default_role: z.ZodEnum<[string, ...string[]]>;
        force_sso: z.ZodNumber;
        enabled: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        allowed_domains: string[] | null;
        config: Record<string, unknown>;
        created_at: string;
        default_role: string;
        enabled: number;
        force_sso: number;
        id: string;
        name: string;
        organisation_id: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        updated_at: string;}, {
        allowed_domains: string[] | null;
        config: Record<string, unknown>;
        created_at: string;
        default_role: string;
        enabled: number;
        force_sso: number;
        id: string;
        name: string;
        organisation_id: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        updated_at: string;}>>;
}, "strip", z.ZodTypeAny, {
    connection: {
        enabled: number;
        config: Record<string, unknown>;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        updated_at: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        allowed_domains: string[] | null;
        default_role: string;
        force_sso: number;
    } | null;
}, {
    connection: {
        enabled: number;
        config: Record<string, unknown>;
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        updated_at: string;
        provider: "entra_id" | "google" | "okta" | "auth0" | "oidc" | "saml";
        allowed_domains: string[] | null;
        default_role: string;
        force_sso: number;
    } | null;
}>;
export declare const SsoSuccessResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<true>;
}, "strip", z.ZodTypeAny, {
    success: true;
}, {
    success: true;
}>;
export declare const SsoTestResponseSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    issuer: z.ZodOptional<z.ZodString>;
    authorizationEndpoint: z.ZodOptional<z.ZodString>;
    tokenEndpoint: z.ZodOptional<z.ZodString>;
    error: z.ZodOptional<z.ZodString>;
    details: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
}, "strip", z.ZodTypeAny, {
    authorizationEndpoint?: string | undefined;
    details?: Record<string, unknown>[] | undefined;
    error?: string | undefined;
    issuer?: string | undefined;
    tokenEndpoint?: string | undefined;
    valid: boolean;}, {
    authorizationEndpoint?: string | undefined;
    details?: Record<string, unknown>[] | undefined;
    error?: string | undefined;
    issuer?: string | undefined;
    tokenEndpoint?: string | undefined;
    valid: boolean;}>;
export declare const SsoGroupMappingSchema: z.ZodObject<{
    id: z.ZodString;
    connection_id: z.ZodString;
    external_group_id: z.ZodString;
    external_group_name: z.ZodNullable<z.ZodString>;
    role: z.ZodEnum<[string, ...string[]]>;
    priority: z.ZodNumber;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    connection_id: string;
    created_at: string;
    external_group_id: string;
    external_group_name: string | null;
    id: string;
    priority: number;
    role: string;}, {
    connection_id: string;
    created_at: string;
    external_group_id: string;
    external_group_name: string | null;
    id: string;
    priority: number;
    role: string;}>;
export declare const SsoGroupMappingListResponseSchema: z.ZodObject<{
    mappings: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        connection_id: z.ZodString;
        external_group_id: z.ZodString;
        external_group_name: z.ZodNullable<z.ZodString>;
        role: z.ZodEnum<[string, ...string[]]>;
        priority: z.ZodNumber;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        connection_id: string;
        created_at: string;
        external_group_id: string;
        external_group_name: string | null;
        id: string;
        priority: number;
        role: string;}, {
        connection_id: string;
        created_at: string;
        external_group_id: string;
        external_group_name: string | null;
        id: string;
        priority: number;
        role: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    mappings: {
        priority: number;
        role: string;
        id: string;
        created_at: string;
        connection_id: string;
        external_group_id: string;
        external_group_name: string | null;
    }[];
}, {
    mappings: {
        priority: number;
        role: string;
        id: string;
        created_at: string;
        connection_id: string;
        external_group_id: string;
        external_group_name: string | null;
    }[];
}>;
export declare const SsoGroupMappingResponseSchema: z.ZodObject<{
    mapping: z.ZodObject<{
        id: z.ZodString;
        connection_id: z.ZodString;
        external_group_id: z.ZodString;
        external_group_name: z.ZodNullable<z.ZodString>;
        role: z.ZodEnum<[string, ...string[]]>;
        priority: z.ZodNumber;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        connection_id: string;
        created_at: string;
        external_group_id: string;
        external_group_name: string | null;
        id: string;
        priority: number;
        role: string;}, {
        connection_id: string;
        created_at: string;
        external_group_id: string;
        external_group_name: string | null;
        id: string;
        priority: number;
        role: string;}>;
}, "strip", z.ZodTypeAny, {
    mapping: {
        priority: number;
        role: string;
        id: string;
        created_at: string;
        connection_id: string;
        external_group_id: string;
        external_group_name: string | null;
    };
}, {
    mapping: {
        priority: number;
        role: string;
        id: string;
        created_at: string;
        connection_id: string;
        external_group_id: string;
        external_group_name: string | null;
    };
}>;
export type SsoToggleBody = z.infer<typeof SsoToggleBodySchema>;
//# sourceMappingURL=sso.d.ts.map