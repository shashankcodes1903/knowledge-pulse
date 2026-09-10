import { Check } from "lucide-react";

interface ServiceFeatureListProps {
  features: string[];
}

export function ServiceFeatureList({ features }: ServiceFeatureListProps) {
  return (
    <ul className="space-y-2.5 pt-2" aria-label="Service features">
      {features.map((feature, idx) => (
        <li
          key={idx}
          className="flex items-start gap-2.5 text-xs sm:text-sm text-md-on-surface-variant leading-relaxed"
        >
          <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-md-secondary-container text-md-on-secondary-container">
            <Check className="h-2.5 w-2.5 stroke-[3]" aria-hidden="true" />
          </div>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
