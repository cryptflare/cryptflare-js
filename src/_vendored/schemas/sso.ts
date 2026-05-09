/**
 * Zod schemas for SSO connection management.
 * Move-only extraction from `apps/api/src/routes/sso/oidc.ts`.
 */
import { z } from 'zod';
export declare const SsoToggleBodySchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled: boolean;
}>;
export type SsoToggleBody = z.infer<typeof SsoToggleBodySchema>;
//# sourceMappingURL=sso.d.ts.map