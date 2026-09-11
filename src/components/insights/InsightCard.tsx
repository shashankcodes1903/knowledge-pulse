import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { InsightOut } from "@/lib/fastapi/types";
import { formatGrowth, formatNumber, formatPercent } from "@/lib/formatters";
import { InsightTrendBadge } from "./InsightTrendBadge";

interface InsightCardProps {
  insight: InsightOut;
}

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <Link
      href={`/insights/${encodeURIComponent(insight.id)}`}
      className="group flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-[#F3EDF7]/30 p-5 shadow-xs transition hover:border-[#6750A4]/40 hover:bg-[#F3EDF7]/70 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/70"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8DEF8] text-xs font-bold text-[#6750A4] dark:bg-purple-950/60 dark:text-purple-300">
              #{insight.rank}
            </span>
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#6750A4] dark:text-white dark:group-hover:text-purple-300">
              {insight.name}
            </h3>
          </div>

          <InsightTrendBadge trend={insight.trend} />
        </div>

        {/* Metrics Grid */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-white/70 p-3 text-center text-xs dark:bg-zinc-850/60">
          <div>
            <span className="block font-bold text-slate-900 dark:text-white">
              {formatNumber(insight.queryCount)}
            </span>
            <span className="text-[11px] text-slate-500">
              Queries ({formatGrowth(insight.growth)})
            </span>
          </div>

          <div>
            <span className="block font-bold text-slate-900 dark:text-white">
              {formatPercent(insight.meanConfidence)}
            </span>
            <span className="text-[11px] text-slate-500">Confidence</span>
          </div>

          <div>
            <span className="block font-bold text-slate-900 dark:text-white">
              {insight.priority.toFixed(1)}
            </span>
            <span className="text-[11px] text-slate-500">Priority Score</span>
          </div>
        </div>

        {/* Keywords */}
        {insight.keywords && insight.keywords.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {insight.keywords.map((kw, i) => (
              <span
                key={i}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 dark:bg-zinc-800 dark:text-slate-400"
              >
                {kw}
              </span>
            ))}
          </div>
        )}

        {/* Sample query preview */}
        {insight.sampleQueries && insight.sampleQueries.length > 0 && (
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50/70 p-2.5 text-xs text-slate-600 dark:bg-zinc-800/40 dark:text-slate-300">
            <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#6750A4] mt-0.5" />
            <span className="italic line-clamp-1">
              &ldquo;{insight.sampleQueries[0]}&rdquo;
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-end border-t border-slate-200/60 pt-3 text-xs font-semibold text-[#6750A4] dark:border-zinc-800 dark:text-purple-300">
        <span className="inline-flex items-center gap-1 transition-transform group-hover:translate-x-1">
          View Evidence & History
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
