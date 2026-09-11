import { Calendar } from "lucide-react";
import { ReportOut } from "@/lib/fastapi/types";
import { formatDate, formatNumber, formatPercent } from "@/lib/formatters";

interface ReportHistoryListProps {
  reports: ReportOut[];
  currentReportId?: string;
}

export function ReportHistoryList({
  reports,
  currentReportId,
}: ReportHistoryListProps) {
  const previousReports = reports.filter((r) => r.id !== currentReportId);

  if (previousReports.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300/80 bg-[#F3EDF7]/20 p-6 text-center dark:border-zinc-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          No prior reports available in history.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {previousReports.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-slate-200/70 bg-[#F3EDF7]/20 p-4 transition hover:bg-[#F3EDF7]/50 dark:border-zinc-800 dark:bg-zinc-900/20"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/50 pb-2.5 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#E8DEF8] px-2.5 py-0.5 text-xs font-semibold text-[#1D192B] dark:bg-purple-950 dark:text-purple-300">
                Period: {item.period}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <Calendar className="h-3 w-3" />
                {formatDate(item.generatedAt)}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>{formatNumber(item.conversationCount)} conversations</span>
              <span>•</span>
              <span>{formatNumber(item.queryCount)} queries</span>
              <span>•</span>
              <span>{formatPercent(item.unansweredRate)} unanswered</span>
            </div>
          </div>

          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {item.summary}
          </p>
        </div>
      ))}
    </div>
  );
}
