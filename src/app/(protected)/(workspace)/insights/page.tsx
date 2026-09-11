import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { InsightList } from "@/components/insights/InsightList";
import { listInsights } from "@/lib/fastapi";
import { InsightOut } from "@/lib/fastapi/types";

export const dynamic = "force-dynamic";

interface InsightsPageProps {
  searchParams: Promise<{ period?: string }>;
}

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const { period } = await searchParams;

  let insights: InsightOut[] = [];
  let errorMessage: string | null = null;

  try {
    insights = await listInsights(period || null);
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load customer insights from backend.";
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Insights"
        period={period}
        description="What customers are asking, what is changing, and where the knowledge base appears weakest."
      />

      {errorMessage ? (
        <ErrorState
          title="Insights Unavailable"
          message={errorMessage}
        />
      ) : (
        <InsightList insights={insights} />
      )}
    </div>
  );
}
