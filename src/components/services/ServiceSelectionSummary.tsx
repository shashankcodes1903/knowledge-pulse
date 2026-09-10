import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceDefinition } from "@/lib/validations/services";

interface ServiceSelectionSummaryProps {
  services: ServiceDefinition[];
  selectedIds: string[];
  isSaving: boolean;
  onSave: () => void;
  error?: string | null;
}

export function ServiceSelectionSummary({
  services,
  selectedIds,
  isSaving,
  onSave,
  error,
}: ServiceSelectionSummaryProps) {
  const selectedServices = services.filter((s) => selectedIds.includes(s.id));

  return (
    <div className="sticky bottom-4 z-40 mx-auto max-w-5xl px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[28px] border border-slate-200/80 bg-white/95 p-4 sm:px-7 sm:py-4 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-md-primary text-white text-xs font-bold">
              {selectedIds.length}
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {selectedIds.length === 1
                ? "1 service selected"
                : `${selectedIds.length} services selected`}
            </span>
          </div>

          {/* Selected pills on larger screens */}
          <div className="hidden md:flex items-center gap-1.5 flex-wrap">
            {selectedServices.map((service) => (
              <span
                key={service.id}
                className="inline-flex items-center gap-1 rounded-full bg-md-secondary-container px-3 py-1 text-xs font-medium text-md-on-secondary-container"
              >
                <CheckCircle2 className="h-3 w-3" />
                {service.shortName}
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-full sm:w-auto items-center justify-end gap-3">
          {error && (
            <span className="text-xs font-medium text-rose-600 dark:text-rose-400">
              {error}
            </span>
          )}

          <Button
            type="button"
            onClick={onSave}
            disabled={isSaving || selectedIds.length === 0}
            className="h-11 w-full sm:w-auto rounded-full bg-md-primary px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-md-primary/90 hover:shadow-md active:scale-95 disabled:opacity-50"
          >
            {isSaving ? "Saving selections..." : "Save & Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
