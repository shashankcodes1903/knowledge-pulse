export default function ReportLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-5 dark:border-zinc-800">
        <div>
          <div className="h-8 w-32 rounded-md bg-slate-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-72 rounded-md bg-slate-200/60 dark:bg-zinc-800/60" />
        </div>
      </div>

      <div className="h-64 rounded-3xl bg-[#F3EDF7]/40 dark:bg-zinc-900/40" />

      <div className="space-y-4">
        <div className="h-5 w-40 rounded-md bg-slate-200 dark:bg-zinc-800" />
        <div className="h-48 rounded-3xl bg-[#F3EDF7]/40 dark:bg-zinc-900/40" />
        <div className="h-48 rounded-3xl bg-[#F3EDF7]/40 dark:bg-zinc-900/40" />
      </div>
    </div>
  );
}
