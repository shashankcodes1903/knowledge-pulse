export default function AskLoading() {
  return (
    <div className="space-y-6">
      <div className="flex animate-pulse items-center justify-between border-b border-slate-200/60 pb-5 dark:border-zinc-800">
        <div>
          <div className="h-8 w-28 rounded-md bg-slate-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-60 rounded-md bg-slate-200/60 dark:bg-zinc-800/60" />
        </div>
      </div>

      <div className="h-[calc(100vh-14rem)] min-h-[500px] animate-pulse rounded-3xl border border-slate-200/80 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/60" />
    </div>
  );
}
