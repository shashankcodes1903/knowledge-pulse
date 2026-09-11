"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendPointOut } from "@/lib/fastapi/types";
import { formatNumber, formatPercent } from "@/lib/formatters";

interface InsightHistoryChartProps {
  history: TrendPointOut[];
}

export function InsightHistoryChart({ history }: InsightHistoryChartProps) {
  if (!history || history.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl bg-white/40 text-xs text-slate-500">
        No time-series history available for this topic.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-[#F3EDF7]/30 p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
        Topic Volume History
      </h4>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Customer queries for this topic across historical periods
      </p>

      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748B", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748B", fontSize: 11 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as TrendPointOut;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-md text-xs dark:border-zinc-700 dark:bg-zinc-900">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {item.period}
                      </p>
                      <p className="text-[#6750A4]">
                        {formatNumber(item.queries)} queries
                      </p>
                      <p className="text-[#7D5260]">
                        {formatPercent(item.meanConfidence)} confidence
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="queries" fill="#6750A4" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
