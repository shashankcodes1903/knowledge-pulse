import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import {
  documentMetadataSchema,
  resourceUrlSchema,
} from "@/lib/validations/resources";
import { serviceSelectionSchema } from "@/lib/validations/services";

describe("Auth Validations", () => {
  describe("registerSchema", () => {
    it("accepts valid registration data", () => {
      const valid = {
        name: "Jane Doe",
        email: "jane@company.com",
        organization_name: "Acme Corp",
        password: "securePassword123!",
        confirmPassword: "securePassword123!",
        terms: true,
      };
      const result = registerSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("fails when passwords do not match", () => {
      const mismatch = {
        name: "Jane Doe",
        email: "jane@company.com",
        organization_name: "Acme Corp",
        password: "password123",
        confirmPassword: "password456",
        terms: true,
      };
      const result = registerSchema.safeParse(mismatch);
      expect(result.success).toBe(false);
      if (!result.success) {
        const msg = result.error.issues[0]?.message;
        expect(msg).toMatch(/passwords do not match/i);
      }
    });

    it("fails when email is invalid", () => {
      const invalidEmail = {
        name: "Jane Doe",
        email: "not-an-email",
        organization_name: "Acme Corp",
        password: "password123",
        confirmPassword: "password123",
        terms: true,
      };
      const result = registerSchema.safeParse(invalidEmail);
      expect(result.success).toBe(false);
      if (!result.success) {
        const msg = result.error.issues[0]?.message;
        expect(msg).toMatch(/valid email/i);
      }
    });

    it("fails when terms are not accepted", () => {
      const unacceptedTerms = {
        name: "Jane Doe",
        email: "jane@company.com",
        organization_name: "Acme Corp",
        password: "password123",
        confirmPassword: "password123",
        terms: false,
      };
      const result = registerSchema.safeParse(unacceptedTerms);
      expect(result.success).toBe(false);
      if (!result.success) {
        const msg = result.error.issues[0]?.message;
        expect(msg).toMatch(/accept the terms/i);
      }
    });
  });

  describe("loginSchema", () => {
    it("accepts valid login credentials", () => {
      const valid = {
        email: "jane@company.com",
        password: "secretPassword",
      };
      const result = loginSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("fails when password is empty", () => {
      const invalid = {
        email: "jane@company.com",
        password: "",
      };
      const result = loginSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });
});

describe("Service Selection Validation", () => {
  it("accepts valid registered service IDs", () => {
    const valid = {
      services: ["docs-mismatch", "chatbot"],
    };
    const result = serviceSelectionSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects unknown/arbitrary service IDs", () => {
    const invalid = {
      services: ["malicious-service", "chatbot"],
    };
    const result = serviceSelectionSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("rejects empty service selection array", () => {
    const empty = {
      services: [],
    };
    const result = serviceSelectionSchema.safeParse(empty);
    expect(result.success).toBe(false);
  });
});

describe("Resources Validations", () => {
  describe("resourceUrlSchema", () => {
    it("accepts valid URLs", () => {
      const valid = {
        url: "https://docs.example.com/api",
        title: "API Docs",
      };
      const result = resourceUrlSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("rejects malformed URLs", () => {
      const invalid = {
        url: "not-a-valid-url",
      };
      const result = resourceUrlSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("documentMetadataSchema", () => {
    it("accepts valid document metadata", () => {
      const valid = {
        id: "doc-123",
        name: "product-manual.pdf",
        type: "application/pdf",
        size: 204800,
      };
      const result = documentMetadataSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("rejects when document name is missing", () => {
      const invalid = {
        id: "doc-123",
        name: "",
      };
      const result = documentMetadataSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });
});
