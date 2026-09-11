import {
  CheckCircle,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { RecommendationOut } from "@/lib/fastapi/types";
import { formatGrowth, formatNumber } from "@/lib/formatters";

interface RecommendationCardProps {
  recommendation: RecommendationOut;
  index: number;
}

export function RecommendationCard({
  recommendation,
  index,
}: RecommendationCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-[#F3EDF7]/30 p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-4 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8DEF8] text-xs font-bold text-[#6750A4] dark:bg-purple-950/60 dark:text-purple-300">
            {index + 1}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium uppercase tracking-wider text-slate-700 dark:bg-zinc-800 dark:text-slate-300">
            {recommendation.category}
          </span>
          <span className="text-xs text-slate-500">
            Topic: <span className="font-semibold text-slate-800 dark:text-slate-200">{recommendation.insightName}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span>{formatNumber(recommendation.volume)} queries</span>
          <span>({formatGrowth(recommendation.growth)})</span>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {/* Problem Headline & Body */}
        <div>
          <h4 className="text-base font-semibold text-slate-900 dark:text-white">
            {recommendation.headline}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {recommendation.body}
          </p>
        </div>

        {/* Supporting Queries Evidence */}
        {recommendation.supportingQueries &&
          recommendation.supportingQueries.length > 0 && (
            <div className="rounded-2xl bg-white/70 p-3.5 dark:bg-zinc-850/60">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <HelpCircle className="h-3.5 w-3.5 text-[#6750A4]" />
                Customer Inquiry Evidence
              </span>
              <div className="mt-2 space-y-1.5">
                {recommendation.supportingQueries.map((query, i) => (
                  <p
                    key={i}
                    className="text-xs text-slate-700 italic dark:text-slate-300"
                  >
                    &ldquo;{query}&rdquo;
                  </p>
                ))}
              </div>
            </div>
          )}

        {/* FAQ Answer when present */}
        {recommendation.faqAnswer && (
          <div className="rounded-2xl border border-purple-200/80 bg-purple-50/40 p-3.5 text-xs text-purple-900 dark:border-purple-950/60 dark:bg-purple-950/20 dark:text-purple-200">
            <span className="flex items-center gap-1.5 font-semibold text-[#6750A4] dark:text-purple-300">
              <Lightbulb className="h-4 w-4" />
              Suggested FAQ / Documentation Answer
            </span>
            <p className="mt-1.5 whitespace-pre-wrap leading-relaxed">
              {recommendation.faqAnswer}
            </p>
          </div>
        )}

        {/* Expected Effect */}
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50/60 p-3 text-xs text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>
            <strong className="font-semibold">Expected impact:</strong>{" "}
            {recommendation.expectedEffect}
          </span>
        </div>
      </div>
    </div>
  );
}
