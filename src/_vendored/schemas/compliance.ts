/**
 * Zod schemas for the Compliance Reports API.
 * Move-only extraction from `apps/api/src/routes/compliance/index.ts`.
 */
import { z } from 'zod';
export declare const GenerateReportBodySchema: z.ZodObject<{
    framework: z.ZodEnum<[string, ...string[]]>;
    dateRange: z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        from: string;
        to: string;}, {
        from: string;
        to: string;}>;
    format: z.ZodDefault<z.ZodEnum<[string, ...string[]]>>;
    sections: z.ZodArray<z.ZodEnum<[string, ...string[]]>, "many">;
}, "strip", z.ZodTypeAny, {
    dateRange: {
        to: string;
        from: string;
    };
    format: string;
    framework: string;
    sections: string[];}, {
    dateRange: {
        to: string;
        from: string;
    };
    format?: string | undefined;
    framework: string;
    sections: string[];}>;
export declare const GenerateReportResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        jobId: z.ZodString;
        status: z.ZodEnum<["processing", "completed"]>;
        framework: z.ZodString;
        sections: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        framework: string;
        jobId: string;
        sections: string[];
        status: "processing" | "completed";}, {
        framework: string;
        jobId: string;
        sections: string[];
        status: "processing" | "completed";}>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "processing" | "completed";
        framework: string;
        sections: string[];
        jobId: string;
    };
}, {
    data: {
        status: "processing" | "completed";
        framework: string;
        sections: string[];
        jobId: string;
    };
}>;
export declare const ReportStatusResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        jobId: z.ZodString;
        status: z.ZodEnum<["processing", "completed", "failed"]>;
        framework: z.ZodOptional<z.ZodString>;
        format: z.ZodOptional<z.ZodString>;
        sections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        dateRange: z.ZodOptional<z.ZodObject<{
            from: z.ZodString;
            to: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            from: string;
            to: string;}, {
            from: string;
            to: string;}>>;
        createdAt: z.ZodOptional<z.ZodString>;
        completedAt: z.ZodOptional<z.ZodString>;
        error: z.ZodOptional<z.ZodString>;
        downloadUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        completedAt?: string | undefined;
        createdAt?: string | undefined;
        dateRange?: {
            to: string;
            from: string;
        } | undefined;
        downloadUrl?: string | undefined;
        error?: string | undefined;
        format?: string | undefined;
        framework?: string | undefined;
        jobId: string;
        sections?: string[] | undefined;
        status: "processing" | "completed" | "failed";}, {
        completedAt?: string | undefined;
        createdAt?: string | undefined;
        dateRange?: {
            to: string;
            from: string;
        } | undefined;
        downloadUrl?: string | undefined;
        error?: string | undefined;
        format?: string | undefined;
        framework?: string | undefined;
        jobId: string;
        sections?: string[] | undefined;
        status: "processing" | "completed" | "failed";}>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "processing" | "completed" | "failed";
        jobId: string;
        error?: string | undefined;
        format?: string | undefined;
        framework?: string | undefined;
        dateRange?: {
            to: string;
            from: string;
        } | undefined;
        sections?: string[] | undefined;
        createdAt?: string | undefined;
        completedAt?: string | undefined;
        downloadUrl?: string | undefined;
    };
}, {
    data: {
        status: "processing" | "completed" | "failed";
        jobId: string;
        error?: string | undefined;
        format?: string | undefined;
        framework?: string | undefined;
        dateRange?: {
            to: string;
            from: string;
        } | undefined;
        sections?: string[] | undefined;
        createdAt?: string | undefined;
        completedAt?: string | undefined;
        downloadUrl?: string | undefined;
    };
}>;
export type GenerateReportBody = z.infer<typeof GenerateReportBodySchema>;
export type GenerateReportResponse = z.infer<typeof GenerateReportResponseSchema>;
export type ReportStatusResponse = z.infer<typeof ReportStatusResponseSchema>;
//# sourceMappingURL=compliance.d.ts.map