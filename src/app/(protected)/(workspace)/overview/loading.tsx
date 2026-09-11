import { ChartSkeleton, MetricCardSkeleton } from "@/components/shared/SkeletonPrimitives";

export default function OverviewLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex animate-pulse items-center justify-between border-b border-slate-200/60 pb-5 dark:border-zinc-800">
        <div>
          <div className="h-8 w-44 rounded-md bg-slate-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-72 rounded-md bg-slate-200/60 dark:bg-zinc-800/60" />
        </div>
        <div className="h-8 w-28 rounded-full bg-slate-200 dark:bg-zinc-800" />
      </div>

      {/* KPI skeletons */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      {/* Chart skeletons */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  );
}
