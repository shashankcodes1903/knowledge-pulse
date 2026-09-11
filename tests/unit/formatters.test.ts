import { describe, expect, it } from "vitest";
import {
  formatConfidence,
  formatDate,
  formatGrowth,
  formatNumber,
  formatPercent,
} from "@/lib/formatters";

describe("Formatting Utilities", () => {
  describe("formatPercent", () => {
    it("formats 0 to 1 decimal values as percentage", () => {
      expect(formatPercent(0.75)).toBe("75%");
      expect(formatPercent(0.123)).toBe("12%");
      expect(formatPercent(1)).toBe("100%");
      expect(formatPercent(0)).toBe("0%");
    });

    it("formats 0 to 100 values directly", () => {
      expect(formatPercent(85)).toBe("85%");
    });

    it("handles null and undefined gracefully", () => {
      expect(formatPercent(null)).toBe("0%");
      expect(formatPercent(undefined)).toBe("0%");
    });
  });

  describe("formatConfidence", () => {
    it("formats confidence cleanly", () => {
      expect(formatConfidence(0.92)).toBe("92%");
      expect(formatConfidence(0.5)).toBe("50%");
    });

    it("returns N/A for missing confidence", () => {
      expect(formatConfidence(null)).toBe("N/A");
      expect(formatConfidence(undefined)).toBe("N/A");
    });
  });

  describe("formatGrowth", () => {
    it("adds plus sign for positive growth", () => {
      expect(formatGrowth(0.15)).toBe("+15%");
      expect(formatGrowth(15)).toBe("+15%");
    });

    it("handles negative and zero growth", () => {
      expect(formatGrowth(-0.08)).toBe("-8%");
      expect(formatGrowth(0)).toBe("0%");
    });
  });

  describe("formatNumber", () => {
    it("formats thousands with comma separation", () => {
      expect(formatNumber(1250)).toBe("1,250");
      expect(formatNumber(1000000)).toBe("1,000,000");
      expect(formatNumber(0)).toBe("0");
      expect(formatNumber(null)).toBe("0");
    });
  });

  describe("formatDate", () => {
    it("formats ISO string to short date", () => {
      const formatted = formatDate("2026-09-11T12:00:00.000Z");
      expect(formatted).toContain("Sep");
      expect(formatted).toContain("2026");
    });

    it("returns N/A for empty values", () => {
      expect(formatDate(null)).toBe("N/A");
    });
  });
});
