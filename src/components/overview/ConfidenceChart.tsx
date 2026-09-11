"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendPointOut } from "@/lib/fastapi/types";
import { formatPercent } from "@/lib/formatters";

interface ConfidenceChartProps {
  data: TrendPointOut[];
}

export function ConfidenceChart({ data }: ConfidenceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        No confidence trend data available for this period.
      </div>
    );
  }

  // Format data with percentage values for clean Y-axis scale
  const chartData = data.map((item) => ({
    ...item,
    confidencePct: Math.round(
      item.meanConfidence <= 1 ? item.meanConfidence * 100 : item.meanConfidence
    ),
  }));

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-[#F3EDF7]/30 p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Retrieval Confidence Trend
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Average response confidence across recorded periods
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as TrendPointOut & { confidencePct: number };
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {item.period}
                      </p>
                      <p className="text-xs text-[#7D5260] dark:text-pink-400">
                        {formatPercent(item.meanConfidence)} confidence
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="confidencePct"
              stroke="#7D5260"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#7D5260" }}
              activeDot={{ r: 6, fill: "#6750A4" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
