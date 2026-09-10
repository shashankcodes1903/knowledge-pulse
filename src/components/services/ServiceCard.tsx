import React from "react";
import {
  BarChart3,
  Bot,
  Check,
  FileText,
  Lightbulb,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import { ServiceFeatureList } from "./ServiceFeatureList";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Bot,
  BarChart3,
  Lightbulb,
};

export interface ServiceCardProps {
  id: string;
  name: string;
  shortName: string;
  description: string;
  features: string[];
  icon: string;
  status: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function ServiceCard({
  id,
  name,
  shortName,
  description,
  features,
  icon,
  isSelected,
  onToggle,
}: ServiceCardProps) {
  const IconComponent = iconMap[icon] || Sparkles;

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(id);
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => onToggle(id)}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-[28px] p-6 sm:p-7 text-left transition-all duration-300 cursor-pointer select-none",
        "border",
        isSelected
          ? "border-md-primary/40 bg-md-surface-container shadow-md ring-2 ring-md-primary"
          : "border-slate-200/80 bg-md-surface-container/60 shadow-sm hover:bg-md-surface-container hover:shadow-md hover:border-slate-300",
        "active:scale-[0.98]",
      )}
    >
      {/* Background atmospheric glow when selected */}
      {isSelected && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-md-primary/10 blur-2xl transition-opacity duration-300"
        />
      )}

      <div>
        {/* Top bar with Icon and Selection Badge */}
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-200",
              isSelected
                ? "bg-md-primary text-white shadow-sm"
                : "bg-md-secondary-container text-md-on-secondary-container group-hover:bg-md-secondary-container/80",
            )}
          >
            <IconComponent className="h-6 w-6" aria-hidden="true" />
          </div>

          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-all duration-200",
              isSelected
                ? "bg-md-primary text-white shadow-sm"
                : "bg-slate-200/70 text-slate-700 group-hover:bg-slate-300/70 dark:bg-zinc-800 dark:text-zinc-300",
            )}
          >
            {isSelected ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[3]" />
                <span>Selected</span>
              </>
            ) : (
              <span>Select</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-5">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-md-primary/80">
            {shortName}
          </span>
          <h3 className="mt-1 text-lg font-bold tracking-tight text-md-on-surface">
            {name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-md-on-surface-variant">
            {description}
          </p>
        </div>

        {/* Features */}
        <div className="mt-5 border-t border-md-outline/10 pt-4">
          <ServiceFeatureList features={features} />
        </div>
      </div>
    </div>
  );
}
