import { FileText } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { RecommendationCard } from "@/components/report/RecommendationCard";
import { ReportHistoryList } from "@/components/report/ReportHistoryList";
import { ReportSummary } from "@/components/report/ReportSummary";
import { getLatestReport, listReports } from "@/lib/fastapi";
import { ReportOut } from "@/lib/fastapi/types";

export const dynamic = "force-dynamic";

export default async function ReportPage() {
  let latestReport: ReportOut | null = null;
  let allReports: ReportOut[] = [];
  let errorMessage: string | null = null;

  try {
    const [latestData, listData] = await Promise.all([
      getLatestReport().catch((err) => {
        // 404 means no report yet
        if (err && typeof err === "object" && "status" in err && err.status === 404) {
          return null;
        }
        throw err;
      }),
      listReports().catch(() => [] as ReportOut[]),
    ]);

    latestReport = latestData;
    allReports = listData;
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to retrieve reports from intelligence service.";
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Report"
        description="The latest summary of what customers need and what to improve."
      />

      {errorMessage && !latestReport && (
        <ErrorState title="Report Notice" message={errorMessage} />
      )}

      {!errorMessage && !latestReport && (
        <EmptyState
          icon={FileText}
          title="No report has been generated yet"
          description="Run an analytics batch from the 'This period' dashboard to generate your first analysis report and strategic recommendations."
        />
      )}

      {latestReport && (
        <>
          {/* Latest Report Overview */}
          <section aria-labelledby="latest-report-heading">
            <h2 id="latest-report-heading" className="sr-only">
              Latest Analysis Report
            </h2>
            <ReportSummary report={latestReport} />
          </section>

          {/* Recommendations List */}
          <section aria-labelledby="recommendations-heading" className="space-y-4">
            <div className="border-b border-slate-200/60 pb-2.5 dark:border-zinc-800">
              <h3
                id="recommendations-heading"
                className="text-base font-semibold text-slate-900 dark:text-white"
              >
                Recommendations ({latestReport.recommendations?.length || 0})
              </h3>
              <p className="text-xs text-slate-500">
                Actionable interventions prioritised from customer conversation evidence
              </p>
            </div>

            {latestReport.recommendations &&
            latestReport.recommendations.length > 0 ? (
              <div className="space-y-4">
                {latestReport.recommendations.map((rec, idx) => (
                  <RecommendationCard
                    key={rec.id || idx}
                    recommendation={rec}
                    index={idx}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                No specific recommendations generated for this period.
              </p>
            )}
          </section>

          {/* Previous Reports Archive */}
          <section aria-labelledby="history-heading" className="space-y-4 pt-4">
            <div className="border-b border-slate-200/60 pb-2.5 dark:border-zinc-800">
              <h3
                id="history-heading"
                className="text-base font-semibold text-slate-900 dark:text-white"
              >
                Previous Reports History
              </h3>
              <p className="text-xs text-slate-500">
                Historical executive reports from past analysis cycles
              </p>
            </div>

            <ReportHistoryList
              reports={allReports}
              currentReportId={latestReport.id}
            />
          </section>
        </>
      )}
    </div>
  );
}
