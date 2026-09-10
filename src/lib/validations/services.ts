import { z } from "zod";
import servicesData from "@/data/services.json";

export interface ServiceDefinition {
  id: string;
  name: string;
  shortName: string;
  description: string;
  features: string[];
  icon: string;
  status: string;
}

export const VALID_SERVICE_IDS = servicesData.map((s) => s.id) as [
  string,
  ...string[],
];

export const serviceSelectionSchema = z.object({
  services: z
    .array(z.string())
    .min(1, "Please select at least one service to continue.")
    .refine(
      (items) => items.every((id) => VALID_SERVICE_IDS.includes(id)),
      {
        message: "One or more selected services are invalid.",
      },
    ),
});

export type ServiceSelectionValues = z.infer<typeof serviceSelectionSchema>;
