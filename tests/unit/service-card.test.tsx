import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ServiceCard } from "@/components/services/ServiceCard";

describe("ServiceCard Component", () => {
  const mockService = {
    id: "docs-mismatch",
    name: "Documentation Mismatch Detection",
    shortName: "Doc Mismatch",
    description: "Identify inconsistencies across docs.",
    features: ["Discrepancy alerts", "Audit tracking"],
    icon: "FileText",
    status: "available",
    isSelected: false,
    onToggle: vi.fn(),
  };

  it("renders service details and features", () => {
    render(<ServiceCard {...mockService} />);

    expect(
      screen.getByText("Documentation Mismatch Detection"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Identify inconsistencies across docs."),
    ).toBeInTheDocument();
    expect(screen.getByText("Discrepancy alerts")).toBeInTheDocument();
    expect(screen.getByText("Audit tracking")).toBeInTheDocument();
  });

  it("triggers onToggle when clicked", () => {
    const onToggle = vi.fn();
    render(<ServiceCard {...mockService} onToggle={onToggle} />);

    const card = screen.getByRole("button");
    fireEvent.click(card);

    expect(onToggle).toHaveBeenCalledWith("docs-mismatch");
  });

  it("displays Selected badge when isSelected is true", () => {
    render(<ServiceCard {...mockService} isSelected={true} />);

    expect(screen.getByText("Selected")).toBeInTheDocument();
  });
});
