/**
 * Zod schemas for the Pods API.
 * Move-only extraction from `apps/api/src/routes/pods/index.ts`.
 */
import { z } from 'zod';
/** A pod as list and get return it: camelCase, with the creator's details. */
export declare const PodItemSchema: z.ZodObject<{
    id: z.ZodString;
    environmentId: z.ZodString;
    parentId: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    createdBy: z.ZodString;
    createdByName: z.ZodNullable<z.ZodString>;
    createdByEmail: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    createdBy: string;
    createdByEmail: string | null;
    createdByName: string | null;
    description: string | null;
    environmentId: string;
    id: string;
    name: string;
    parentId: string | null;
    slug: string;
    updatedAt: string;}, {
    createdAt: string;
    createdBy: string;
    createdByEmail: string | null;
    createdByName: string | null;
    description: string | null;
    environmentId: string;
    id: string;
    name: string;
    parentId: string | null;
    slug: string;
    updatedAt: string;}>;
/**
 * A pod as create and update return it: the database row, snake_case, without
 * the creator's name or email.
 */
export declare const PodRowSchema: z.ZodObject<{
    id: z.ZodString;
    environment_id: z.ZodString;
    parent_id: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    created_by: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    created_at: string;
    created_by: string;
    description: string | null;
    environment_id: string;
    id: string;
    name: string;
    parent_id: string | null;
    slug: string;
    updated_at: string;}, {
    created_at: string;
    created_by: string;
    description: string | null;
    environment_id: string;
    id: string;
    name: string;
    parent_id: string | null;
    slug: string;
    updated_at: string;}>;
export declare const CreatePodBodySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    name: string;
    parentId?: string | undefined;
    slug: string;}, {
    description?: string | undefined;
    name: string;
    parentId?: string | undefined;
    slug: string;}>;
export declare const UpdatePodBodySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    description?: string | null | undefined;
    name?: string | undefined;
    slug?: string | undefined;}, {
    description?: string | null | undefined;
    name?: string | undefined;
    slug?: string | undefined;}>;
export declare const PodAncestorSchema: z.ZodObject<{
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
    slug: string;}>;
export declare const PodListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        environmentId: z.ZodString;
        parentId: z.ZodNullable<z.ZodString>;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        createdBy: z.ZodString;
        createdByName: z.ZodNullable<z.ZodString>;
        createdByEmail: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        createdBy: string;
        createdByEmail: string | null;
        createdByName: string | null;
        description: string | null;
        environmentId: string;
        id: string;
        name: string;
        parentId: string | null;
        slug: string;
        updatedAt: string;}, {
        createdAt: string;
        createdBy: string;
        createdByEmail: string | null;
        createdByName: string | null;
        description: string | null;
        environmentId: string;
        id: string;
        name: string;
        parentId: string | null;
        slug: string;
        updatedAt: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        description: string | null;
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        createdBy: string;
        createdByName: string | null;
        updatedAt: string;
        environmentId: string;
        parentId: string | null;
        createdByEmail: string | null;
    }[];
}, {
    data: {
        description: string | null;
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        createdBy: string;
        createdByName: string | null;
        updatedAt: string;
        environmentId: string;
        parentId: string | null;
        createdByEmail: string | null;
    }[];
}>;
export declare const PodResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        environment_id: z.ZodString;
        parent_id: z.ZodNullable<z.ZodString>;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        created_by: z.ZodString;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        created_by: string;
        description: string | null;
        environment_id: string;
        id: string;
        name: string;
        parent_id: string | null;
        slug: string;
        updated_at: string;}, {
        created_at: string;
        created_by: string;
        description: string | null;
        environment_id: string;
        id: string;
        name: string;
        parent_id: string | null;
        slug: string;
        updated_at: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        description: string | null;
        name: string;
        id: string;
        created_at: string;
        slug: string;
        updated_at: string;
        environment_id: string;
        parent_id: string | null;
        created_by: string;
    };
}, {
    data: {
        description: string | null;
        name: string;
        id: string;
        created_at: string;
        slug: string;
        updated_at: string;
        environment_id: string;
        parent_id: string | null;
        created_by: string;
    };
}>;
export declare const PodWithAncestorsResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        environmentId: z.ZodString;
        parentId: z.ZodNullable<z.ZodString>;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        createdBy: z.ZodString;
        createdByName: z.ZodNullable<z.ZodString>;
        createdByEmail: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    } & {
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
        createdAt: string;
        createdBy: string;
        createdByEmail: string | null;
        createdByName: string | null;
        description: string | null;
        environmentId: string;
        id: string;
        name: string;
        parentId: string | null;
        slug: string;
        updatedAt: string;}, {
        ancestors: {
            name: string;
            id: string;
            slug: string;
            parentId: string | null;
        }[];
        createdAt: string;
        createdBy: string;
        createdByEmail: string | null;
        createdByName: string | null;
        description: string | null;
        environmentId: string;
        id: string;
        name: string;
        parentId: string | null;
        slug: string;
        updatedAt: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        description: string | null;
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        createdBy: string;
        createdByName: string | null;
        updatedAt: string;
        environmentId: string;
        parentId: string | null;
        ancestors: {
            name: string;
            id: string;
            slug: string;
            parentId: string | null;
        }[];
        createdByEmail: string | null;
    };
}, {
    data: {
        description: string | null;
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        createdBy: string;
        createdByName: string | null;
        updatedAt: string;
        environmentId: string;
        parentId: string | null;
        ancestors: {
            name: string;
            id: string;
            slug: string;
            parentId: string | null;
        }[];
        createdByEmail: string | null;
    };
}>;
export declare const PodSuccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export type PodItem = z.infer<typeof PodItemSchema>;
export type PodRow = z.infer<typeof PodRowSchema>;
export type CreatePodBody = z.infer<typeof CreatePodBodySchema>;
export type UpdatePodBody = z.infer<typeof UpdatePodBodySchema>;
export type PodAncestor = z.infer<typeof PodAncestorSchema>;
/** Query parameters read by `GET /pods`. */
export declare const ListPodsQuerySchema: z.ZodObject<{
    parentId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    parentId?: string | undefined;
}, {
    parentId?: string | undefined;
}>;
//# sourceMappingURL=pods.d.ts.map