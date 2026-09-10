import { z } from "zod";

export const resourceUrlSchema = z.object({
  url: z
    .string()
    .trim()
    .url("Please enter a valid URL (e.g., https://example.com/docs).")
    .max(500, "URL must be less than 500 characters."),
  title: z
    .string()
    .trim()
    .max(100, "Title must be less than 100 characters.")
    .optional(),
});

export type ResourceUrlFormValues = z.infer<typeof resourceUrlSchema>;

export const documentMetadataSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, "Document name is required."),
  url: z.string().url().optional().or(z.literal("")),
  type: z.string().optional(),
  size: z.number().nonnegative().optional(),
});

export type DocumentMetadataValues = z.infer<typeof documentMetadataSchema>;
