"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSelectedServices } from "@/actions/user";
import { ServiceGrid } from "./ServiceGrid";
import { ServiceSelectionSummary } from "./ServiceSelectionSummary";
import { ServiceDefinition } from "@/lib/validations/services";

interface ServiceSelectorProps {
  services: ServiceDefinition[];
  initialSelectedServices: string[];
}

export function ServiceSelector({
  services,
  initialSelectedServices,
}: ServiceSelectorProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialSelectedServices,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleToggle(id: string) {
    setError(null);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  async function handleSave() {
    if (selectedIds.length === 0) {
      setError("Please select at least one service to continue.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const result = await saveSelectedServices({ services: selectedIds });

      if (!result.success) {
        setError(result.error || "Failed to save selected services.");
        setIsSaving(false);
        return;
      }

      router.push(result.redirectUrl || "/onboarding/resources");
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-8 pb-12">
      <ServiceGrid
        services={services}
        selectedIds={selectedIds}
        onToggle={handleToggle}
      />

      <ServiceSelectionSummary
        services={services}
        selectedIds={selectedIds}
        isSaving={isSaving}
        onSave={handleSave}
        error={error}
      />
    </div>
  );
}
