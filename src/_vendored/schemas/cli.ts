/**
 * Zod schemas for the CLI device-flow API.
 * Move-only extraction from `apps/api/src/routes/cli/index.ts`.
 */
import { z } from 'zod';
/**
 * Optional body of `POST /cli/device`. The CLI sends none. The MCP server
 * sends who is asking and where the user will be sent afterwards, so the
 * approval screen can show both before the user agrees.
 */
export declare const CliDeviceBodySchema: z.ZodObject<{
    client: z.ZodOptional<z.ZodEnum<["cli", "mcp"]>>;
    clientName: z.ZodOptional<z.ZodString>;
    redirectHost: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    client?: "cli" | "mcp" | undefined;
    clientName?: string | undefined;
    redirectHost?: string | undefined;}, {
    client?: "cli" | "mcp" | undefined;
    clientName?: string | undefined;
    redirectHost?: string | undefined;}>;
export declare const CliCheckResponseSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    reason: z.ZodOptional<z.ZodEnum<["expired", "already_used"]>>;
    approved: z.ZodOptional<z.ZodBoolean>;
    client: z.ZodOptional<z.ZodEnum<["cli", "mcp"]>>;
    clientName: z.ZodOptional<z.ZodString>;
    redirectHost: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    approved?: boolean | undefined;
    client?: "cli" | "mcp" | undefined;
    clientName?: string | undefined;
    reason?: "expired" | "already_used" | undefined;
    redirectHost?: string | undefined;
    valid: boolean;}, {
    approved?: boolean | undefined;
    client?: "cli" | "mcp" | undefined;
    clientName?: string | undefined;
    reason?: "expired" | "already_used" | undefined;
    redirectHost?: string | undefined;
    valid: boolean;}>;
export declare const CliDeviceResponseSchema: z.ZodObject<{
    deviceCode: z.ZodString;
    userCode: z.ZodString;
    verificationUrl: z.ZodString;
    expiresIn: z.ZodNumber;
    interval: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    deviceCode: string;
    expiresIn: number;
    interval: number;
    userCode: string;
    verificationUrl: string;}, {
    deviceCode: string;
    expiresIn: number;
    interval: number;
    userCode: string;
    verificationUrl: string;}>;
export declare const CliTokenBodySchema: z.ZodObject<{
    deviceCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    deviceCode: string;
}, {
    deviceCode: string;
}>;
export declare const CliTokenResponseSchema: z.ZodObject<{
    apiKey: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        name: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        id: string;
        name: string | null;}, {
        email: string;
        id: string;
        name: string | null;}>;
    org: z.ZodString;
}, "strip", z.ZodTypeAny, {
    apiKey: string;
    org: string;
    user: {
        name: string | null;
        email: string;
        id: string;
    };}, {
    apiKey: string;
    org: string;
    user: {
        name: string | null;
        email: string;
        id: string;
    };}>;
export declare const CliApproveBodySchema: z.ZodObject<{
    userCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userCode: string;
}, {
    userCode: string;
}>;
export declare const CliApproveResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export type CliDeviceBody = z.infer<typeof CliDeviceBodySchema>;
export type CliCheckResponse = z.infer<typeof CliCheckResponseSchema>;
export type CliDeviceResponse = z.infer<typeof CliDeviceResponseSchema>;
export type CliTokenBody = z.infer<typeof CliTokenBodySchema>;
export type CliTokenResponse = z.infer<typeof CliTokenResponseSchema>;
export type CliApproveBody = z.infer<typeof CliApproveBodySchema>;
export type CliApproveResponse = z.infer<typeof CliApproveResponseSchema>;
//# sourceMappingURL=cli.d.ts.map