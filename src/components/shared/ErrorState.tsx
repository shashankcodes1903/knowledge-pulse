import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Intelligence Services Notice",
  message = "KnowledgePulse intelligence services are currently unavailable.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-rose-200/80 bg-rose-50/50 px-6 py-10 text-center dark:border-rose-950/60 dark:bg-rose-950/20">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-900/60 dark:text-rose-400">
        <AlertCircle className="h-5 w-5" />
      </div>
      <h3 className="mt-3.5 text-base font-semibold text-rose-900 dark:text-rose-200">
        {title}
      </h3>
      <p className="mt-1 max-w-md text-sm text-rose-700 dark:text-rose-300">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-1.5 text-xs font-medium text-white shadow-xs transition hover:bg-rose-700 active:scale-95"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </button>
      )}
    </div>
  );
}
