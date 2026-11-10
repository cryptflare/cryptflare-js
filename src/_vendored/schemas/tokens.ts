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
    disabled: z.ZodNumber;
    createdBy: z.ZodString;
    expiresAt: z.ZodNullable<z.ZodString>;
    lastUsedAt: z.ZodNullable<z.ZodString>;
    ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    disabled: number;
    expiresAt: string | null;
    id: string;
    ipAllowlist: string[] | null;
    lastUsedAt: string | null;
    name: string;
    scopes: string[];
    tokenPrefix: string;}, {
    createdAt: string;
    createdBy: string;
    disabled: number;
    expiresAt: string | null;
    id: string;
    ipAllowlist: string[] | null;
    lastUsedAt: string | null;
    name: string;
    scopes: string[];
    tokenPrefix: string;}>;
/**
 * The token as `PATCH /tokens/:tokenId` returns it. Narrower than the list
 * item: the update handler does not return `createdBy` or `disabled`.
 */
export declare const UpdatedTokenSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    tokenPrefix: z.ZodString;
    scopes: z.ZodArray<z.ZodString, "many">;
    disabled: z.ZodNumber;
    createdBy: z.ZodString;
    expiresAt: z.ZodNullable<z.ZodString>;
    lastUsedAt: z.ZodNullable<z.ZodString>;
    ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
}, "disabled" | "createdBy">, "strip", z.ZodTypeAny, {
    createdAt: string;
    expiresAt: string | null;
    id: string;
    ipAllowlist: string[] | null;
    lastUsedAt: string | null;
    name: string;
    scopes: string[];
    tokenPrefix: string;}, {
    createdAt: string;
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
/**
 * The token as `POST /v1/tokens/claim` returns it. The redeem handler does
 * not return `ipAllowlist`.
 */
export declare const ClaimedTokenSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    token: z.ZodString;
    tokenPrefix: z.ZodString;
    scopes: z.ZodArray<z.ZodString, "many">;
    expiresAt: z.ZodNullable<z.ZodString>;
    ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
}, "ipAllowlist">, "strip", z.ZodTypeAny, {
    createdAt: string;
    expiresAt: string | null;
    id: string;
    name: string;
    scopes: string[];
    token: string;
    tokenPrefix: string;}, {
    createdAt: string;
    expiresAt: string | null;
    id: string;
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
        disabled: z.ZodNumber;
        createdBy: z.ZodString;
        expiresAt: z.ZodNullable<z.ZodString>;
        lastUsedAt: z.ZodNullable<z.ZodString>;
        ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        disabled: number;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        lastUsedAt: string | null;
        name: string;
        scopes: string[];
        tokenPrefix: string;}, {
        createdAt: string;
        createdBy: string;
        disabled: number;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        lastUsedAt: string | null;
        name: string;
        scopes: string[];
        tokenPrefix: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        disabled: number;
        name: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        expiresAt: string | null;
        scopes: string[];
        tokenPrefix: string;
        createdBy: string;
        lastUsedAt: string | null;
    }[];
}, {
    data: {
        disabled: number;
        name: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        expiresAt: string | null;
        scopes: string[];
        tokenPrefix: string;
        createdBy: string;
        lastUsedAt: string | null;
    }[];
}>;
export declare const TokenItemResponseSchema: z.ZodObject<{
    data: z.ZodObject<Omit<{
        id: z.ZodString;
        name: z.ZodString;
        tokenPrefix: z.ZodString;
        scopes: z.ZodArray<z.ZodString, "many">;
        disabled: z.ZodNumber;
        createdBy: z.ZodString;
        expiresAt: z.ZodNullable<z.ZodString>;
        lastUsedAt: z.ZodNullable<z.ZodString>;
        ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodString;
    }, "disabled" | "createdBy">, "strip", z.ZodTypeAny, {
        createdAt: string;
        expiresAt: string | null;
        id: string;
        ipAllowlist: string[] | null;
        lastUsedAt: string | null;
        name: string;
        scopes: string[];
        tokenPrefix: string;}, {
        createdAt: string;
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
        expiresAt: string | null;
        scopes: string[];
        tokenPrefix: string;
        lastUsedAt: string | null;
    };
}, {
    data: {
        name: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        expiresAt: string | null;
        scopes: string[];
        tokenPrefix: string;
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
        scopes: string[];
        tokenPrefix: string;
    };
}, {
    data: {
        name: string;
        token: string;
        id: string;
        ipAllowlist: string[] | null;
        createdAt: string;
        expiresAt: string | null;
        scopes: string[];
        tokenPrefix: string;
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
export type UpdatedToken = z.infer<typeof UpdatedTokenSchema>;
export type CreateTokenBody = z.infer<typeof CreateTokenBodySchema>;
export type CreatedToken = z.infer<typeof CreatedTokenSchema>;
export type ClaimedToken = z.infer<typeof ClaimedTokenSchema>;
export type UpdateTokenBody = z.infer<typeof UpdateTokenBodySchema>;
export type ToggleTokenBody = z.infer<typeof ToggleTokenBodySchema>;
export type CreateClaimLinkBody = z.infer<typeof CreateClaimLinkBodySchema>;
//# sourceMappingURL=tokens.d.ts.map