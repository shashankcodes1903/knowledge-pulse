"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileSearch } from "lucide-react";
import { CitationOut } from "@/lib/fastapi/types";
import { CitationItem } from "./CitationItem";

interface CitationListProps {
  citations: CitationOut[];
}

export function CitationList({ citations }: CitationListProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!citations || citations.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 border-t border-slate-200/60 pt-2.5 dark:border-zinc-800">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs font-medium text-[#6750A4] transition hover:text-[#6750A4]/80 dark:text-purple-300"
      >
        <FileSearch className="h-3.5 w-3.5" />
        <span>
          {citations.length} Grounded Source{citations.length === 1 ? "" : "s"}
        </span>
        {isOpen ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2.5 space-y-2">
          {citations.map((citation, idx) => (
            <CitationItem
              key={`${citation.chunkId}-${idx}`}
              citation={citation}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}
