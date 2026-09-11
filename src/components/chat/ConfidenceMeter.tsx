import { formatConfidence } from "@/lib/formatters";

interface ConfidenceMeterProps {
  confidence: number | null | undefined;
}

export function ConfidenceMeter({ confidence }: ConfidenceMeterProps) {
  if (confidence === null || confidence === undefined) {
    return null;
  }

  const normalized = confidence <= 1 && confidence >= 0 ? confidence * 100 : confidence;
  const pct = Math.min(100, Math.max(0, Math.round(normalized)));

  return (
    <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
      <span className="font-medium text-slate-600 dark:text-slate-300">
        Retrieval confidence:
      </span>
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-700">
        <div
          style={{ width: `${pct}%` }}
          className={`h-full rounded-full transition-all duration-300 ${
            pct >= 75
              ? "bg-emerald-500"
              : pct >= 50
              ? "bg-amber-500"
              : "bg-rose-500"
          }`}
        />
      </div>
      <span className="font-semibold text-slate-700 dark:text-slate-200">
        {formatConfidence(confidence)}
      </span>
    </div>
  );
}
