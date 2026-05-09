/**
 * Billing types derived from the API billing schemas.
 * Zod schemas for validation live in the API route files (apps/api/src/routes/billing/index.ts).
 * These types are the shared contract between API responses and frontend consumers.
 */
export type SubscriptionUsage = {
    secrets: number;
    workspaces: number;
    environments: number;
    members: number;
    teams: number;
    globalPolicies: number;
    openTickets: number;
};
export type SubscriptionResponse = {
    plan: string;
    status: string;
    limits: Record<string, number>;
    features: Record<string, boolean>;
    usage: SubscriptionUsage;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
};
export type Invoice = {
    id: string;
    number: string | null;
    amountDue: number;
    amountPaid: number;
    currency: string;
    status: string | null;
    created: string;
    invoicePdf: string | null;
    hostedInvoiceUrl: string | null;
    periodStart: string;
    periodEnd: string;
    planName: string | null;
};
export type CancelResponse = {
    cancelAtPeriodEnd: boolean;
    currentPeriodEnd: string | null;
};
export type ChangePlanResponse = {
    url: string | null;
    upgraded?: boolean;
    downgraded?: boolean;
};
import { z } from 'zod';
export declare const CheckoutBodySchema: z.ZodObject<{
    plan: z.ZodEnum<["pro", "team"]>;
}, "strip", z.ZodTypeAny, {
    plan: "pro" | "team";
}, {
    plan: "pro" | "team";
}>;
export declare const ConfirmSessionBodySchema: z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>;
export declare const ConfirmSessionResponseSchema: z.ZodObject<{
    pending: z.ZodBoolean;
    plan: z.ZodString;
}, "strip", z.ZodTypeAny, {
    pending: boolean;
    plan: string;}, {
    pending: boolean;
    plan: string;}>;
export declare const CancelBodySchema: z.ZodObject<{
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reason?: string | undefined;
}, {
    reason?: string | undefined;
}>;
export declare const ChangePlanBodySchema: z.ZodObject<{
    plan: z.ZodEnum<["free", "pro", "team"]>;
}, "strip", z.ZodTypeAny, {
    plan: "free" | "pro" | "team";
}, {
    plan: "free" | "pro" | "team";
}>;
export declare const SubscriptionUsageSchema: z.ZodObject<{
    secrets: z.ZodNumber;
    workspaces: z.ZodNumber;
    environments: z.ZodNumber;
    members: z.ZodNumber;
    teams: z.ZodNumber;
    globalPolicies: z.ZodNumber;
    openTickets: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    environments: number;
    globalPolicies: number;
    members: number;
    openTickets: number;
    secrets: number;
    teams: number;
    workspaces: number;}, {
    environments: number;
    globalPolicies: number;
    members: number;
    openTickets: number;
    secrets: number;
    teams: number;
    workspaces: number;}>;
export declare const SubscriptionResponseSchema: z.ZodObject<{
    plan: z.ZodString;
    status: z.ZodString;
    limits: z.ZodRecord<z.ZodString, z.ZodNumber>;
    features: z.ZodRecord<z.ZodString, z.ZodBoolean>;
    usage: z.ZodObject<{
        secrets: z.ZodNumber;
        workspaces: z.ZodNumber;
        environments: z.ZodNumber;
        members: z.ZodNumber;
        teams: z.ZodNumber;
        globalPolicies: z.ZodNumber;
        openTickets: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        environments: number;
        globalPolicies: number;
        members: number;
        openTickets: number;
        secrets: number;
        teams: number;
        workspaces: number;}, {
        environments: number;
        globalPolicies: number;
        members: number;
        openTickets: number;
        secrets: number;
        teams: number;
        workspaces: number;}>;
    stripeCustomerId: z.ZodNullable<z.ZodString>;
    stripeSubscriptionId: z.ZodNullable<z.ZodString>;
    currentPeriodEnd: z.ZodNullable<z.ZodString>;
    cancelAtPeriodEnd: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    cancelAtPeriodEnd: boolean;
    currentPeriodEnd: string | null;
    features: Record<string, boolean>;
    limits: Record<string, number>;
    plan: string;
    status: string;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    usage: {
        secrets: number;
        workspaces: number;
        environments: number;
        members: number;
        teams: number;
        globalPolicies: number;
        openTickets: number;
    };}, {
    cancelAtPeriodEnd: boolean;
    currentPeriodEnd: string | null;
    features: Record<string, boolean>;
    limits: Record<string, number>;
    plan: string;
    status: string;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    usage: {
        secrets: number;
        workspaces: number;
        environments: number;
        members: number;
        teams: number;
        globalPolicies: number;
        openTickets: number;
    };}>;
export declare const UrlResponseSchema: z.ZodObject<{
    url: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url: string | null;
}, {
    url: string | null;
}>;
export declare const CancelResponseSchema: z.ZodObject<{
    cancelAtPeriodEnd: z.ZodBoolean;
    currentPeriodEnd: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    cancelAtPeriodEnd: boolean;
    currentPeriodEnd: string | null;}, {
    cancelAtPeriodEnd: boolean;
    currentPeriodEnd: string | null;}>;
export declare const ResubscribeResponseSchema: z.ZodObject<{
    cancelAtPeriodEnd: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    cancelAtPeriodEnd: boolean;
}, {
    cancelAtPeriodEnd: boolean;
}>;
export declare const InvoiceSchema: z.ZodObject<{
    id: z.ZodString;
    number: z.ZodNullable<z.ZodString>;
    amountDue: z.ZodNumber;
    amountPaid: z.ZodNumber;
    currency: z.ZodString;
    status: z.ZodNullable<z.ZodString>;
    created: z.ZodString;
    invoicePdf: z.ZodNullable<z.ZodString>;
    hostedInvoiceUrl: z.ZodNullable<z.ZodString>;
    periodStart: z.ZodString;
    periodEnd: z.ZodString;
    planName: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amountDue: number;
    amountPaid: number;
    created: string;
    currency: string;
    hostedInvoiceUrl: string | null;
    id: string;
    invoicePdf: string | null;
    number: string | null;
    periodEnd: string;
    periodStart: string;
    planName: string | null;
    status: string | null;}, {
    amountDue: number;
    amountPaid: number;
    created: string;
    currency: string;
    hostedInvoiceUrl: string | null;
    id: string;
    invoicePdf: string | null;
    number: string | null;
    periodEnd: string;
    periodStart: string;
    planName: string | null;
    status: string | null;}>;
export declare const InvoicesResponseSchema: z.ZodObject<{
    invoices: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        number: z.ZodNullable<z.ZodString>;
        amountDue: z.ZodNumber;
        amountPaid: z.ZodNumber;
        currency: z.ZodString;
        status: z.ZodNullable<z.ZodString>;
        created: z.ZodString;
        invoicePdf: z.ZodNullable<z.ZodString>;
        hostedInvoiceUrl: z.ZodNullable<z.ZodString>;
        periodStart: z.ZodString;
        periodEnd: z.ZodString;
        planName: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        amountDue: number;
        amountPaid: number;
        created: string;
        currency: string;
        hostedInvoiceUrl: string | null;
        id: string;
        invoicePdf: string | null;
        number: string | null;
        periodEnd: string;
        periodStart: string;
        planName: string | null;
        status: string | null;}, {
        amountDue: number;
        amountPaid: number;
        created: string;
        currency: string;
        hostedInvoiceUrl: string | null;
        id: string;
        invoicePdf: string | null;
        number: string | null;
        periodEnd: string;
        periodStart: string;
        planName: string | null;
        status: string | null;}>, "many">;
}, "strip", z.ZodTypeAny, {
    invoices: {
        number: string | null;
        created: string;
        status: string | null;
        id: string;
        amountDue: number;
        amountPaid: number;
        currency: string;
        invoicePdf: string | null;
        hostedInvoiceUrl: string | null;
        periodStart: string;
        periodEnd: string;
        planName: string | null;
    }[];
}, {
    invoices: {
        number: string | null;
        created: string;
        status: string | null;
        id: string;
        amountDue: number;
        amountPaid: number;
        currency: string;
        invoicePdf: string | null;
        hostedInvoiceUrl: string | null;
        periodStart: string;
        periodEnd: string;
        planName: string | null;
    }[];
}>;
export declare const ChangePlanResponseSchema: z.ZodObject<{
    url: z.ZodNullable<z.ZodString>;
    upgraded: z.ZodOptional<z.ZodBoolean>;
    downgraded: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    downgraded?: boolean | undefined;
    upgraded?: boolean | undefined;
    url: string | null;}, {
    downgraded?: boolean | undefined;
    upgraded?: boolean | undefined;
    url: string | null;}>;
export type CheckoutBody = z.infer<typeof CheckoutBodySchema>;
export type ConfirmSessionBody = z.infer<typeof ConfirmSessionBodySchema>;
export type ConfirmSessionResponse = z.infer<typeof ConfirmSessionResponseSchema>;
export type CancelBody = z.infer<typeof CancelBodySchema>;
export type ChangePlanBody = z.infer<typeof ChangePlanBodySchema>;
//# sourceMappingURL=billing.d.ts.map