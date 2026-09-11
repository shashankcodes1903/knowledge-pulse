import { BookOpen } from "lucide-react";
import { CitationOut } from "@/lib/fastapi/types";
import { formatPercent } from "@/lib/formatters";

interface CitationItemProps {
  citation: CitationOut;
  index: number;
}

export function CitationItem({ citation, index }: CitationItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-3 text-xs shadow-2xs dark:border-zinc-800 dark:bg-zinc-850/80">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
          <BookOpen className="h-3.5 w-3.5 text-[#6750A4]" />
          <span>
            {index + 1}. {citation.sourceLabel}
          </span>
          {citation.headingPath && (
            <span className="text-slate-400">/ {citation.headingPath}</span>
          )}
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-zinc-800 dark:text-slate-300">
          {formatPercent(citation.similarity)} match
        </span>
      </div>

      <p className="mt-2 line-clamp-3 text-slate-600 italic dark:text-slate-300">
        &ldquo;{citation.excerpt}&rdquo;
      </p>
    </div>
  );
}
