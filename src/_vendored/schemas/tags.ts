/**
 * Zod schemas for the Tags API.
 * Move-only extraction from `apps/api/src/routes/tags/index.ts`.
 */
import { z } from 'zod';
export declare const TagBodySchema: z.ZodObject<{
    resourceType: z.ZodEnum<["workspace", "environment", "pod", "secret"]>;
    resourceId: z.ZodString;
    tag: z.ZodString;
}, "strip", z.ZodTypeAny, {
    resourceId: string;
    resourceType: "secret" | "workspace" | "environment" | "pod";
    tag: string;}, {
    resourceId: string;
    resourceType: "secret" | "workspace" | "environment" | "pod";
    tag: string;}>;
export type TagBody = z.infer<typeof TagBodySchema>;
/** Query parameters read by `GET /tags`. Both are required: the handler rejects with 400 when either is missing. */
export declare const ListResourceTagsQuerySchema: z.ZodObject<{
    resourceType: z.ZodEnum<["workspace", "environment", "pod", "secret"]>;
    resourceId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    resourceId: string;
    resourceType: "secret" | "workspace" | "environment" | "pod";}, {
    resourceId: string;
    resourceType: "secret" | "workspace" | "environment" | "pod";}>;
/** Response of `GET /tags`. */
export declare const ResourceTagsResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        resourceType: z.ZodEnum<["workspace", "environment", "pod", "secret"]>;
        resourceId: z.ZodString;
        tags: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        resourceId: string;
        resourceType: "secret" | "workspace" | "environment" | "pod";
        tags: string[];}, {
        resourceId: string;
        resourceType: "secret" | "workspace" | "environment" | "pod";
        tags: string[];}>;
}, "strip", z.ZodTypeAny, {
    data: {
        tags: string[];
        resourceType: "secret" | "workspace" | "environment" | "pod";
        resourceId: string;
    };
}, {
    data: {
        tags: string[];
        resourceType: "secret" | "workspace" | "environment" | "pod";
        resourceId: string;
    };
}>;
/** Response of `GET /tags/org`. */
export declare const OrgTagsResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        tags: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        tags: string[];
    }, {
        tags: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        tags: string[];
    };
}, {
    data: {
        tags: string[];
    };
}>;
/** Response of `POST /tags` and `DELETE /tags`: the tag as stored (trimmed and lowercased) and the resource it applies to. */
export declare const TagMutationResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        tag: z.ZodString;
        resourceType: z.ZodEnum<["workspace", "environment", "pod", "secret"]>;
        resourceId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        resourceId: string;
        resourceType: "secret" | "workspace" | "environment" | "pod";
        tag: string;}, {
        resourceId: string;
        resourceType: "secret" | "workspace" | "environment" | "pod";
        tag: string;}>;
}, "strip", z.ZodTypeAny, {
    data: {
        tag: string;
        resourceType: "secret" | "workspace" | "environment" | "pod";
        resourceId: string;
    };
}, {
    data: {
        tag: string;
        resourceType: "secret" | "workspace" | "environment" | "pod";
        resourceId: string;
    };
}>;
//# sourceMappingURL=tags.d.ts.map