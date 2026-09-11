export default function InsightDetailLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-4 w-28 rounded-md bg-slate-200 dark:bg-zinc-800" />

      <div className="flex items-center justify-between border-b border-slate-200/60 pb-5 dark:border-zinc-800">
        <div>
          <div className="h-8 w-60 rounded-md bg-slate-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-40 rounded-md bg-slate-200/60 dark:bg-zinc-800/60" />
        </div>
        <div className="h-6 w-24 rounded-full bg-slate-200 dark:bg-zinc-800" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-2xl bg-[#F3EDF7]/40 dark:bg-zinc-900/40"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-64 rounded-3xl bg-[#F3EDF7]/40 dark:bg-zinc-900/40" />
        <div className="h-64 rounded-3xl bg-[#F3EDF7]/40 dark:bg-zinc-900/40" />
      </div>
    </div>
  );
}
