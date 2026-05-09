/**
 * Zod schemas for the Pods API.
 * Move-only extraction from `apps/api/src/routes/pods/index.ts`.
 */
import { z } from 'zod';
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
export type PodItem = z.infer<typeof PodItemSchema>;
export type CreatePodBody = z.infer<typeof CreatePodBodySchema>;
export type UpdatePodBody = z.infer<typeof UpdatePodBodySchema>;
export type PodAncestor = z.infer<typeof PodAncestorSchema>;
//# sourceMappingURL=pods.d.ts.map