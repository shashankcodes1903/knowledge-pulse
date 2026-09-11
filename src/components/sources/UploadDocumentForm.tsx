"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUp, Loader2, UploadCloud } from "lucide-react";
import { uploadDocumentSourceAction } from "@/actions/intelligence";

export function UploadDocumentForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await uploadDocumentSourceAction(formData);
      if (!res.success) {
        setError(res.error || "Failed to upload document.");
      } else {
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred while uploading document.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form
      onSubmit={handleUpload}
      className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-zinc-800">
        <UploadCloud className="h-4 w-4 text-[#6750A4]" />
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
          Upload Knowledge Document
        </h4>
      </div>

      <div className="mt-4">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center cursor-pointer transition hover:border-[#6750A4]/50 dark:border-zinc-700 dark:bg-zinc-800/50"
        >
          <FileUp className="h-8 w-8 text-[#6750A4]" />
          <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {selectedFile ? selectedFile.name : "Click to select a file"}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Supports PDF and DOCX documentation
          </p>
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {error && (
          <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">{error}</p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        {selectedFile && (
          <button
            type="button"
            onClick={() => {
              setSelectedFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="rounded-full px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
          >
            Clear
          </button>
        )}
        <button
          type="submit"
          disabled={!selectedFile || isUploading}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#6750A4] px-4 py-1.5 text-xs font-medium text-white shadow-xs transition hover:bg-[#6750A4]/90 disabled:opacity-50 active:scale-95"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Uploading…</span>
            </>
          ) : (
            <span>Upload Document</span>
          )}
        </button>
      </div>
    </form>
  );
}
