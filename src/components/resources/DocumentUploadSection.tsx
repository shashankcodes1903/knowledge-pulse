"use client";

import { File, FileUp, Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  addDocumentMetadataAction,
  removeDocumentAction,
} from "@/actions/user";
import { UserDocumentItem } from "@/models/user";

interface DocumentUploadSectionProps {
  initialDocuments: UserDocumentItem[];
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function DocumentUploadSection({
  initialDocuments,
}: DocumentUploadSectionProps) {
  const [documents, setDocuments] =
    useState<UserDocumentItem[]>(initialDocuments);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFilesSelected(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const docMetadata = {
          id: crypto.randomUUID(),
          name: file.name,
          type: file.type || "application/octet-stream",
          size: file.size,
        };

        const result = await addDocumentMetadataAction(docMetadata);
        if (result.success && result.data) {
          setDocuments((prev) => [...prev, result.data!]);
        } else {
          setError(result.error || "Failed to add document metadata.");
        }
      }
    } catch {
      setError("An unexpected error occurred while adding document metadata.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function handleRemove(id: string) {
    setError(null);
    try {
      const result = await removeDocumentAction(id);
      if (result.success) {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
      } else {
        setError(result.error || "Failed to remove document.");
      }
    } catch {
      setError("Failed to remove document.");
    }
  }

  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-md-surface-container p-6 sm:p-8 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-md-on-surface">
          1. Upload Document Sources
        </h2>
        <p className="mt-1 text-sm text-md-on-surface-variant">
          Provide technical documentation, user guides, product specs, or FAQs.
        </p>
      </div>

      {/* File Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFilesSelected(e.dataTransfer.files);
        }}
        className="flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-md-primary/30 bg-md-surface-container-low/60 p-8 text-center transition-all duration-200 hover:border-md-primary hover:bg-md-primary/5 cursor-pointer"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-md-secondary-container text-md-on-secondary-container mb-3">
          <FileUp className="h-6 w-6" aria-hidden="true" />
        </div>

        <p className="text-sm font-semibold text-md-on-surface">
          Click to browse or drag & drop documents here
        </p>
        <p className="mt-1 text-xs text-md-on-surface-variant">
          Supported formats: PDF, DOCX, TXT, MD, Markdown (up to 50MB)
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt,.md,.markdown"
          className="hidden"
          onChange={(e) => handleFilesSelected(e.target.files)}
        />
      </div>

      {isUploading && (
        <p className="mt-3 text-center text-xs text-md-primary animate-pulse">
          Saving document metadata...
        </p>
      )}

      {error && (
        <p className="mt-3 text-xs text-rose-600 font-medium">{error}</p>
      )}

      {/* Document List */}
      {documents.length > 0 && (
        <div className="mt-6 space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-md-on-surface-variant">
            Added Documents ({documents.length})
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 overflow-hidden">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3.5 sm:px-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-md-secondary-container/60 text-md-primary">
                    <File className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {doc.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatBytes(doc.size)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(doc.id)}
                  aria-label={`Remove document ${doc.name}`}
                  className="ml-3 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
