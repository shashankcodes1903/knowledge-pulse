import { describe, expect, it } from "vitest";
import {
  analyticsRunSchema,
  chatRequestSchema,
  websiteSourceSchema,
} from "@/lib/validations/intelligence";

describe("Intelligence Validation Schemas", () => {
  describe("chatRequestSchema", () => {
    it("validates valid question and session_id", () => {
      const result = chatRequestSchema.safeParse({
        question: "How do I setup SSO?",
        session_id: "sess_12345",
      });
      expect(result.success).toBe(true);
    });

    it("rejects empty question", () => {
      const result = chatRequestSchema.safeParse({
        question: "   ",
        session_id: "sess_12345",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("websiteSourceSchema", () => {
    it("validates valid website URL", () => {
      const result = websiteSourceSchema.safeParse({
        location: "https://docs.knowledgepulse.io/getting-started",
        label: "Documentation",
      });
      expect(result.success).toBe(true);
    });

    it("rejects malformed URL", () => {
      const result = websiteSourceSchema.safeParse({
        location: "not-a-valid-url",
        label: "Docs",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("analyticsRunSchema", () => {
    it("accepts null, undefined, or string period", () => {
      expect(analyticsRunSchema.safeParse({}).success).toBe(true);
      expect(analyticsRunSchema.safeParse({ period: "2026-W37" }).success).toBe(true);
    });
  });
});
