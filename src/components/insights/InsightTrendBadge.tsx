import { Minus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { InsightTrend } from "@/lib/fastapi/types";

interface InsightTrendBadgeProps {
  trend: InsightTrend;
  className?: string;
}

export function InsightTrendBadge({ trend, className = "" }: InsightTrendBadgeProps) {
  const normalized = trend?.toLowerCase();

  if (normalized === "emerging") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-[#6750A4] dark:bg-purple-950/60 dark:text-purple-300 ${className}`}
      >
        <Sparkles className="h-3 w-3" />
        Emerging
      </span>
    );
  }

  if (normalized === "growing") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 ${className}`}
      >
        <TrendingUp className="h-3 w-3" />
        Growing
      </span>
    );
  }

  if (normalized === "declining") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-zinc-800 dark:text-slate-400 ${className}`}
      >
        <TrendingDown className="h-3 w-3" />
        Declining
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-zinc-800 dark:text-slate-300 ${className}`}
    >
      <Minus className="h-3 w-3 text-slate-400" />
      Stable
    </span>
  );
}
