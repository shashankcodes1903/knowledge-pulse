import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { ErrorState } from "@/components/shared/ErrorState";
import { InsightEvidence } from "@/components/insights/InsightEvidence";
import { InsightHistoryChart } from "@/components/insights/InsightHistoryChart";
import { InsightTrendBadge } from "@/components/insights/InsightTrendBadge";
import { MemberQueriesList } from "@/components/insights/MemberQueriesList";
import { getInsight } from "@/lib/fastapi";
import { InsightDetailOut } from "@/lib/fastapi/types";
import { formatGrowth, formatNumber, formatPercent } from "@/lib/formatters";

export const dynamic = "force-dynamic";

interface InsightDetailPageProps {
  params: Promise<{ insightId: string }>;
}

export default async function InsightDetailPage({ params }: InsightDetailPageProps) {
  const { insightId } = await params;

  let insight: InsightDetailOut | null = null;
  let errorMessage: string | null = null;

  try {
    insight = await getInsight(insightId);
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : `Unable to load insight details for ID: ${insightId}`;
  }

  if (errorMessage || !insight) {
    return (
      <div className="space-y-6">
        <Link
          href="/insights"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Insights
        </Link>
        <ErrorState
          title="Insight Not Found"
          message={errorMessage || "The requested insight could not be retrieved."}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Navigation & Header */}
      <div>
        <Link
          href="/insights"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#6750A4] dark:text-slate-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Insights
        </Link>

        <div className="mt-3 flex flex-col gap-4 border-b border-slate-200/60 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8DEF8] text-xs font-bold text-[#6750A4] dark:bg-purple-950/60 dark:text-purple-300">
                #{insight.rank}
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                {insight.name}
              </h1>
            </div>

            {/* Keywords */}
            {insight.keywords && insight.keywords.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {insight.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-zinc-800 dark:text-slate-300"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>

          <InsightTrendBadge trend={insight.trend} />
        </div>
      </div>

      {/* Metrics Row */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4" aria-labelledby="detail-metrics-heading">
        <h2 id="detail-metrics-heading" className="sr-only">
          Topic Metrics
        </h2>
        <div className="rounded-2xl border border-slate-200/70 bg-[#F3EDF7]/40 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
          <span className="block text-2xl font-bold text-slate-900 dark:text-white">
            {formatNumber(insight.queryCount)}
          </span>
          <span className="mt-0.5 block text-xs text-slate-500">
            Queries ({formatGrowth(insight.growth)})
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-[#F3EDF7]/40 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
          <span className="block text-2xl font-bold text-slate-900 dark:text-white">
            {formatPercent(insight.meanConfidence)}
          </span>
          <span className="mt-0.5 block text-xs text-slate-500">Mean Confidence</span>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-[#F3EDF7]/40 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
          <span className="block text-2xl font-bold text-slate-900 dark:text-white">
            {insight.priority.toFixed(1)}
          </span>
          <span className="mt-0.5 block text-xs text-slate-500">Priority Score</span>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-[#F3EDF7]/40 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
          <span className="block text-2xl font-bold text-slate-900 dark:text-white">
            {insight.severity.toFixed(1)}
          </span>
          <span className="mt-0.5 block text-xs text-slate-500">Severity Index</span>
        </div>
      </section>

      {/* History and Sample Questions */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InsightHistoryChart history={insight.history} />

        <div className="rounded-3xl border border-slate-200/70 bg-[#F3EDF7]/30 p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            Sample Questions
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Representative inquiries representing this topic
          </p>

          <div className="mt-4 space-y-2.5">
            {insight.sampleQueries && insight.sampleQueries.length > 0 ? (
              insight.sampleQueries.map((query, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-2xl bg-white/70 p-3 text-xs text-slate-700 italic dark:bg-zinc-850/60 dark:text-slate-300"
                >
                  <MessageSquare className="h-4 w-4 shrink-0 text-[#6750A4] mt-0.5" />
                  <span>&ldquo;{query}&rdquo;</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No sample queries available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Customer Inquiries Evidence */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Customer Questions ({insight.memberQueries?.length || 0})
          </h3>
          <p className="text-xs text-slate-500">
            Real questions grouped into this topic cluster
          </p>
        </div>
        <MemberQueriesList queries={insight.memberQueries} />
      </section>

      {/* Weakest Knowledge Matches Evidence */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Weakest Knowledge Matches
          </h3>
          <p className="text-xs text-slate-500">
            Documentation sections with lowest similarity scores where grounding is vulnerable
          </p>
        </div>
        <InsightEvidence weakestChunks={insight.weakestChunks} />
      </section>
    </div>
  );
}
