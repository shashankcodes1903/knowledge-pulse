export function MetricCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200/60 bg-[#F3EDF7]/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 rounded-md bg-slate-200 dark:bg-zinc-800" />
        <div className="h-8 w-8 rounded-full bg-slate-200/80 dark:bg-zinc-800" />
      </div>
      <div className="mt-4 h-8 w-20 rounded-md bg-slate-200 dark:bg-zinc-800" />
      <div className="mt-2 h-3 w-32 rounded-md bg-slate-200/60 dark:bg-zinc-800/60" />
    </div>
  );
}

export function ChartSkeleton({ height = "h-72" }: { height?: string }) {
  return (
    <div
      className={`flex ${height} w-full animate-pulse flex-col justify-between rounded-3xl border border-slate-200/60 bg-[#F3EDF7]/40 p-6 dark:border-zinc-800 dark:bg-zinc-900/40`}
    >
      <div className="h-4 w-36 rounded-md bg-slate-200 dark:bg-zinc-800" />
      <div className="flex items-end justify-between gap-3 pt-6">
        {[40, 65, 30, 85, 60, 45, 90, 70, 50, 75].map((val, idx) => (
          <div
            key={idx}
            style={{ height: `${val}%` }}
            className="w-full rounded-t-lg bg-slate-200/70 dark:bg-zinc-800/70"
          />
        ))}
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-slate-200/60 bg-[#F3EDF7]/40 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-40 rounded-md bg-slate-200 dark:bg-zinc-800" />
            <div className="h-4 w-16 rounded-md bg-slate-200 dark:bg-zinc-800" />
          </div>
          <div className="mt-2 h-3 w-3/4 rounded-md bg-slate-200/60 dark:bg-zinc-800/60" />
        </div>
      ))}
    </div>
  );
}

export function ChatLoadingBubble() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-semibold">
        KP
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-[#F3EDF7] px-4 py-3 dark:bg-zinc-900">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#6750A4]" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#6750A4]" style={{ animationDelay: "150ms" }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#6750A4]" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
