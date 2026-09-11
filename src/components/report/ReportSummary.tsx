import { Calendar, HelpCircle, MessageSquare, ShieldAlert } from "lucide-react";
import { ReportOut } from "@/lib/fastapi/types";
import { formatDate, formatNumber, formatPercent } from "@/lib/formatters";

interface ReportSummaryProps {
  report: ReportOut;
}

export function ReportSummary({ report }: ReportSummaryProps) {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-[#F3EDF7]/40 p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 pb-4 dark:border-zinc-800">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Latest Analysis Report
          </span>
          <h2 className="mt-0.5 text-xl font-bold text-slate-900 dark:text-white">
            Period: {report.period}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>Generated {formatDate(report.generatedAt)}</span>
        </div>
      </div>

      {/* KPI Chips */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3.5 dark:bg-zinc-850/60">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8DEF8] text-[#6750A4] dark:bg-purple-950/60 dark:text-purple-300">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-lg font-bold text-slate-900 dark:text-white">
              {formatNumber(report.conversationCount)}
            </span>
            <span className="text-xs text-slate-500">Total Conversations</span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3.5 dark:bg-zinc-850/60">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8DEF8] text-[#6750A4] dark:bg-purple-950/60 dark:text-purple-300">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-lg font-bold text-slate-900 dark:text-white">
              {formatNumber(report.queryCount)}
            </span>
            <span className="text-xs text-slate-500">Customer Queries</span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3.5 dark:bg-zinc-850/60">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8DEF8] text-[#6750A4] dark:bg-purple-950/60 dark:text-purple-300">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-lg font-bold text-slate-900 dark:text-white">
              {formatPercent(report.unansweredRate)}
            </span>
            <span className="text-xs text-slate-500">Unanswered Rate</span>
          </div>
        </div>
      </div>

      {/* Summary Text */}
      <div className="mt-5 rounded-2xl bg-white/80 p-5 dark:bg-zinc-850/80">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Executive Summary
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap dark:text-slate-200">
          {report.summary}
        </p>
      </div>
    </div>
  );
}
