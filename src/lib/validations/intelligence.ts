import { z } from "zod";

export const chatRequestSchema = z.object({
  question: z.string().trim().min(1, "Question cannot be empty"),
  session_id: z.string().trim().min(1, "Session ID is required"),
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;

export const websiteSourceSchema = z.object({
  location: z.string().trim().url("Please enter a valid website URL (e.g. https://docs.example.com)"),
  label: z.string().trim().max(100).optional().nullable(),
});

export type WebsiteSourceInput = z.infer<typeof websiteSourceSchema>;

export const analyticsRunSchema = z.object({
  period: z.string().trim().optional().nullable(),
});

export type AnalyticsRunInput = z.infer<typeof analyticsRunSchema>;
