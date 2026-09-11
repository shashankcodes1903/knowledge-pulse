"use client";

import { useState } from "react";
import {
  AlertTriangle,
  FileCode,
  FileText,
  Globe,
  Loader2,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { deleteSourceAction, reindexSourceAction } from "@/actions/intelligence";
import { SourceOut } from "@/lib/fastapi/types";
import { formatDateTime, formatNumber } from "@/lib/formatters";
import { SourceStatusBadge } from "./SourceStatusBadge";

interface SourceCardProps {
  source: SourceOut;
  onRefresh?: () => void;
}

export function SourceCard({ source, onRefresh }: SourceCardProps) {
  const [isReindexing, setIsReindexing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const kindIcons = {
    website: Globe,
    pdf: FileText,
    docx: FileCode,
    text: FileText,
  };
  const Icon = kindIcons[source.kind as keyof typeof kindIcons] || FileText;

  async function handleReindex() {
    setIsReindexing(true);
    setActionError(null);

    try {
      const res = await reindexSourceAction(source.id);
      if (!res.success) {
        setActionError(res.error || "Failed to reindex.");
      } else {
        onRefresh?.();
      }
    } catch {
      setActionError("Error reindexing source.");
    } finally {
      setIsReindexing(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    setActionError(null);

    try {
      const res = await deleteSourceAction(source.id);
      if (!res.success) {
        setActionError(res.error || "Failed to delete.");
        setIsDeleting(false);
      } else {
        onRefresh?.();
      }
    } catch {
      setActionError("Error deleting source.");
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-[#F3EDF7]/30 p-5 shadow-xs transition hover:border-[#6750A4]/30 hover:bg-[#F3EDF7]/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E8DEF8] text-[#6750A4] dark:bg-purple-950/60 dark:text-purple-300">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                {source.label || source.location}
              </h4>
              <p className="mt-0.5 max-w-md truncate text-xs text-slate-500 dark:text-slate-400">
                {source.location}
              </p>
            </div>
          </div>

          <SourceStatusBadge status={source.status} />
        </div>

        {/* Indexing stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-white/60 p-2.5 text-center text-xs dark:bg-zinc-850/60">
          <div>
            <span className="block font-semibold text-slate-900 dark:text-white">
              {formatNumber(source.pageCount)}
            </span>
            <span className="text-[11px] text-slate-500">Pages</span>
          </div>
          <div>
            <span className="block font-semibold text-slate-900 dark:text-white">
              {formatNumber(source.chunkCount)}
            </span>
            <span className="text-[11px] text-slate-500">Chunks</span>
          </div>
          <div>
            <span className="block truncate font-semibold text-slate-900 dark:text-white">
              {source.lastIndexedAt ? formatDateTime(source.lastIndexedAt) : "Never"}
            </span>
            <span className="text-[11px] text-slate-500">Last Indexed</span>
          </div>
        </div>

        {/* Source error if present */}
        {source.error && (
          <div className="mt-3 flex items-start gap-2 rounded-2xl bg-rose-50 p-2.5 text-xs text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
            <span className="break-all">{source.error}</span>
          </div>
        )}

        {actionError && (
          <div className="mt-2 text-xs text-rose-600 dark:text-rose-400">
            {actionError}
          </div>
        )}
      </div>

      {/* Row Actions */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-200/60 pt-3 dark:border-zinc-800">
        <span className="text-[11px] capitalize text-slate-400 dark:text-slate-500">
          {source.kind} source
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReindex}
            disabled={isReindexing || isDeleting}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-xs transition hover:bg-slate-50 disabled:opacity-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-slate-200"
          >
            {isReindexing ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin text-[#6750A4]" />
                <span>Reindexing…</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-3 w-3 text-slate-500" />
                <span>Reindex</span>
              </>
            )}
          </button>

          {confirmDelete ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-rose-700 disabled:opacity-50 active:scale-95"
              >
                {isDeleting ? <Loader2 className="h-3 w-3 animate-spin" /> : "Confirm"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-full px-2 py-1 text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              disabled={isReindexing || isDeleting}
              className="inline-flex items-center rounded-full p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50 dark:hover:bg-rose-950/40"
              aria-label="Delete source"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
