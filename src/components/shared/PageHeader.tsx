interface PageHeaderProps {
  title: string;
  description: string;
  period?: string | null;
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  period,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/60 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {title}
          </h1>
          {period && (
            <span className="inline-flex items-center rounded-full bg-[#E8DEF8] px-3 py-0.5 text-xs font-medium text-[#1D192B] dark:bg-purple-950/60 dark:text-purple-200">
              {period}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>

      {actions && <div className="flex items-center gap-2.5">{actions}</div>}
    </div>
  );
}
