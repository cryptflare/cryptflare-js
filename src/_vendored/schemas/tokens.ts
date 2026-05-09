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
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    expiresAt: string | null;
    id: string;
    lastUsedAt: string | null;
    name: string;
    scopes: string[];
    tokenPrefix: string;}, {
    createdAt: string;
    createdBy: string;
    expiresAt: string | null;
    id: string;
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
}, "strip", z.ZodTypeAny, {
    environment: "test" | "live";
    expiresAt?: string | undefined;
    name: string;
    scopes: string[];
    workspaceId: string;}, {
    environment: "test" | "live";
    expiresAt?: string | undefined;
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
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
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
export type TokenItem = z.infer<typeof TokenItemSchema>;
export type CreateTokenBody = z.infer<typeof CreateTokenBodySchema>;
export type CreatedToken = z.infer<typeof CreatedTokenSchema>;
//# sourceMappingURL=tokens.d.ts.map