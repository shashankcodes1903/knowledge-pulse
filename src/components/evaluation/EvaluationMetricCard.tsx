import { formatPercent } from "@/lib/formatters";

interface EvaluationMetricCardProps {
  label: string;
  score: number;
  description: string;
}

export function EvaluationMetricCard({
  label,
  score,
  description,
}: EvaluationMetricCardProps) {
  const pct = Math.min(100, Math.max(0, Math.round(score <= 1 ? score * 100 : score)));

  const barColor =
    pct >= 85
      ? "bg-emerald-500"
      : pct >= 70
      ? "bg-purple-500"
      : pct >= 50
      ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-[#F3EDF7]/40 p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/40">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {label}
          </span>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            {formatPercent(score)}
          </span>
        </div>

        {/* Progress Gauge */}
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-zinc-700">
          <div
            style={{ width: `${pct}%` }}
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          />
        </div>
      </div>

      <p className="mt-3.5 text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}
