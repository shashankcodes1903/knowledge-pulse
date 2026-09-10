import { describe, expect, it } from "vitest";
import servicesData from "@/data/services.json";

describe("Services Configuration Data", () => {
  it("contains exactly the required 4 service definitions", () => {
    expect(servicesData).toHaveLength(4);
  });

  it("contains the expected 4 core service IDs", () => {
    const ids = servicesData.map((s) => s.id);
    expect(ids).toContain("docs-mismatch");
    expect(ids).toContain("chatbot");
    expect(ids).toContain("chatbot-insights");
    expect(ids).toContain("chatbot-insights-suggestions");
  });

  it("ensures each service has valid metadata and features", () => {
    const ids = new Set<string>();

    for (const service of servicesData) {
      expect(service.id).toBeTruthy();
      expect(ids.has(service.id)).toBe(false);
      ids.add(service.id);

      expect(service.name).toBeTruthy();
      expect(service.shortName).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.features.length).toBeGreaterThan(0);
      expect(service.icon).toBeTruthy();
      expect(service.status).toBe("available");
    }
  });
});
