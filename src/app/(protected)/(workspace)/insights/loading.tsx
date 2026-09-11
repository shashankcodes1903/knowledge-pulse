export default function InsightsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex animate-pulse items-center justify-between border-b border-slate-200/60 pb-5 dark:border-zinc-800">
        <div>
          <div className="h-8 w-36 rounded-md bg-slate-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-80 rounded-md bg-slate-200/60 dark:bg-zinc-800/60" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-60 animate-pulse rounded-3xl border border-slate-200/60 bg-[#F3EDF7]/40 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
          />
        ))}
      </div>
    </div>
  );
}
