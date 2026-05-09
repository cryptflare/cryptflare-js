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
//# sourceMappingURL=tags.d.ts.map