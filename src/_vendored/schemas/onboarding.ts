/**
 * Zod schemas for the Onboarding API.
 * Move-only extraction from `apps/api/src/routes/onboarding/index.ts`.
 */
import { z } from 'zod';
export declare const OnboardingStateResponseSchema: z.ZodObject<{
    step: z.ZodNumber;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, unknown>;
    step: number;}, {
    data: Record<string, unknown>;
    step: number;}>;
export declare const UpdateOnboardingBodySchema: z.ZodObject<{
    step: z.ZodNumber;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, unknown>;
    step: number;}, {
    data: Record<string, unknown>;
    step: number;}>;
export declare const CompleteOnboardingResponseSchema: z.ZodObject<{
    organisation: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        plan: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        plan: string;
        slug: string;}, {
        id: string;
        name: string;
        plan: string;
        slug: string;}>;
    workspace: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;}, {
        id: string;
        name: string;
        slug: string;}>;
    environments: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;}, {
        id: string;
        name: string;
        slug: string;}>, "many">;
}, "strip", z.ZodTypeAny, {
    environments: {
        name: string;
        id: string;
        slug: string;
    }[];
    organisation: {
        name: string;
        id: string;
        plan: string;
        slug: string;
    };
    workspace: {
        name: string;
        id: string;
        slug: string;
    };}, {
    environments: {
        name: string;
        id: string;
        slug: string;
    }[];
    organisation: {
        name: string;
        id: string;
        plan: string;
        slug: string;
    };
    workspace: {
        name: string;
        id: string;
        slug: string;
    };}>;
export declare const SlugAvailabilityResponseSchema: z.ZodObject<{
    available: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    available: boolean;
}, {
    available: boolean;
}>;
export type OnboardingStateResponse = z.infer<typeof OnboardingStateResponseSchema>;
export type UpdateOnboardingBody = z.infer<typeof UpdateOnboardingBodySchema>;
export type CompleteOnboardingResponse = z.infer<typeof CompleteOnboardingResponseSchema>;
export type SlugAvailabilityResponse = z.infer<typeof SlugAvailabilityResponseSchema>;
//# sourceMappingURL=onboarding.d.ts.map