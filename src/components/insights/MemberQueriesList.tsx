import { HelpCircle } from "lucide-react";
import { MemberQueryOut } from "@/lib/fastapi/types";
import { formatConfidence, formatDateTime } from "@/lib/formatters";

interface MemberQueriesListProps {
  queries: MemberQueryOut[];
}

export function MemberQueriesList({ queries }: MemberQueriesListProps) {
  if (!queries || queries.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/70 bg-white/40 p-4 text-xs text-slate-500">
        No recorded customer questions for this cluster.
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {queries.map((q) => (
        <div
          key={q.id}
          className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200/60 bg-white/80 p-3 text-xs shadow-2xs dark:border-zinc-800 dark:bg-zinc-850/80"
        >
          <div className="flex items-start gap-2.5">
            <HelpCircle className="h-4 w-4 shrink-0 text-[#6750A4] mt-0.5" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {q.text}
              </p>
              <span className="text-[11px] text-slate-400">
                Asked {formatDateTime(q.askedAt)}
              </span>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
              q.confidence >= 0.75
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                : q.confidence >= 0.5
                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
            }`}
          >
            {formatConfidence(q.confidence)} confidence
          </span>
        </div>
      ))}
    </div>
  );
}
