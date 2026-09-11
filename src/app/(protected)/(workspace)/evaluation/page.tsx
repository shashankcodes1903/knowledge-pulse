import { Calendar, CheckCircle2 } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { EvaluationFailuresList } from "@/components/evaluation/EvaluationFailuresList";
import { EvaluationMetricCard } from "@/components/evaluation/EvaluationMetricCard";
import { getLatestEvaluation } from "@/lib/fastapi";
import { EvaluationOut } from "@/lib/fastapi/types";
import { formatDateTime, formatNumber } from "@/lib/formatters";

export const dynamic = "force-dynamic";

export default async function EvaluationPage() {
  let evaluation: EvaluationOut | null = null;
  let errorMessage: string | null = null;

  try {
    evaluation = await getLatestEvaluation();
  } catch (error) {
    // Check if 404
    if (error && typeof error === "object" && "status" in error && error.status === 404) {
      evaluation = null;
    } else {
      errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to load evaluation data from intelligence service.";
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Evaluation"
        description="Latest evaluation results for the knowledge assistant."
      />

      {errorMessage && !evaluation && (
        <ErrorState title="Evaluation Notice" message={errorMessage} />
      )}

      {!errorMessage && !evaluation && (
        <EmptyState
          icon={CheckCircle2}
          title="No evaluation results are available yet"
          description="Evaluation metrics are compiled when synthetic or benchmark query runs evaluate knowledge grounding accuracy."
        />
      )}

      {evaluation && (
        <>
          {/* Metadata Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/60 bg-[#F3EDF7]/30 px-5 py-3 text-xs dark:border-zinc-800 dark:bg-zinc-900/30">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Evaluation Batch #{evaluation.id}
            </span>
            <div className="flex items-center gap-4 text-slate-500">
              <span>{formatNumber(evaluation.questionCount)} evaluated questions</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Ran {formatDateTime(evaluation.ranAt)}
              </span>
            </div>
          </div>

          {/* Primary Quality Metrics */}
          <section aria-labelledby="eval-metrics-heading" className="space-y-3">
            <h2 id="eval-metrics-heading" className="text-base font-semibold text-slate-900 dark:text-white">
              Core Grounding Benchmarks
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <EvaluationMetricCard
                label="Faithfulness"
                score={evaluation.faithfulness}
                description="Factual consistency of assistant responses with retrieved knowledge chunks."
              />

              <EvaluationMetricCard
                label="Answer Relevance"
                score={evaluation.answerRelevance}
                description="Directness and completeness of answers in addressing user queries."
              />

              <EvaluationMetricCard
                label="Context Relevance"
                score={evaluation.contextRelevance}
                description="Precision of retrieved documentation chunks without extraneous noise."
              />
            </div>
          </section>

          {/* Failure Cases */}
          <section aria-labelledby="eval-failures-heading" className="space-y-3">
            <div className="border-b border-slate-200/60 pb-2.5 dark:border-zinc-800">
              <h3
                id="eval-failures-heading"
                className="text-base font-semibold text-slate-900 dark:text-white"
              >
                Benchmark Failure Cases ({evaluation.failures?.length || 0})
              </h3>
              <p className="text-xs text-slate-500">
                Queries where grounding, relevancy, or faithfulness fell below confidence thresholds
              </p>
            </div>

            <EvaluationFailuresList failures={evaluation.failures} />
          </section>
        </>
      )}
    </div>
  );
}
