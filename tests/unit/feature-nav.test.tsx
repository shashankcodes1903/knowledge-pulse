import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FeatureSubNav } from "@/components/layout/FeatureSubNav";
import featureNavItems from "@/data/feature-navigation.json";

vi.mock("next/navigation", () => ({
  usePathname: () => "/overview",
}));

describe("Feature Navigation", () => {
  it("defines the 6 required feature navigation items in exact order", () => {
    const expectedLabels = [
      "This period",
      "Insights",
      "Report",
      "Ask",
      "Sources",
      "Evaluation",
    ];

    const expectedHrefs = [
      "/overview",
      "/insights",
      "/report",
      "/ask",
      "/sources",
      "/evaluation",
    ];

    expect(featureNavItems.map((item) => item.label)).toEqual(expectedLabels);
    expect(featureNavItems.map((item) => item.href)).toEqual(expectedHrefs);
  });

  it("renders all 6 navigation links in FeatureSubNav", () => {
    render(<FeatureSubNav />);

    expect(screen.getByRole("link", { name: /this period/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /insights/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /report/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ask/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sources/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /evaluation/i })).toBeInTheDocument();
  });

  it("marks the active link based on current route", () => {
    render(<FeatureSubNav />);
    const activeLink = screen.getByRole("link", { name: /this period/i });
    expect(activeLink).toHaveAttribute("aria-current", "page");
  });
});
