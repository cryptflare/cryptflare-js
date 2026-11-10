/**
 * Zod schemas for the Organisations API.
 * Move-only extraction from `apps/api/src/routes/organisations/index.ts`
 * and `apps/api/src/routes/organisations/features.ts`.
 */
import { z } from 'zod';
export declare const CreateOrgBodySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;}, {
    name: string;
    slug: string;}>;
export declare const UpdateOrgBodySchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const DataRegionSchema: z.ZodEnum<["default", "eu", "us", "apac"]>;
export declare const OrgItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    plan: z.ZodString;
    role: z.ZodString;
    dataRegion: z.ZodEnum<["default", "eu", "us", "apac"]>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    dataRegion: "apac" | "default" | "eu" | "us";
    id: string;
    name: string;
    plan: string;
    role: string;}, {
    createdAt: string;
    dataRegion: "apac" | "default" | "eu" | "us";
    id: string;
    name: string;
    plan: string;
    role: string;}>;
/**
 * The organisation row as the API returns it: every column except the three
 * BYOK key-material columns (`byok_wrapped_key`, `byok_wrapped_iv`,
 * `byok_key_hash`), which `toPublicOrganisation` strips.
 */
export declare const OrgDetailSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    plan: z.ZodString;
    stripe_customer_id: z.ZodNullable<z.ZodString>;
    stripe_subscription_id: z.ZodNullable<z.ZodString>;
    stripe_subscription_status: z.ZodNullable<z.ZodString>;
    stripe_current_period_end: z.ZodNullable<z.ZodString>;
    stripe_cancel_at_period_end: z.ZodNumber;
    owner_id: z.ZodString;
    byok_enabled: z.ZodNumber;
    byok_set_at: z.ZodNullable<z.ZodString>;
    byok_set_by: z.ZodNullable<z.ZodString>;
    ai_enabled: z.ZodNumber;
    events_enabled: z.ZodNumber;
    sync_enabled: z.ZodNumber;
    sync_takeover_enabled: z.ZodNumber;
    ip_allowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    approval_confirmation_required: z.ZodNumber;
    data_region: z.ZodEnum<["default", "eu", "us", "apac"]>;
    data_region_set_at: z.ZodNullable<z.ZodString>;
    data_region_set_by: z.ZodNullable<z.ZodString>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ai_enabled: number;
    approval_confirmation_required: number;
    byok_enabled: number;
    byok_set_at: string | null;
    byok_set_by: string | null;
    created_at: string;
    data_region: "apac" | "default" | "eu" | "us";
    data_region_set_at: string | null;
    data_region_set_by: string | null;
    events_enabled: number;
    id: string;
    ip_allowlist: string[] | null;
    name: string;
    owner_id: string;
    plan: string;
    slug: string;
    stripe_cancel_at_period_end: number;
    stripe_current_period_end: string | null;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    stripe_subscription_status: string | null;
    sync_enabled: number;
    sync_takeover_enabled: number;
    updated_at: string;}, {
    ai_enabled: number;
    approval_confirmation_required: number;
    byok_enabled: number;
    byok_set_at: string | null;
    byok_set_by: string | null;
    created_at: string;
    data_region: "apac" | "default" | "eu" | "us";
    data_region_set_at: string | null;
    data_region_set_by: string | null;
    events_enabled: number;
    id: string;
    ip_allowlist: string[] | null;
    name: string;
    owner_id: string;
    plan: string;
    slug: string;
    stripe_cancel_at_period_end: number;
    stripe_current_period_end: string | null;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    stripe_subscription_status: string | null;
    sync_enabled: number;
    sync_takeover_enabled: number;
    updated_at: string;}>;
export declare const ToggleFeatureBodySchema: z.ZodObject<{
    feature: z.ZodEnum<["ai", "events", "sync", "syncTakeover"]>;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    feature: "sync" | "ai" | "events" | "syncTakeover";}, {
    enabled: boolean;
    feature: "sync" | "ai" | "events" | "syncTakeover";}>;
export declare const FeaturesResponseSchema: z.ZodObject<{
    aiEnabled: z.ZodBoolean;
    eventsEnabled: z.ZodBoolean;
    syncEnabled: z.ZodBoolean;
    syncTakeoverEnabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    aiEnabled: boolean;
    eventsEnabled: boolean;
    syncEnabled: boolean;
    syncTakeoverEnabled: boolean;}, {
    aiEnabled: boolean;
    eventsEnabled: boolean;
    syncEnabled: boolean;
    syncTakeoverEnabled: boolean;}>;
export declare const ToggleResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    feature: z.ZodString;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    feature: string;
    success: boolean;}, {
    enabled: boolean;
    feature: string;
    success: boolean;}>;
export declare const SetDataRegionInputSchema: z.ZodObject<{
    region: z.ZodEnum<["default", "eu", "us", "apac"]>;
}, "strip", z.ZodTypeAny, {
    region: "apac" | "default" | "eu" | "us";
}, {
    region: "apac" | "default" | "eu" | "us";
}>;
export declare const SetIpAllowlistInputSchema: z.ZodObject<{
    ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    ipAllowlist: string[] | null;
}, {
    ipAllowlist: string[] | null;
}>;
export declare const OrgListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        plan: z.ZodString;
        role: z.ZodString;
        dataRegion: z.ZodEnum<["default", "eu", "us", "apac"]>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        dataRegion: "apac" | "default" | "eu" | "us";
        id: string;
        name: string;
        plan: string;
        role: string;}, {
        createdAt: string;
        dataRegion: "apac" | "default" | "eu" | "us";
        id: string;
        name: string;
        plan: string;
        role: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        role: string;
        id: string;
        plan: string;
        createdAt: string;
        dataRegion: "apac" | "default" | "eu" | "us";
    }[];
}, {
    data: {
        name: string;
        role: string;
        id: string;
        plan: string;
        createdAt: string;
        dataRegion: "apac" | "default" | "eu" | "us";
    }[];
}>;
export declare const OrgDetailResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        plan: z.ZodString;
        stripe_customer_id: z.ZodNullable<z.ZodString>;
        stripe_subscription_id: z.ZodNullable<z.ZodString>;
        stripe_subscription_status: z.ZodNullable<z.ZodString>;
        stripe_current_period_end: z.ZodNullable<z.ZodString>;
        stripe_cancel_at_period_end: z.ZodNumber;
        owner_id: z.ZodString;
        byok_enabled: z.ZodNumber;
        byok_set_at: z.ZodNullable<z.ZodString>;
        byok_set_by: z.ZodNullable<z.ZodString>;
        ai_enabled: z.ZodNumber;
        events_enabled: z.ZodNumber;
        sync_enabled: z.ZodNumber;
        sync_takeover_enabled: z.ZodNumber;
        ip_allowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        approval_confirmation_required: z.ZodNumber;
        data_region: z.ZodEnum<["default", "eu", "us", "apac"]>;
        data_region_set_at: z.ZodNullable<z.ZodString>;
        data_region_set_by: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ai_enabled: number;
        approval_confirmation_required: number;
        byok_enabled: number;
        byok_set_at: string | null;
        byok_set_by: string | null;
        created_at: string;
        data_region: "apac" | "default" | "eu" | "us";
        data_region_set_at: string | null;
        data_region_set_by: string | null;
        events_enabled: number;
        id: string;
        ip_allowlist: string[] | null;
        name: string;
        owner_id: string;
        plan: string;
        slug: string;
        stripe_cancel_at_period_end: number;
        stripe_current_period_end: string | null;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        stripe_subscription_status: string | null;
        sync_enabled: number;
        sync_takeover_enabled: number;
        updated_at: string;}, {
        ai_enabled: number;
        approval_confirmation_required: number;
        byok_enabled: number;
        byok_set_at: string | null;
        byok_set_by: string | null;
        created_at: string;
        data_region: "apac" | "default" | "eu" | "us";
        data_region_set_at: string | null;
        data_region_set_by: string | null;
        events_enabled: number;
        id: string;
        ip_allowlist: string[] | null;
        name: string;
        owner_id: string;
        plan: string;
        slug: string;
        stripe_cancel_at_period_end: number;
        stripe_current_period_end: string | null;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        stripe_subscription_status: string | null;
        sync_enabled: number;
        sync_takeover_enabled: number;
        updated_at: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        ai_enabled: number;
        events_enabled: number;
        sync_enabled: number;
        sync_takeover_enabled: number;
        name: string;
        id: string;
        created_at: string;
        slug: string;
        plan: string;
        updated_at: string;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        stripe_subscription_status: string | null;
        stripe_current_period_end: string | null;
        stripe_cancel_at_period_end: number;
        owner_id: string;
        byok_enabled: number;
        byok_set_at: string | null;
        byok_set_by: string | null;
        ip_allowlist: string[] | null;
        approval_confirmation_required: number;
        data_region: "apac" | "default" | "eu" | "us";
        data_region_set_at: string | null;
        data_region_set_by: string | null;
    };
}, {
    data: {
        ai_enabled: number;
        events_enabled: number;
        sync_enabled: number;
        sync_takeover_enabled: number;
        name: string;
        id: string;
        created_at: string;
        slug: string;
        plan: string;
        updated_at: string;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        stripe_subscription_status: string | null;
        stripe_current_period_end: string | null;
        stripe_cancel_at_period_end: number;
        owner_id: string;
        byok_enabled: number;
        byok_set_at: string | null;
        byok_set_by: string | null;
        ip_allowlist: string[] | null;
        approval_confirmation_required: number;
        data_region: "apac" | "default" | "eu" | "us";
        data_region_set_at: string | null;
        data_region_set_by: string | null;
    };
}>;
export declare const SetDataRegionResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        plan: z.ZodString;
        stripe_customer_id: z.ZodNullable<z.ZodString>;
        stripe_subscription_id: z.ZodNullable<z.ZodString>;
        stripe_subscription_status: z.ZodNullable<z.ZodString>;
        stripe_current_period_end: z.ZodNullable<z.ZodString>;
        stripe_cancel_at_period_end: z.ZodNumber;
        owner_id: z.ZodString;
        byok_enabled: z.ZodNumber;
        byok_set_at: z.ZodNullable<z.ZodString>;
        byok_set_by: z.ZodNullable<z.ZodString>;
        ai_enabled: z.ZodNumber;
        events_enabled: z.ZodNumber;
        sync_enabled: z.ZodNumber;
        sync_takeover_enabled: z.ZodNumber;
        ip_allowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
        approval_confirmation_required: z.ZodNumber;
        data_region: z.ZodEnum<["default", "eu", "us", "apac"]>;
        data_region_set_at: z.ZodNullable<z.ZodString>;
        data_region_set_by: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ai_enabled: number;
        approval_confirmation_required: number;
        byok_enabled: number;
        byok_set_at: string | null;
        byok_set_by: string | null;
        created_at: string;
        data_region: "apac" | "default" | "eu" | "us";
        data_region_set_at: string | null;
        data_region_set_by: string | null;
        events_enabled: number;
        id: string;
        ip_allowlist: string[] | null;
        name: string;
        owner_id: string;
        plan: string;
        slug: string;
        stripe_cancel_at_period_end: number;
        stripe_current_period_end: string | null;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        stripe_subscription_status: string | null;
        sync_enabled: number;
        sync_takeover_enabled: number;
        updated_at: string;}, {
        ai_enabled: number;
        approval_confirmation_required: number;
        byok_enabled: number;
        byok_set_at: string | null;
        byok_set_by: string | null;
        created_at: string;
        data_region: "apac" | "default" | "eu" | "us";
        data_region_set_at: string | null;
        data_region_set_by: string | null;
        events_enabled: number;
        id: string;
        ip_allowlist: string[] | null;
        name: string;
        owner_id: string;
        plan: string;
        slug: string;
        stripe_cancel_at_period_end: number;
        stripe_current_period_end: string | null;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        stripe_subscription_status: string | null;
        sync_enabled: number;
        sync_takeover_enabled: number;
        updated_at: string;}>;
    migration: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        status: z.ZodString;
        from: z.ZodEnum<["default", "eu", "us", "apac"]>;
        to: z.ZodEnum<["default", "eu", "us", "apac"]>;
    }, "strip", z.ZodTypeAny, {
        from: "apac" | "default" | "eu" | "us";
        id: string;
        status: string;
        to: "apac" | "default" | "eu" | "us";}, {
        from: "apac" | "default" | "eu" | "us";
        id: string;
        status: string;
        to: "apac" | "default" | "eu" | "us";}>>;
}, "strip", z.ZodTypeAny, {
    data: {
        ai_enabled: number;
        events_enabled: number;
        sync_enabled: number;
        sync_takeover_enabled: number;
        name: string;
        id: string;
        created_at: string;
        slug: string;
        plan: string;
        updated_at: string;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        stripe_subscription_status: string | null;
        stripe_current_period_end: string | null;
        stripe_cancel_at_period_end: number;
        owner_id: string;
        byok_enabled: number;
        byok_set_at: string | null;
        byok_set_by: string | null;
        ip_allowlist: string[] | null;
        approval_confirmation_required: number;
        data_region: "apac" | "default" | "eu" | "us";
        data_region_set_at: string | null;
        data_region_set_by: string | null;
    };
    migration?: {
        to: "apac" | "default" | "eu" | "us";
        status: string;
        id: string;
        from: "apac" | "default" | "eu" | "us";
    } | undefined;}, {
    data: {
        ai_enabled: number;
        events_enabled: number;
        sync_enabled: number;
        sync_takeover_enabled: number;
        name: string;
        id: string;
        created_at: string;
        slug: string;
        plan: string;
        updated_at: string;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        stripe_subscription_status: string | null;
        stripe_current_period_end: string | null;
        stripe_cancel_at_period_end: number;
        owner_id: string;
        byok_enabled: number;
        byok_set_at: string | null;
        byok_set_by: string | null;
        ip_allowlist: string[] | null;
        approval_confirmation_required: number;
        data_region: "apac" | "default" | "eu" | "us";
        data_region_set_at: string | null;
        data_region_set_by: string | null;
    };
    migration?: {
        to: "apac" | "default" | "eu" | "us";
        status: string;
        id: string;
        from: "apac" | "default" | "eu" | "us";
    } | undefined;}>;
export declare const SlugAvailabilityResponseSchema: z.ZodObject<{
    available: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    available: boolean;
}, {
    available: boolean;
}>;
export declare const OrgSuccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export type CreateOrgBody = z.infer<typeof CreateOrgBodySchema>;
export type UpdateOrgBody = z.infer<typeof UpdateOrgBodySchema>;
export type OrgItem = z.infer<typeof OrgItemSchema>;
export type OrgDetail = z.infer<typeof OrgDetailSchema>;
export type ToggleFeatureBody = z.infer<typeof ToggleFeatureBodySchema>;
export type FeaturesResponse = z.infer<typeof FeaturesResponseSchema>;
export type ToggleResponse = z.infer<typeof ToggleResponseSchema>;
export type DataRegion = z.infer<typeof DataRegionSchema>;
export type SetDataRegionInput = z.infer<typeof SetDataRegionInputSchema>;
export type SetIpAllowlistInput = z.infer<typeof SetIpAllowlistInputSchema>;
export declare const OrgTreeSecretSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    key: string;}, {
    id: string;
    key: string;}>;
export declare const OrgTreePodSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    path: z.ZodString;
    secrets: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        key: string;}, {
        id: string;
        key: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    path: string;
    secrets: {
        key: string;
        id: string;
    }[];
    slug: string;}, {
    id: string;
    name: string;
    path: string;
    secrets: {
        key: string;
        id: string;
    }[];
    slug: string;}>;
export declare const OrgTreeEnvironmentSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    createdAt: z.ZodString;
    secretCount: z.ZodNumber;
    pods: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        path: z.ZodString;
        secrets: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            key: string;}, {
            id: string;
            key: string;}>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        path: string;
        secrets: {
            key: string;
            id: string;
        }[];
        slug: string;}, {
        id: string;
        name: string;
        path: string;
        secrets: {
            key: string;
            id: string;
        }[];
        slug: string;}>, "many">;
    secrets: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        key: string;}, {
        id: string;
        key: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    id: string;
    name: string;
    pods: {
        secrets: {
            key: string;
            id: string;
        }[];
        name: string;
        path: string;
        id: string;
        slug: string;
    }[];
    secretCount: number;
    secrets: {
        key: string;
        id: string;
    }[];
    slug: string;}, {
    createdAt: string;
    id: string;
    name: string;
    pods: {
        secrets: {
            key: string;
            id: string;
        }[];
        name: string;
        path: string;
        id: string;
        slug: string;
    }[];
    secretCount: number;
    secrets: {
        key: string;
        id: string;
    }[];
    slug: string;}>;
export declare const OrgTreeWorkspaceSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    createdAt: z.ZodString;
    environments: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        createdAt: z.ZodString;
        secretCount: z.ZodNumber;
        pods: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            path: z.ZodString;
            secrets: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                key: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                key: string;}, {
                id: string;
                key: string;}>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            path: string;
            secrets: {
                key: string;
                id: string;
            }[];
            slug: string;}, {
            id: string;
            name: string;
            path: string;
            secrets: {
                key: string;
                id: string;
            }[];
            slug: string;}>, "many">;
        secrets: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            key: string;}, {
            id: string;
            key: string;}>, "many">;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        id: string;
        name: string;
        pods: {
            secrets: {
                key: string;
                id: string;
            }[];
            name: string;
            path: string;
            id: string;
            slug: string;
        }[];
        secretCount: number;
        secrets: {
            key: string;
            id: string;
        }[];
        slug: string;}, {
        createdAt: string;
        id: string;
        name: string;
        pods: {
            secrets: {
                key: string;
                id: string;
            }[];
            name: string;
            path: string;
            id: string;
            slug: string;
        }[];
        secretCount: number;
        secrets: {
            key: string;
            id: string;
        }[];
        slug: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    environments: {
        secrets: {
            key: string;
            id: string;
        }[];
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        secretCount: number;
        pods: {
            secrets: {
                key: string;
                id: string;
            }[];
            name: string;
            path: string;
            id: string;
            slug: string;
        }[];
    }[];
    id: string;
    name: string;
    slug: string;}, {
    createdAt: string;
    environments: {
        secrets: {
            key: string;
            id: string;
        }[];
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        secretCount: number;
        pods: {
            secrets: {
                key: string;
                id: string;
            }[];
            name: string;
            path: string;
            id: string;
            slug: string;
        }[];
    }[];
    id: string;
    name: string;
    slug: string;}>;
export declare const OrgTreeResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        organisation: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            plan: z.ZodEnum<["free", "pro", "team"]>;
            createdAt: z.ZodString;
            owner: z.ZodNullable<z.ZodObject<{
                email: z.ZodString;
                name: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                email: string;
                name: string | null;}, {
                email: string;
                name: string | null;}>>;
            memberCount: z.ZodNumber;
            policyCount: z.ZodNumber;
            teamCount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            createdAt: string;
            id: string;
            memberCount: number;
            name: string;
            owner: {
                name: string | null;
                email: string;
            } | null;
            plan: "free" | "pro" | "team";
            policyCount: number;
            slug: string;
            teamCount: number;}, {
            createdAt: string;
            id: string;
            memberCount: number;
            name: string;
            owner: {
                name: string | null;
                email: string;
            } | null;
            plan: "free" | "pro" | "team";
            policyCount: number;
            slug: string;
            teamCount: number;}>;
        workspaces: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            createdAt: z.ZodString;
            environments: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                createdAt: z.ZodString;
                secretCount: z.ZodNumber;
                pods: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    name: z.ZodString;
                    slug: z.ZodString;
                    path: z.ZodString;
                    secrets: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        key: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        id: string;
                        key: string;}, {
                        id: string;
                        key: string;}>, "many">;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    path: string;
                    secrets: {
                        key: string;
                        id: string;
                    }[];
                    slug: string;}, {
                    id: string;
                    name: string;
                    path: string;
                    secrets: {
                        key: string;
                        id: string;
                    }[];
                    slug: string;}>, "many">;
                secrets: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    key: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    key: string;}, {
                    id: string;
                    key: string;}>, "many">;
            }, "strip", z.ZodTypeAny, {
                createdAt: string;
                id: string;
                name: string;
                pods: {
                    secrets: {
                        key: string;
                        id: string;
                    }[];
                    name: string;
                    path: string;
                    id: string;
                    slug: string;
                }[];
                secretCount: number;
                secrets: {
                    key: string;
                    id: string;
                }[];
                slug: string;}, {
                createdAt: string;
                id: string;
                name: string;
                pods: {
                    secrets: {
                        key: string;
                        id: string;
                    }[];
                    name: string;
                    path: string;
                    id: string;
                    slug: string;
                }[];
                secretCount: number;
                secrets: {
                    key: string;
                    id: string;
                }[];
                slug: string;}>, "many">;
        }, "strip", z.ZodTypeAny, {
            createdAt: string;
            environments: {
                secrets: {
                    key: string;
                    id: string;
                }[];
                name: string;
                id: string;
                slug: string;
                createdAt: string;
                secretCount: number;
                pods: {
                    secrets: {
                        key: string;
                        id: string;
                    }[];
                    name: string;
                    path: string;
                    id: string;
                    slug: string;
                }[];
            }[];
            id: string;
            name: string;
            slug: string;}, {
            createdAt: string;
            environments: {
                secrets: {
                    key: string;
                    id: string;
                }[];
                name: string;
                id: string;
                slug: string;
                createdAt: string;
                secretCount: number;
                pods: {
                    secrets: {
                        key: string;
                        id: string;
                    }[];
                    name: string;
                    path: string;
                    id: string;
                    slug: string;
                }[];
            }[];
            id: string;
            name: string;
            slug: string;}>, "many">;
    }, "strip", z.ZodTypeAny, {
        organisation: {
            name: string;
            owner: {
                name: string | null;
                email: string;
            } | null;
            id: string;
            slug: string;
            plan: "free" | "pro" | "team";
            createdAt: string;
            memberCount: number;
            policyCount: number;
            teamCount: number;
        };
        workspaces: {
            environments: {
                secrets: {
                    key: string;
                    id: string;
                }[];
                name: string;
                id: string;
                slug: string;
                createdAt: string;
                secretCount: number;
                pods: {
                    secrets: {
                        key: string;
                        id: string;
                    }[];
                    name: string;
                    path: string;
                    id: string;
                    slug: string;
                }[];
            }[];
            name: string;
            id: string;
            slug: string;
            createdAt: string;
        }[];}, {
        organisation: {
            name: string;
            owner: {
                name: string | null;
                email: string;
            } | null;
            id: string;
            slug: string;
            plan: "free" | "pro" | "team";
            createdAt: string;
            memberCount: number;
            policyCount: number;
            teamCount: number;
        };
        workspaces: {
            environments: {
                secrets: {
                    key: string;
                    id: string;
                }[];
                name: string;
                id: string;
                slug: string;
                createdAt: string;
                secretCount: number;
                pods: {
                    secrets: {
                        key: string;
                        id: string;
                    }[];
                    name: string;
                    path: string;
                    id: string;
                    slug: string;
                }[];
            }[];
            name: string;
            id: string;
            slug: string;
            createdAt: string;
        }[];}>;
}, "strip", z.ZodTypeAny, {
    data: {
        workspaces: {
            environments: {
                secrets: {
                    key: string;
                    id: string;
                }[];
                name: string;
                id: string;
                slug: string;
                createdAt: string;
                secretCount: number;
                pods: {
                    secrets: {
                        key: string;
                        id: string;
                    }[];
                    name: string;
                    path: string;
                    id: string;
                    slug: string;
                }[];
            }[];
            name: string;
            id: string;
            slug: string;
            createdAt: string;
        }[];
        organisation: {
            name: string;
            owner: {
                name: string | null;
                email: string;
            } | null;
            id: string;
            slug: string;
            plan: "free" | "pro" | "team";
            createdAt: string;
            memberCount: number;
            policyCount: number;
            teamCount: number;
        };
    };
}, {
    data: {
        workspaces: {
            environments: {
                secrets: {
                    key: string;
                    id: string;
                }[];
                name: string;
                id: string;
                slug: string;
                createdAt: string;
                secretCount: number;
                pods: {
                    secrets: {
                        key: string;
                        id: string;
                    }[];
                    name: string;
                    path: string;
                    id: string;
                    slug: string;
                }[];
            }[];
            name: string;
            id: string;
            slug: string;
            createdAt: string;
        }[];
        organisation: {
            name: string;
            owner: {
                name: string | null;
                email: string;
            } | null;
            id: string;
            slug: string;
            plan: "free" | "pro" | "team";
            createdAt: string;
            memberCount: number;
            policyCount: number;
            teamCount: number;
        };
    };
}>;
export declare const DataRegionMigrationSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    from_region: z.ZodString;
    to_region: z.ZodString;
    status: z.ZodEnum<["pending", "in_progress", "copying", "verifying", "completed", "failed"]>;
    tables_copied: z.ZodNumber;
    tables_total: z.ZodNumber;
    rows_copied: z.ZodNumber;
    error: z.ZodNullable<z.ZodString>;
    backup_key: z.ZodNullable<z.ZodString>;
    started_at: z.ZodNullable<z.ZodString>;
    completed_at: z.ZodNullable<z.ZodString>;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    backup_key: string | null;
    completed_at: string | null;
    created_at: string;
    error: string | null;
    from_region: string;
    id: string;
    organisation_id: string;
    rows_copied: number;
    started_at: string | null;
    status: "pending" | "completed" | "failed" | "in_progress" | "copying" | "verifying";
    tables_copied: number;
    tables_total: number;
    to_region: string;}, {
    backup_key: string | null;
    completed_at: string | null;
    created_at: string;
    error: string | null;
    from_region: string;
    id: string;
    organisation_id: string;
    rows_copied: number;
    started_at: string | null;
    status: "pending" | "completed" | "failed" | "in_progress" | "copying" | "verifying";
    tables_copied: number;
    tables_total: number;
    to_region: string;}>;
export declare const DataRegionStatusResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        currentRegion: z.ZodEnum<["default", "eu", "us", "apac"]>;
        migration: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            organisation_id: z.ZodString;
            from_region: z.ZodString;
            to_region: z.ZodString;
            status: z.ZodEnum<["pending", "in_progress", "copying", "verifying", "completed", "failed"]>;
            tables_copied: z.ZodNumber;
            tables_total: z.ZodNumber;
            rows_copied: z.ZodNumber;
            error: z.ZodNullable<z.ZodString>;
            backup_key: z.ZodNullable<z.ZodString>;
            started_at: z.ZodNullable<z.ZodString>;
            completed_at: z.ZodNullable<z.ZodString>;
            created_at: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            backup_key: string | null;
            completed_at: string | null;
            created_at: string;
            error: string | null;
            from_region: string;
            id: string;
            organisation_id: string;
            rows_copied: number;
            started_at: string | null;
            status: "pending" | "completed" | "failed" | "in_progress" | "copying" | "verifying";
            tables_copied: number;
            tables_total: number;
            to_region: string;}, {
            backup_key: string | null;
            completed_at: string | null;
            created_at: string;
            error: string | null;
            from_region: string;
            id: string;
            organisation_id: string;
            rows_copied: number;
            started_at: string | null;
            status: "pending" | "completed" | "failed" | "in_progress" | "copying" | "verifying";
            tables_copied: number;
            tables_total: number;
            to_region: string;}>>;
    }, "strip", z.ZodTypeAny, {
        currentRegion: "apac" | "default" | "eu" | "us";
        migration: {
            error: string | null;
            status: "pending" | "completed" | "failed" | "in_progress" | "copying" | "verifying";
            id: string;
            organisation_id: string;
            created_at: string;
            started_at: string | null;
            completed_at: string | null;
            from_region: string;
            to_region: string;
            tables_copied: number;
            tables_total: number;
            rows_copied: number;
            backup_key: string | null;
        } | null;}, {
        currentRegion: "apac" | "default" | "eu" | "us";
        migration: {
            error: string | null;
            status: "pending" | "completed" | "failed" | "in_progress" | "copying" | "verifying";
            id: string;
            organisation_id: string;
            created_at: string;
            started_at: string | null;
            completed_at: string | null;
            from_region: string;
            to_region: string;
            tables_copied: number;
            tables_total: number;
            rows_copied: number;
            backup_key: string | null;
        } | null;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        migration: {
            error: string | null;
            status: "pending" | "completed" | "failed" | "in_progress" | "copying" | "verifying";
            id: string;
            organisation_id: string;
            created_at: string;
            started_at: string | null;
            completed_at: string | null;
            from_region: string;
            to_region: string;
            tables_copied: number;
            tables_total: number;
            rows_copied: number;
            backup_key: string | null;
        } | null;
        currentRegion: "apac" | "default" | "eu" | "us";
    };
}, {
    data: {
        migration: {
            error: string | null;
            status: "pending" | "completed" | "failed" | "in_progress" | "copying" | "verifying";
            id: string;
            organisation_id: string;
            created_at: string;
            started_at: string | null;
            completed_at: string | null;
            from_region: string;
            to_region: string;
            tables_copied: number;
            tables_total: number;
            rows_copied: number;
            backup_key: string | null;
        } | null;
        currentRegion: "apac" | "default" | "eu" | "us";
    };
}>;
export declare const IpAllowlistResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        ipAllowlist: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        ipAllowlist: string[] | null;
    }, {
        ipAllowlist: string[] | null;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        ipAllowlist: string[] | null;
    };
}, {
    data: {
        ipAllowlist: string[] | null;
    };
}>;
export type OrgTreeResponse = z.infer<typeof OrgTreeResponseSchema>;
export type DataRegionMigration = z.infer<typeof DataRegionMigrationSchema>;
export type DataRegionStatusResponse = z.infer<typeof DataRegionStatusResponseSchema>;
export type IpAllowlistResponse = z.infer<typeof IpAllowlistResponseSchema>;
//# sourceMappingURL=organisations.d.ts.map