/**
 * Zod schemas for the Service Tokens API.
 * Move-only extraction from `apps/api/src/routes/service-tokens/index.ts`.
 */
import { z } from 'zod';
export declare const ServiceTokenItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    tokenPrefix: z.ZodString;
    scopes: z.ZodArray<z.ZodString, "many">;
    ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    disabled: z.ZodNumber;
    expiresAt: z.ZodNullable<z.ZodString>;
    lastUsedAt: z.ZodNullable<z.ZodString>;
    lastUsedIp: z.ZodNullable<z.ZodString>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    description: string | null;
    disabled: number;
    expiresAt: string | null;
    id: string;
    ipAllowlist: string[] | null;
    lastUsedAt: string | null;
    lastUsedIp: string | null;
    name: string;
    scopes: string[];
    tokenPrefix: string;}, {
    createdAt: string;
    createdBy: string;
    description: string | null;
    disabled: number;
    expiresAt: string | null;
    id: string;
    ipAllowlist: string[] | null;
    lastUsedAt: string | null;
    lastUsedIp: string | null;
    name: string;
    scopes: string[];
    tokenPrefix: string;}>;
export declare const CreateServiceTokenBodySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    scopes: z.ZodArray<z.ZodString, "many">;
    ipAllowlist: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    expiresAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    expiresAt?: string | undefined;
    ipAllowlist?: string[] | undefined;
    name: string;
    scopes: string[];}, {
    description?: string | undefined;
    expiresAt?: string | undefined;
    ipAllowlist?: string[] | undefined;
    name: string;
    scopes: string[];}>;
export declare const CreatedServiceTokenSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    token: z.ZodString;
    tokenPrefix: z.ZodString;
    scopes: z.ZodArray<z.ZodString, "many">;
    ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    expiresAt: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    description: string | null;
    expiresAt: string | null;
    id: string;
    ipAllowlist: string[] | null;
    name: string;
    scopes: string[];
    token: string;
    tokenPrefix: string;}, {
    createdAt: string;
    description: string | null;
    expiresAt: string | null;
    id: string;
    ipAllowlist: string[] | null;
    name: string;
    scopes: string[];
    token: string;
    tokenPrefix: string;}>;
export declare const UpdateServiceTokenBodySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    scopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ipAllowlist: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    description?: string | null | undefined;
    ipAllowlist?: string[] | null | undefined;
    name?: string | undefined;
    scopes?: string[] | undefined;}, {
    description?: string | null | undefined;
    ipAllowlist?: string[] | null | undefined;
    name?: string | undefined;
    scopes?: string[] | undefined;}>;
export declare const ToggleServiceTokenInputSchema: z.ZodObject<{
    disabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    disabled: boolean;
}, {
    disabled: boolean;
}>;
export declare const ServiceTokenListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        tokenPrefix: z.ZodString;
        scopes: z.ZodArray<z.ZodString, "many">;
        ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        disabled: z.ZodNumber;
        expiresAt: z.ZodNullable<z.ZodString>;
        lastUsedAt: z.ZodNullable<z.ZodString>;
        lastUsedIp: z.ZodNullable<z.ZodString>;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        description: string | null;
        disabled: number;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        lastUsedAt: string | null;
        lastUsedIp: string | null;
        name: string;
        scopes: string[];
        tokenPrefix: string;}, {
        createdAt: string;
        createdBy: string;
        description: string | null;
        disabled: number;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        lastUsedAt: string | null;
        lastUsedIp: string | null;
        name: string;
        scopes: string[];
        tokenPrefix: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        disabled: number;
        description: string | null;
        name: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        tokenPrefix: string;
        scopes: string[];
        lastUsedAt: string | null;
        lastUsedIp: string | null;
    }[];
}, {
    data: {
        disabled: number;
        description: string | null;
        name: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        tokenPrefix: string;
        scopes: string[];
        lastUsedAt: string | null;
        lastUsedIp: string | null;
    }[];
}>;
export declare const ServiceTokenItemResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        tokenPrefix: z.ZodString;
        scopes: z.ZodArray<z.ZodString, "many">;
        ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        disabled: z.ZodNumber;
        expiresAt: z.ZodNullable<z.ZodString>;
        lastUsedAt: z.ZodNullable<z.ZodString>;
        lastUsedIp: z.ZodNullable<z.ZodString>;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        description: string | null;
        disabled: number;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        lastUsedAt: string | null;
        lastUsedIp: string | null;
        name: string;
        scopes: string[];
        tokenPrefix: string;}, {
        createdAt: string;
        createdBy: string;
        description: string | null;
        disabled: number;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        lastUsedAt: string | null;
        lastUsedIp: string | null;
        name: string;
        scopes: string[];
        tokenPrefix: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        disabled: number;
        description: string | null;
        name: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        tokenPrefix: string;
        scopes: string[];
        lastUsedAt: string | null;
        lastUsedIp: string | null;
    };
}, {
    data: {
        disabled: number;
        description: string | null;
        name: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        tokenPrefix: string;
        scopes: string[];
        lastUsedAt: string | null;
        lastUsedIp: string | null;
    };
}>;
export declare const CreatedServiceTokenResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        token: z.ZodString;
        tokenPrefix: z.ZodString;
        scopes: z.ZodArray<z.ZodString, "many">;
        ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        expiresAt: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        description: string | null;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        name: string;
        scopes: string[];
        token: string;
        tokenPrefix: string;}, {
        createdAt: string;
        description: string | null;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        name: string;
        scopes: string[];
        token: string;
        tokenPrefix: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        description: string | null;
        name: string;
        token: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        expiresAt: string | null;
        tokenPrefix: string;
        scopes: string[];
    };
}, {
    data: {
        description: string | null;
        name: string;
        token: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        expiresAt: string | null;
        tokenPrefix: string;
        scopes: string[];
    };
}>;
export declare const ServiceTokenSuccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export type ServiceTokenItem = z.infer<typeof ServiceTokenItemSchema>;
export type CreateServiceTokenBody = z.infer<typeof CreateServiceTokenBodySchema>;
export type CreatedServiceToken = z.infer<typeof CreatedServiceTokenSchema>;
export type UpdateServiceTokenBody = z.infer<typeof UpdateServiceTokenBodySchema>;
export type ToggleServiceTokenInput = z.infer<typeof ToggleServiceTokenInputSchema>;
//# sourceMappingURL=service-tokens.d.ts.map