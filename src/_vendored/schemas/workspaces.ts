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
/** The workspace row, as create and get return it. */
export declare const WorkspaceItemSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    created_by: z.ZodNullable<z.ZodString>;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    created_at: string;
    created_by: string | null;
    id: string;
    name: string;
    organisation_id: string;
    slug: string;}, {
    created_at: string;
    created_by: string | null;
    id: string;
    name: string;
    organisation_id: string;
    slug: string;}>;
/** One row of the workspace list: the workspace plus creator details and a count. */
export declare const WorkspaceListItemSchema: z.ZodObject<{
    id: z.ZodString;
    organisation_id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    created_by: z.ZodNullable<z.ZodString>;
    created_at: z.ZodString;
} & {
    created_by_name: z.ZodNullable<z.ZodString>;
    created_by_email: z.ZodNullable<z.ZodString>;
    environment_count: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    created_at: string;
    created_by: string | null;
    created_by_email: string | null;
    created_by_name: string | null;
    environment_count: number;
    id: string;
    name: string;
    organisation_id: string;
    slug: string;}, {
    created_at: string;
    created_by: string | null;
    created_by_email: string | null;
    created_by_name: string | null;
    environment_count: number;
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
        created_by: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    } & {
        created_by_name: z.ZodNullable<z.ZodString>;
        created_by_email: z.ZodNullable<z.ZodString>;
        environment_count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        created_by: string | null;
        created_by_email: string | null;
        created_by_name: string | null;
        environment_count: number;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;}, {
        created_at: string;
        created_by: string | null;
        created_by_email: string | null;
        created_by_name: string | null;
        environment_count: number;
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
        created_by: string | null;
        created_by_name: string | null;
        created_by_email: string | null;
        environment_count: number;
    }[];
}, {
    data: {
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
        created_by: string | null;
        created_by_name: string | null;
        created_by_email: string | null;
        environment_count: number;
    }[];
}>;
export declare const WorkspaceResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        organisation_id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        created_by: z.ZodNullable<z.ZodString>;
        created_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created_at: string;
        created_by: string | null;
        id: string;
        name: string;
        organisation_id: string;
        slug: string;}, {
        created_at: string;
        created_by: string | null;
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
        created_by: string | null;
    };
}, {
    data: {
        name: string;
        id: string;
        organisation_id: string;
        created_at: string;
        slug: string;
        created_by: string | null;
    };
}>;
export declare const WorkspaceSuccessResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    pending: z.ZodOptional<z.ZodBoolean>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message?: string | undefined;
    pending?: boolean | undefined;
    success: boolean;}, {
    message?: string | undefined;
    pending?: boolean | undefined;
    success: boolean;}>;
export type CreateWorkspaceBody = z.infer<typeof CreateWorkspaceBodySchema>;
export type WorkspaceItem = z.infer<typeof WorkspaceItemSchema>;
export type WorkspaceListItem = z.infer<typeof WorkspaceListItemSchema>;
//# sourceMappingURL=workspaces.d.ts.map