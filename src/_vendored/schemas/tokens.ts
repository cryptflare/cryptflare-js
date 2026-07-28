/**
 * Zod schemas for the Personal Access Tokens API.
 * Move-only extraction from `apps/api/src/routes/tokens/index.ts`.
 */
import { z } from 'zod';
export declare const TokenItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    tokenPrefix: z.ZodString;
    scopes: z.ZodArray<z.ZodString, "many">;
    createdBy: z.ZodString;
    expiresAt: z.ZodNullable<z.ZodString>;
    lastUsedAt: z.ZodNullable<z.ZodString>;
    ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    expiresAt: string | null;
    id: string;
    ipAllowlist: string[] | null;
    lastUsedAt: string | null;
    name: string;
    scopes: string[];
    tokenPrefix: string;}, {
    createdAt: string;
    createdBy: string;
    expiresAt: string | null;
    id: string;
    ipAllowlist: string[] | null;
    lastUsedAt: string | null;
    name: string;
    scopes: string[];
    tokenPrefix: string;}>;
export declare const CreateTokenBodySchema: z.ZodObject<{
    name: z.ZodString;
    workspaceId: z.ZodString;
    scopes: z.ZodArray<z.ZodString, "many">;
    environment: z.ZodEnum<["live", "test"]>;
    expiresAt: z.ZodOptional<z.ZodString>;
    ipAllowlist: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    environment: "test" | "live";
    expiresAt?: string | undefined;
    ipAllowlist?: string[] | undefined;
    name: string;
    scopes: string[];
    workspaceId: string;}, {
    environment: "test" | "live";
    expiresAt?: string | undefined;
    ipAllowlist?: string[] | undefined;
    name: string;
    scopes: string[];
    workspaceId: string;}>;
export declare const CreatedTokenSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    token: z.ZodString;
    tokenPrefix: z.ZodString;
    scopes: z.ZodArray<z.ZodString, "many">;
    expiresAt: z.ZodNullable<z.ZodString>;
    ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    expiresAt: string | null;
    id: string;
    ipAllowlist: string[] | null;
    name: string;
    scopes: string[];
    token: string;
    tokenPrefix: string;}, {
    createdAt: string;
    expiresAt: string | null;
    id: string;
    ipAllowlist: string[] | null;
    name: string;
    scopes: string[];
    token: string;
    tokenPrefix: string;}>;
export declare const UpdateTokenBodySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    scopes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ipAllowlist: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    ipAllowlist?: string[] | null | undefined;
    name?: string | undefined;
    scopes?: string[] | undefined;}, {
    ipAllowlist?: string[] | null | undefined;
    name?: string | undefined;
    scopes?: string[] | undefined;}>;
export declare const ToggleTokenBodySchema: z.ZodObject<{
    disabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    disabled: boolean;
}, {
    disabled: boolean;
}>;
export declare const CreateClaimLinkBodySchema: z.ZodObject<{
    name: z.ZodString;
    workspaceId: z.ZodString;
    scopes: z.ZodArray<z.ZodString, "many">;
    environment: z.ZodEnum<["live", "test"]>;
    expiresInMinutes: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    environment: "test" | "live";
    expiresInMinutes?: number | undefined;
    name: string;
    scopes: string[];
    workspaceId: string;}, {
    environment: "test" | "live";
    expiresInMinutes?: number | undefined;
    name: string;
    scopes: string[];
    workspaceId: string;}>;
export declare const TokenListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        tokenPrefix: z.ZodString;
        scopes: z.ZodArray<z.ZodString, "many">;
        createdBy: z.ZodString;
        expiresAt: z.ZodNullable<z.ZodString>;
        lastUsedAt: z.ZodNullable<z.ZodString>;
        ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        lastUsedAt: string | null;
        name: string;
        scopes: string[];
        tokenPrefix: string;}, {
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        lastUsedAt: string | null;
        name: string;
        scopes: string[];
        tokenPrefix: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        tokenPrefix: string;
        scopes: string[];
        lastUsedAt: string | null;
    }[];
}, {
    data: {
        name: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        tokenPrefix: string;
        scopes: string[];
        lastUsedAt: string | null;
    }[];
}>;
export declare const TokenItemResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        tokenPrefix: z.ZodString;
        scopes: z.ZodArray<z.ZodString, "many">;
        createdBy: z.ZodString;
        expiresAt: z.ZodNullable<z.ZodString>;
        lastUsedAt: z.ZodNullable<z.ZodString>;
        ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        lastUsedAt: string | null;
        name: string;
        scopes: string[];
        tokenPrefix: string;}, {
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        lastUsedAt: string | null;
        name: string;
        scopes: string[];
        tokenPrefix: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        tokenPrefix: string;
        scopes: string[];
        lastUsedAt: string | null;
    };
}, {
    data: {
        name: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        createdBy: string;
        expiresAt: string | null;
        tokenPrefix: string;
        scopes: string[];
        lastUsedAt: string | null;
    };
}>;
export declare const CreatedTokenResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        token: z.ZodString;
        tokenPrefix: z.ZodString;
        scopes: z.ZodArray<z.ZodString, "many">;
        expiresAt: z.ZodNullable<z.ZodString>;
        ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        name: string;
        scopes: string[];
        token: string;
        tokenPrefix: string;}, {
        createdAt: string;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        name: string;
        scopes: string[];
        token: string;
        tokenPrefix: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
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
export declare const TokenSuccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare const ClaimLinkResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        url: z.ZodString;
        expiresAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        expiresAt: string;
        id: string;
        url: string;}, {
        expiresAt: string;
        id: string;
        url: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        url: string;
        id: string;
        expiresAt: string;
    };
}, {
    data: {
        url: string;
        id: string;
        expiresAt: string;
    };
}>;
export type TokenItem = z.infer<typeof TokenItemSchema>;
export type CreateTokenBody = z.infer<typeof CreateTokenBodySchema>;
export type CreatedToken = z.infer<typeof CreatedTokenSchema>;
export type UpdateTokenBody = z.infer<typeof UpdateTokenBodySchema>;
export type ToggleTokenBody = z.infer<typeof ToggleTokenBodySchema>;
export type CreateClaimLinkBody = z.infer<typeof CreateClaimLinkBodySchema>;
//# sourceMappingURL=tokens.d.ts.map