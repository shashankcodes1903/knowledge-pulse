import { ActivityChart } from "@/components/overview/ActivityChart";
import { AnalyticsRunControl } from "@/components/overview/AnalyticsRunControl";
import { ConfidenceChart } from "@/components/overview/ConfidenceChart";
import { OverviewMetricGrid } from "@/components/overview/OverviewMetricGrid";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { getOverview } from "@/lib/fastapi";
import { OverviewOut } from "@/lib/fastapi/types";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  let overviewData: OverviewOut | null = null;
  let errorMessage: string | null = null;

  try {
    overviewData = await getOverview();
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Unable to load conversation overview. Intelligence services may be unavailable.";
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="This period"
        period={overviewData?.period}
        description="Customer conversation health and the topics gaining attention."
        actions={<AnalyticsRunControl period={overviewData?.period} />}
      />

      {errorMessage && !overviewData ? (
        <ErrorState
          title="Overview Unavailable"
          message={errorMessage}
        />
      ) : overviewData ? (
        <>
          {/* Key Metrics */}
          <section aria-labelledby="kpi-heading">
            <h2 id="kpi-heading" className="sr-only">
              Key Performance Indicators
            </h2>
            <OverviewMetricGrid data={overviewData} />
          </section>

          {/* Activity Visualizations */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2" aria-labelledby="charts-heading">
            <h2 id="charts-heading" className="sr-only">
              Activity and Confidence Charts
            </h2>
            <ActivityChart data={overviewData.volumeByPeriod} />
            <ConfidenceChart data={overviewData.volumeByPeriod} />
          </section>

          {/* At a glance summary */}
          <section className="rounded-3xl border border-slate-200/70 bg-[#F3EDF7]/30 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              At a glance
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-4 text-xs text-slate-600 sm:grid-cols-3 dark:text-slate-400">
              <div className="rounded-2xl bg-white/70 p-4 dark:bg-zinc-850/60">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Topic Breadth:
                </span>{" "}
                {overviewData.topicCount} customer themes identified across {overviewData.conversationCount} total sessions.
              </div>
              <div className="rounded-2xl bg-white/70 p-4 dark:bg-zinc-850/60">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Documentation Gaps:
                </span>{" "}
                {Math.round(overviewData.unansweredRate * 100)}% of queries lacked strong knowledge matches.
              </div>
              <div className="rounded-2xl bg-white/70 p-4 dark:bg-zinc-850/60">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Emerging Volume:
                </span>{" "}
                {overviewData.emergingCount} topic clusters are showing accelerated customer volume.
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
