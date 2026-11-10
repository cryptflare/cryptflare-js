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
export declare const PurchaseAddonInputSchema: z.ZodObject<{
    addonType: z.ZodEnum<[string, ...string[]]>;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    addonType: string;
    quantity: number;}, {
    addonType: string;
    quantity: number;}>;
export type PurchaseAddonInput = z.infer<typeof PurchaseAddonInputSchema>;
export type CheckoutBody = z.infer<typeof CheckoutBodySchema>;
export type ConfirmSessionBody = z.infer<typeof ConfirmSessionBodySchema>;
export type ConfirmSessionResponse = z.infer<typeof ConfirmSessionResponseSchema>;
export type CancelBody = z.infer<typeof CancelBodySchema>;
export type ChangePlanBody = z.infer<typeof ChangePlanBodySchema>;
/** Query parameters read by `GET /billing/upgrade-preview`. */
export declare const UpgradePreviewQuerySchema: z.ZodObject<{
    targetPlan: z.ZodEnum<["pro", "team"]>;
}, "strip", z.ZodTypeAny, {
    targetPlan: "pro" | "team";
}, {
    targetPlan: "pro" | "team";
}>;
/** Query parameters read by `GET /billing/downgrade-preview`. */
export declare const DowngradePreviewQuerySchema: z.ZodObject<{
    targetPlan: z.ZodEnum<["free", "pro", "team"]>;
}, "strip", z.ZodTypeAny, {
    targetPlan: "free" | "pro" | "team";
}, {
    targetPlan: "free" | "pro" | "team";
}>;
export declare const AddonItemSchema: z.ZodObject<{
    type: z.ZodString;
    name: z.ZodString;
    quantity: z.ZodNumber;
    unitSize: z.ZodNumber;
    price: z.ZodNumber;
    monthlyCost: z.ZodNumber;
    stripeItemId: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    monthlyCost: number;
    name: string;
    price: number;
    quantity: number;
    stripeItemId: string | null;
    type: string;
    unitSize: number;}, {
    monthlyCost: number;
    name: string;
    price: number;
    quantity: number;
    stripeItemId: string | null;
    type: string;
    unitSize: number;}>;
export declare const AddonListResponseSchema: z.ZodObject<{
    addons: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        name: z.ZodString;
        quantity: z.ZodNumber;
        unitSize: z.ZodNumber;
        price: z.ZodNumber;
        monthlyCost: z.ZodNumber;
        stripeItemId: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        monthlyCost: number;
        name: string;
        price: number;
        quantity: number;
        stripeItemId: string | null;
        type: string;
        unitSize: number;}, {
        monthlyCost: number;
        name: string;
        price: number;
        quantity: number;
        stripeItemId: string | null;
        type: string;
        unitSize: number;}>, "many">;
}, "strip", z.ZodTypeAny, {
    addons: {
        type: string;
        name: string;
        quantity: number;
        unitSize: number;
        price: number;
        monthlyCost: number;
        stripeItemId: string | null;
    }[];
}, {
    addons: {
        type: string;
        name: string;
        quantity: number;
        unitSize: number;
        price: number;
        monthlyCost: number;
        stripeItemId: string | null;
    }[];
}>;
export declare const PurchaseAddonResponseSchema: z.ZodObject<{
    addon: z.ZodObject<{
        type: z.ZodString;
        name: z.ZodString;
        quantity: z.ZodNumber;
        unitSize: z.ZodNumber;
        monthlyCost: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        monthlyCost: number;
        name: string;
        quantity: number;
        type: string;
        unitSize: number;}, {
        monthlyCost: number;
        name: string;
        quantity: number;
        type: string;
        unitSize: number;}>;
    effectiveLimits: z.ZodRecord<z.ZodString, z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    addon: {
        type: string;
        name: string;
        quantity: number;
        unitSize: number;
        monthlyCost: number;
    };
    effectiveLimits: Record<string, number>;}, {
    addon: {
        type: string;
        name: string;
        quantity: number;
        unitSize: number;
        monthlyCost: number;
    };
    effectiveLimits: Record<string, number>;}>;
export declare const RemoveAddonResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    effectiveLimits: z.ZodRecord<z.ZodString, z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    effectiveLimits: Record<string, number>;
    success: boolean;}, {
    effectiveLimits: Record<string, number>;
    success: boolean;}>;
export declare const TokenConsumptionSchema: z.ZodObject<{
    tokenId: z.ZodString;
    tokenName: z.ZodString;
    tokenPrefix: z.ZodString;
    tokenType: z.ZodEnum<["access_token", "service_token"]>;
    createdBy: z.ZodString;
    createdByName: z.ZodString;
    requestsToday: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    createdBy: string;
    createdByName: string;
    requestsToday: number;
    tokenId: string;
    tokenName: string;
    tokenPrefix: string;
    tokenType: "access_token" | "service_token";}, {
    createdBy: string;
    createdByName: string;
    requestsToday: number;
    tokenId: string;
    tokenName: string;
    tokenPrefix: string;
    tokenType: "access_token" | "service_token";}>;
export declare const ConsumptionResponseSchema: z.ZodObject<{
    orgTotal: z.ZodNumber;
    tokens: z.ZodArray<z.ZodObject<{
        tokenId: z.ZodString;
        tokenName: z.ZodString;
        tokenPrefix: z.ZodString;
        tokenType: z.ZodEnum<["access_token", "service_token"]>;
        createdBy: z.ZodString;
        createdByName: z.ZodString;
        requestsToday: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        createdBy: string;
        createdByName: string;
        requestsToday: number;
        tokenId: string;
        tokenName: string;
        tokenPrefix: string;
        tokenType: "access_token" | "service_token";}, {
        createdBy: string;
        createdByName: string;
        requestsToday: number;
        tokenId: string;
        tokenName: string;
        tokenPrefix: string;
        tokenType: "access_token" | "service_token";}>, "many">;
    date: z.ZodString;
    days: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    date: string;
    days: number;
    orgTotal: number;
    tokens: {
        tokenType: "access_token" | "service_token";
        tokenId: string;
        tokenName: string;
        tokenPrefix: string;
        createdBy: string;
        createdByName: string;
        requestsToday: number;
    }[];}, {
    date: string;
    days: number;
    orgTotal: number;
    tokens: {
        tokenType: "access_token" | "service_token";
        tokenId: string;
        tokenName: string;
        tokenPrefix: string;
        createdBy: string;
        createdByName: string;
        requestsToday: number;
    }[];}>;
export declare const UpgradePreviewResponseSchema: z.ZodObject<{
    currentPlan: z.ZodEnum<["free", "pro", "team"]>;
    targetPlan: z.ZodEnum<["pro", "team"]>;
    immediateCharge: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
        prorationDate: z.ZodString;
        breakdown: z.ZodArray<z.ZodObject<{
            description: z.ZodString;
            amount: z.ZodNumber;
            quantity: z.ZodNumber;
            isCredit: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            description: string;
            isCredit: boolean;
            quantity: number;}, {
            amount: number;
            description: string;
            isCredit: boolean;
            quantity: number;}>, "many">;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        breakdown: {
            description: string;
            quantity: number;
            amount: number;
            isCredit: boolean;
        }[];
        currency: string;
        prorationDate: string;}, {
        amount: number;
        breakdown: {
            description: string;
            quantity: number;
            amount: number;
            isCredit: boolean;
        }[];
        currency: string;
        prorationDate: string;}>;
    recurringMonthly: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
        planAmount: z.ZodNumber;
        addonsAmount: z.ZodNumber;
        nextInvoiceDate: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        addonsAmount: number;
        amount: number;
        currency: string;
        nextInvoiceDate: string | null;
        planAmount: number;}, {
        addonsAmount: number;
        amount: number;
        currency: string;
        nextInvoiceDate: string | null;
        planAmount: number;}>;
}, "strip", z.ZodTypeAny, {
    currentPlan: "free" | "pro" | "team";
    immediateCharge: {
        currency: string;
        amount: number;
        prorationDate: string;
        breakdown: {
            description: string;
            quantity: number;
            amount: number;
            isCredit: boolean;
        }[];
    };
    recurringMonthly: {
        currency: string;
        amount: number;
        planAmount: number;
        addonsAmount: number;
        nextInvoiceDate: string | null;
    };
    targetPlan: "pro" | "team";}, {
    currentPlan: "free" | "pro" | "team";
    immediateCharge: {
        currency: string;
        amount: number;
        prorationDate: string;
        breakdown: {
            description: string;
            quantity: number;
            amount: number;
            isCredit: boolean;
        }[];
    };
    recurringMonthly: {
        currency: string;
        amount: number;
        planAmount: number;
        addonsAmount: number;
        nextInvoiceDate: string | null;
    };
    targetPlan: "pro" | "team";}>;
export declare const DowngradeViolationSchema: z.ZodObject<{
    resource: z.ZodString;
    labelKey: z.ZodString;
    current: z.ZodNumber;
    newLimit: z.ZodNumber;
    over: z.ZodNumber;
    addon: z.ZodNullable<z.ZodObject<{
        type: z.ZodString;
        unitSize: z.ZodNumber;
        unitPrice: z.ZodNumber;
        unitsNeeded: z.ZodNumber;
        monthlyCost: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        monthlyCost: number;
        type: string;
        unitPrice: number;
        unitSize: number;
        unitsNeeded: number;}, {
        monthlyCost: number;
        type: string;
        unitPrice: number;
        unitSize: number;
        unitsNeeded: number;}>>;
}, "strip", z.ZodTypeAny, {
    addon: {
        type: string;
        unitSize: number;
        monthlyCost: number;
        unitPrice: number;
        unitsNeeded: number;
    } | null;
    current: number;
    labelKey: string;
    newLimit: number;
    over: number;
    resource: string;}, {
    addon: {
        type: string;
        unitSize: number;
        monthlyCost: number;
        unitPrice: number;
        unitsNeeded: number;
    } | null;
    current: number;
    labelKey: string;
    newLimit: number;
    over: number;
    resource: string;}>;
export declare const DowngradePreviewResponseSchema: z.ZodObject<{
    currentPlan: z.ZodEnum<["free", "pro", "team"]>;
    targetPlan: z.ZodEnum<["free", "pro", "team"]>;
    isCancellation: z.ZodBoolean;
    credit: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;}, {
        amount: number;
        currency: string;}>;
    nextInvoice: z.ZodObject<{
        date: z.ZodNullable<z.ZodString>;
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
        date: string | null;}, {
        amount: number;
        currency: string;
        date: string | null;}>;
    violations: z.ZodArray<z.ZodObject<{
        resource: z.ZodString;
        labelKey: z.ZodString;
        current: z.ZodNumber;
        newLimit: z.ZodNumber;
        over: z.ZodNumber;
        addon: z.ZodNullable<z.ZodObject<{
            type: z.ZodString;
            unitSize: z.ZodNumber;
            unitPrice: z.ZodNumber;
            unitsNeeded: z.ZodNumber;
            monthlyCost: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            monthlyCost: number;
            type: string;
            unitPrice: number;
            unitSize: number;
            unitsNeeded: number;}, {
            monthlyCost: number;
            type: string;
            unitPrice: number;
            unitSize: number;
            unitsNeeded: number;}>>;
    }, "strip", z.ZodTypeAny, {
        addon: {
            type: string;
            unitSize: number;
            monthlyCost: number;
            unitPrice: number;
            unitsNeeded: number;
        } | null;
        current: number;
        labelKey: string;
        newLimit: number;
        over: number;
        resource: string;}, {
        addon: {
            type: string;
            unitSize: number;
            monthlyCost: number;
            unitPrice: number;
            unitsNeeded: number;
        } | null;
        current: number;
        labelKey: string;
        newLimit: number;
        over: number;
        resource: string;}>, "many">;
    canAutoResolve: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    canAutoResolve: boolean;
    credit: {
        currency: string;
        amount: number;
    };
    currentPlan: "free" | "pro" | "team";
    isCancellation: boolean;
    nextInvoice: {
        date: string | null;
        currency: string;
        amount: number;
    };
    targetPlan: "free" | "pro" | "team";
    violations: {
        resource: string;
        labelKey: string;
        current: number;
        addon: {
            type: string;
            unitSize: number;
            monthlyCost: number;
            unitPrice: number;
            unitsNeeded: number;
        } | null;
        newLimit: number;
        over: number;
    }[];}, {
    canAutoResolve: boolean;
    credit: {
        currency: string;
        amount: number;
    };
    currentPlan: "free" | "pro" | "team";
    isCancellation: boolean;
    nextInvoice: {
        date: string | null;
        currency: string;
        amount: number;
    };
    targetPlan: "free" | "pro" | "team";
    violations: {
        resource: string;
        labelKey: string;
        current: number;
        addon: {
            type: string;
            unitSize: number;
            monthlyCost: number;
            unitPrice: number;
            unitsNeeded: number;
        } | null;
        newLimit: number;
        over: number;
    }[];}>;
export type AddonListResponse = z.infer<typeof AddonListResponseSchema>;
export type PurchaseAddonResponse = z.infer<typeof PurchaseAddonResponseSchema>;
export type RemoveAddonResponse = z.infer<typeof RemoveAddonResponseSchema>;
export type ConsumptionResponse = z.infer<typeof ConsumptionResponseSchema>;
export type UpgradePreviewResponse = z.infer<typeof UpgradePreviewResponseSchema>;
export type DowngradePreviewResponse = z.infer<typeof DowngradePreviewResponseSchema>;
//# sourceMappingURL=billing.d.ts.map