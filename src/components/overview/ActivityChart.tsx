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
import { formatNumber } from "@/lib/formatters";

interface ActivityChartProps {
  data: TrendPointOut[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        No query activity data available for this period.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-[#F3EDF7]/30 p-5 dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Query Volume Over Time
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total customer questions across recorded periods
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
              tickFormatter={(val) => formatNumber(val)}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as TrendPointOut;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {item.period}
                      </p>
                      <p className="text-xs text-[#6750A4] dark:text-purple-400">
                        {formatNumber(item.queries)} queries
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="queries"
              fill="#6750A4"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
