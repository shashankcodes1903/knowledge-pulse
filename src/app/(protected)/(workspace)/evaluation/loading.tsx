import { MetricCardSkeleton } from "@/components/shared/SkeletonPrimitives";

export default function EvaluationLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-5 dark:border-zinc-800">
        <div>
          <div className="h-8 w-36 rounded-md bg-slate-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-64 rounded-md bg-slate-200/60 dark:bg-zinc-800/60" />
        </div>
      </div>

      <div className="h-12 w-full rounded-2xl bg-[#F3EDF7]/40 dark:bg-zinc-900/40" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      <div className="space-y-3">
        <div className="h-5 w-48 rounded-md bg-slate-200 dark:bg-zinc-800" />
        <div className="h-28 rounded-2xl bg-[#F3EDF7]/40 dark:bg-zinc-900/40" />
        <div className="h-28 rounded-2xl bg-[#F3EDF7]/40 dark:bg-zinc-900/40" />
      </div>
    </div>
  );
}
