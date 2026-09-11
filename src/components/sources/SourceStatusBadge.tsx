import { AlertCircle, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { SourceStatus } from "@/lib/fastapi/types";

interface SourceStatusBadgeProps {
  status: SourceStatus;
  className?: string;
}

export function SourceStatusBadge({ status, className = "" }: SourceStatusBadgeProps) {
  const normalized = status.toLowerCase();

  if (normalized === "ready") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 ${className}`}
      >
        <CheckCircle2 className="h-3 w-3" />
        Ready
      </span>
    );
  }

  if (normalized === "processing") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-[#6750A4] dark:bg-purple-950/50 dark:text-purple-300 ${className}`}
      >
        <Loader2 className="h-3 w-3 animate-spin" />
        Processing
      </span>
    );
  }

  if (normalized === "pending") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 ${className}`}
      >
        <Clock className="h-3 w-3" />
        Pending
      </span>
    );
  }

  if (normalized === "failed") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 ${className}`}
      >
        <AlertCircle className="h-3 w-3" />
        Failed
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-zinc-800 dark:text-slate-300 ${className}`}
    >
      {status}
    </span>
  );
}
