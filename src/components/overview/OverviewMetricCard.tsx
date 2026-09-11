import { LucideIcon } from "lucide-react";

interface OverviewMetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  badge?: {
    text: string;
    variant?: "neutral" | "positive" | "attention";
  };
}

export function OverviewMetricCard({
  label,
  value,
  subtext,
  icon: Icon,
  badge,
}: OverviewMetricCardProps) {
  const badgeStyles = {
    neutral: "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-slate-300",
    positive: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    attention: "bg-purple-50 text-[#6750A4] dark:bg-purple-950/40 dark:text-purple-300",
  }[badge?.variant || "neutral"];

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-[#F3EDF7]/40 p-5 shadow-xs transition hover:border-[#6750A4]/30 hover:bg-[#F3EDF7]/70 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/70">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {label}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E8DEF8] text-[#6750A4] dark:bg-purple-950/60 dark:text-purple-300">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </div>
        {badge && (
          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${badgeStyles}`}>
            {badge.text}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
          {subtext}
        </p>
      )}
    </div>
  );
}
