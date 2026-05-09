/**
 * Zod schemas for the Authentication API.
 * Move-only extraction from `apps/api/src/routes/auth/index.ts`.
 */
import { z } from 'zod';
export declare const LoginBodySchema: z.ZodObject<{
    email: z.ZodString;
    turnstileToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    turnstileToken: string;}, {
    email: string;
    turnstileToken: string;}>;
export declare const LoginResponseSchema: z.ZodObject<{
    requestId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    requestId: string;
}, {
    requestId: string;
}>;
export declare const VerifyBodySchema: z.ZodObject<{
    requestId: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    requestId: string;}, {
    code: string;
    requestId: string;}>;
export declare const VerifyResponseSchema: z.ZodObject<{
    user: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        name: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        id: string;
        name: string | null;}, {
        email: string;
        id: string;
        name: string | null;}>>;
    isNewUser: z.ZodOptional<z.ZodBoolean>;
    requiresTotp: z.ZodOptional<z.ZodBoolean>;
    userId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isNewUser?: boolean | undefined;
    requiresTotp?: boolean | undefined;
    user?: {
        name: string | null;
        email: string;
        id: string;
    } | undefined;
    userId?: string | undefined;}, {
    isNewUser?: boolean | undefined;
    requiresTotp?: boolean | undefined;
    user?: {
        name: string | null;
        email: string;
        id: string;
    } | undefined;
    userId?: string | undefined;}>;
export declare const WhoamiResponseSchema: z.ZodObject<{
    tokenType: z.ZodEnum<["service", "access"]>;
    tokenId: z.ZodNullable<z.ZodString>;
    organisation: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        plan: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        plan: string;}, {
        id: string;
        name: string;
        plan: string;}>;
    userId: z.ZodNullable<z.ZodString>;
    permissions: z.ZodArray<z.ZodString, "many">;
    orgId: z.ZodString;
    tokenKind: z.ZodEnum<["service", "workspace", "session"]>;
    ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    ipAllowlist: string[] | null;
    orgId: string;
    organisation: {
        name: string;
        id: string;
        plan: string;
    };
    permissions: string[];
    tokenId: string | null;
    tokenKind: "workspace" | "session" | "service";
    tokenType: "access" | "service";
    userId: string | null;}, {
    ipAllowlist: string[] | null;
    orgId: string;
    organisation: {
        name: string;
        id: string;
        plan: string;
    };
    permissions: string[];
    tokenId: string | null;
    tokenKind: "workspace" | "session" | "service";
    tokenType: "access" | "service";
    userId: string | null;}>;
export declare const MeResponseSchema: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        name: z.ZodNullable<z.ZodString>;
        avatarUrl: z.ZodNullable<z.ZodString>;
        totpEnabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        avatarUrl: string | null;
        email: string;
        id: string;
        name: string | null;
        totpEnabled: boolean;}, {
        avatarUrl: string | null;
        email: string;
        id: string;
        name: string | null;
        totpEnabled: boolean;}>;
    organisations: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        role: z.ZodString;
        plan: z.ZodString;
        permissions: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        permissions: string[];
        plan: string;
        role: string;}, {
        id: string;
        name: string;
        permissions: string[];
        plan: string;
        role: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    organisations: {
        name: string;
        role: string;
        id: string;
        plan: string;
        permissions: string[];
    }[];
    user: {
        name: string | null;
        email: string;
        id: string;
        avatarUrl: string | null;
        totpEnabled: boolean;
    };}, {
    organisations: {
        name: string;
        role: string;
        id: string;
        plan: string;
        permissions: string[];
    }[];
    user: {
        name: string | null;
        email: string;
        id: string;
        avatarUrl: string | null;
        totpEnabled: boolean;
    };}>;
export declare const LogoutResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare const TotpSetupResponseSchema: z.ZodObject<{
    secret: z.ZodString;
    otpauthUri: z.ZodString;
}, "strip", z.ZodTypeAny, {
    otpauthUri: string;
    secret: string;}, {
    otpauthUri: string;
    secret: string;}>;
export declare const TotpCodeBodySchema: z.ZodObject<{
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
}, {
    code: string;
}>;
export declare const TotpVerifySetupResponseSchema: z.ZodObject<{
    recoveryCodes: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    recoveryCodes: string[];
}, {
    recoveryCodes: string[];
}>;
export declare const TotpDisableResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare const VerifyTotpBodySchema: z.ZodObject<{
    userId: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    userId: string;}, {
    code: string;
    userId: string;}>;
export type LoginBody = z.infer<typeof LoginBodySchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type VerifyBody = z.infer<typeof VerifyBodySchema>;
export type VerifyResponse = z.infer<typeof VerifyResponseSchema>;
export type WhoamiResponse = z.infer<typeof WhoamiResponseSchema>;
export type MeResponse = z.infer<typeof MeResponseSchema>;
export type TotpSetupResponse = z.infer<typeof TotpSetupResponseSchema>;
export type TotpCodeBody = z.infer<typeof TotpCodeBodySchema>;
export type TotpVerifySetupResponse = z.infer<typeof TotpVerifySetupResponseSchema>;
export type VerifyTotpBody = z.infer<typeof VerifyTotpBodySchema>;
//# sourceMappingURL=auth.d.ts.map