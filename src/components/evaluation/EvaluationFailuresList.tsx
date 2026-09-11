import { AlertTriangle, CheckCircle } from "lucide-react";
import { EvaluationFailureItem } from "@/lib/fastapi/types";
import { formatPercent } from "@/lib/formatters";

interface EvaluationFailuresListProps {
  failures: EvaluationFailureItem[];
}

export function EvaluationFailuresList({
  failures,
}: EvaluationFailuresListProps) {
  if (!failures || failures.length === 0) {
    return (
      <div className="flex items-center gap-2.5 rounded-3xl border border-emerald-200 bg-emerald-50/60 p-5 text-xs text-emerald-800 dark:border-emerald-950/60 dark:bg-emerald-950/20 dark:text-emerald-300">
        <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
        <span>
          No evaluation failures detected. All test queries met benchmark quality thresholds.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {failures.map((item, idx) => {
        const questionText =
          typeof item.question === "string"
            ? item.question
            : typeof item.text === "string"
            ? item.text
            : `Question #${idx + 1}`;

        const reasonText =
          typeof item.reason === "string"
            ? item.reason
            : typeof item.message === "string"
            ? item.message
            : typeof item.error === "string"
            ? item.error
            : null;

        return (
          <div
            key={idx}
            className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-4 text-xs dark:border-rose-950/60 dark:bg-rose-950/20"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-rose-900 dark:text-rose-200">
                    {questionText}
                  </p>
                  {reasonText ? (
                    <p className="mt-1 text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-700 dark:text-slate-200">Reason:</strong> {reasonText}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Sub-scores if available */}
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                {item.faithfulness !== undefined && (
                  <span className="rounded-md bg-white/80 px-2 py-0.5 text-slate-600 dark:bg-zinc-800">
                    Faithfulness: {formatPercent(Number(item.faithfulness))}
                  </span>
                )}
                {item.answerRelevance !== undefined && (
                  <span className="rounded-md bg-white/80 px-2 py-0.5 text-slate-600 dark:bg-zinc-800">
                    Relevance: {formatPercent(Number(item.answerRelevance))}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
