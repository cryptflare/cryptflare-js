/**
 * Zod schemas for the Environments API.
 * Move-only extraction from `apps/api/src/routes/environments/index.ts`.
 */
import { z } from 'zod';
export declare const CreateEnvironmentBodySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;}, {
    name: string;
    slug: string;}>;
export declare const EnvironmentItemSchema: z.ZodObject<{
    id: z.ZodString;
    workspace_id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    created_at: string;
    id: string;
    name: string;
    slug: string;
    workspace_id: string;}, {
    created_at: string;
    id: string;
    name: string;
    slug: string;
    workspace_id: string;}>;
export declare const ResolvedPodPayloadSchema: z.ZodObject<{
    id: z.ZodString;
    environmentId: z.ZodString;
    parentId: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    ancestors: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        parentId: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        parentId: string | null;
        slug: string;}, {
        id: string;
        name: string;
        parentId: string | null;
        slug: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    ancestors: {
        name: string;
        id: string;
        slug: string;
        parentId: string | null;
    }[];
    description: string | null;
    environmentId: string;
    id: string;
    name: string;
    parentId: string | null;
    slug: string;}, {
    ancestors: {
        name: string;
        id: string;
        slug: string;
        parentId: string | null;
    }[];
    description: string | null;
    environmentId: string;
    id: string;
    name: string;
    parentId: string | null;
    slug: string;}>;
export declare const ResolvedSecretPayloadSchema: z.ZodObject<{
    id: z.ZodString;
    environmentId: z.ZodString;
    podId: z.ZodNullable<z.ZodString>;
    key: z.ZodString;
    version: z.ZodNumber;
    locked: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    environmentId: string;
    id: string;
    key: string;
    locked: number;
    podId: string | null;
    updatedAt: string;
    version: number;}, {
    createdAt: string;
    environmentId: string;
    id: string;
    key: string;
    locked: number;
    podId: string | null;
    updatedAt: string;
    version: number;}>;
export declare const ResolvePathResponseSchema: z.ZodObject<{
    data: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"env">;
        pod: z.ZodNull;
        secret: z.ZodNull;
    }, "strip", z.ZodTypeAny, {
        pod: null;
        secret: null;
        type: "env";}, {
        pod: null;
        secret: null;
        type: "env";}>, z.ZodObject<{
        type: z.ZodLiteral<"pod">;
        pod: z.ZodObject<{
            id: z.ZodString;
            environmentId: z.ZodString;
            parentId: z.ZodNullable<z.ZodString>;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodNullable<z.ZodString>;
            ancestors: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                parentId: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                name: string;
                parentId: string | null;
                slug: string;}, {
                id: string;
                name: string;
                parentId: string | null;
                slug: string;}>, "many">;
        }, "strip", z.ZodTypeAny, {
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
            description: string | null;
            environmentId: string;
            id: string;
            name: string;
            parentId: string | null;
            slug: string;}, {
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
            description: string | null;
            environmentId: string;
            id: string;
            name: string;
            parentId: string | null;
            slug: string;}>;
        secret: z.ZodNull;
    }, "strip", z.ZodTypeAny, {
        pod: {
            description: string | null;
            name: string;
            id: string;
            slug: string;
            environmentId: string;
            parentId: string | null;
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
        };
        secret: null;
        type: "pod";}, {
        pod: {
            description: string | null;
            name: string;
            id: string;
            slug: string;
            environmentId: string;
            parentId: string | null;
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
        };
        secret: null;
        type: "pod";}>, z.ZodObject<{
        type: z.ZodLiteral<"secret">;
        pod: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            environmentId: z.ZodString;
            parentId: z.ZodNullable<z.ZodString>;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodNullable<z.ZodString>;
            ancestors: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                parentId: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                name: string;
                parentId: string | null;
                slug: string;}, {
                id: string;
                name: string;
                parentId: string | null;
                slug: string;}>, "many">;
        }, "strip", z.ZodTypeAny, {
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
            description: string | null;
            environmentId: string;
            id: string;
            name: string;
            parentId: string | null;
            slug: string;}, {
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
            description: string | null;
            environmentId: string;
            id: string;
            name: string;
            parentId: string | null;
            slug: string;}>>;
        secret: z.ZodObject<{
            id: z.ZodString;
            environmentId: z.ZodString;
            podId: z.ZodNullable<z.ZodString>;
            key: z.ZodString;
            version: z.ZodNumber;
            locked: z.ZodNumber;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            createdAt: string;
            environmentId: string;
            id: string;
            key: string;
            locked: number;
            podId: string | null;
            updatedAt: string;
            version: number;}, {
            createdAt: string;
            environmentId: string;
            id: string;
            key: string;
            locked: number;
            podId: string | null;
            updatedAt: string;
            version: number;}>;
    }, "strip", z.ZodTypeAny, {
        pod: {
            description: string | null;
            name: string;
            id: string;
            slug: string;
            environmentId: string;
            parentId: string | null;
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
        } | null;
        secret: {
            locked: number;
            key: string;
            id: string;
            createdAt: string;
            environmentId: string;
            podId: string | null;
            version: number;
            updatedAt: string;
        };
        type: "secret";}, {
        pod: {
            description: string | null;
            name: string;
            id: string;
            slug: string;
            environmentId: string;
            parentId: string | null;
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
        } | null;
        secret: {
            locked: number;
            key: string;
            id: string;
            createdAt: string;
            environmentId: string;
            podId: string | null;
            version: number;
            updatedAt: string;
        };
        type: "secret";}>]>;
}, "strip", z.ZodTypeAny, {
    data: {
        type: "env";
        secret: null;
        pod: null;
    } | {
        type: "pod";
        secret: null;
        pod: {
            description: string | null;
            name: string;
            id: string;
            slug: string;
            environmentId: string;
            parentId: string | null;
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
        };
    } | {
        type: "secret";
        secret: {
            locked: number;
            key: string;
            id: string;
            createdAt: string;
            environmentId: string;
            podId: string | null;
            version: number;
            updatedAt: string;
        };
        pod: {
            description: string | null;
            name: string;
            id: string;
            slug: string;
            environmentId: string;
            parentId: string | null;
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
        } | null;
    };
}, {
    data: {
        type: "env";
        secret: null;
        pod: null;
    } | {
        type: "pod";
        secret: null;
        pod: {
            description: string | null;
            name: string;
            id: string;
            slug: string;
            environmentId: string;
            parentId: string | null;
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
        };
    } | {
        type: "secret";
        secret: {
            locked: number;
            key: string;
            id: string;
            createdAt: string;
            environmentId: string;
            podId: string | null;
            version: number;
            updatedAt: string;
        };
        pod: {
            description: string | null;
            name: string;
            id: string;
            slug: string;
            environmentId: string;
            parentId: string | null;
            ancestors: {
                name: string;
                id: string;
                slug: string;
                parentId: string | null;
            }[];
        } | null;
    };
}>;
export type CreateEnvironmentBody = z.infer<typeof CreateEnvironmentBodySchema>;
export type EnvironmentItem = z.infer<typeof EnvironmentItemSchema>;
export type ResolvedPodPayload = z.infer<typeof ResolvedPodPayloadSchema>;
export type ResolvedSecretPayload = z.infer<typeof ResolvedSecretPayloadSchema>;
export type ResolvePathResponse = z.infer<typeof ResolvePathResponseSchema>;
//# sourceMappingURL=environments.d.ts.map