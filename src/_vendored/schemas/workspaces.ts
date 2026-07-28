/**
 * Zod schemas for the Workspaces API.
 * Move-only extraction from `apps/api/src/routes/workspaces/index.ts`.
 */
import { z } from 'zod';
export declare const CreateWorkspaceBodySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;}, {
    name: string;
    slug: string;}>;
export declare const WorkspaceItemSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    created_at: string;
    id: string;
    name: string;
    organisation_id: string;
    slug: string;}, {
    created_at: string;
    id: string;
    name: string;
    organisation_id: string;
    slug: string;}>;
export declare const WorkspaceListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;}, {
        created_at: string;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
    }[];
}, {
    data: {
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
    }[];
}>;
export declare const WorkspaceResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;}, {
        created_at: string;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
    };
}, {
    data: {
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
    };
}>;
export declare const WorkspaceSuccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
}, {
    success: boolean;
}>;
export type CreateWorkspaceBody = z.infer<typeof CreateWorkspaceBodySchema>;
export type WorkspaceItem = z.infer<typeof WorkspaceItemSchema>;
//# sourceMappingURL=workspaces.d.ts.map