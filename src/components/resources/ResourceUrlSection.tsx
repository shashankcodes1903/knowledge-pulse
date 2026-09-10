"use client";

import { ExternalLink, Globe, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { addResourceUrlAction, removeResourceAction } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserResourceItem } from "@/models/user";

interface ResourceUrlSectionProps {
  initialResources: UserResourceItem[];
}

export function ResourceUrlSection({
  initialResources,
}: ResourceUrlSectionProps) {
  const [resources, setResources] =
    useState<UserResourceItem[]>(initialResources);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAddUrl(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const result = await addResourceUrlAction({
        url: url.trim(),
        title: title.trim() || undefined,
      });

      if (result.success && result.data) {
        setResources((prev) => [...prev, result.data!]);
        setUrl("");
        setTitle("");
      } else {
        setError(result.error || "Failed to add URL resource.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRemove(id: string) {
    setError(null);
    try {
      const result = await removeResourceAction(id);
      if (result.success) {
        setResources((prev) => prev.filter((r) => r.id !== id));
      } else {
        setError(result.error || "Failed to remove resource.");
      }
    } catch {
      setError("Failed to remove resource.");
    }
  }

  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-md-surface-container p-6 sm:p-8 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-md-on-surface">
          2. Connect Web & Documentation URLs
        </h2>
        <p className="mt-1 text-sm text-md-on-surface-variant">
          Add public documentation pages, Notion wikis, GitBook links, or API references.
        </p>
      </div>

      {/* URL Input Form */}
      <form onSubmit={handleAddUrl} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <Input
              type="url"
              placeholder="https://docs.yourcompany.com/api"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="Title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || !url.trim()}
            className="h-10 rounded-full bg-md-primary px-5 text-sm font-semibold text-white shadow-sm hover:bg-md-primary/90 active:scale-95 disabled:opacity-50"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            {isSubmitting ? "Adding..." : "Add Resource URL"}
          </Button>
        </div>

        {error && (
          <p className="text-xs text-rose-600 font-medium">{error}</p>
        )}
      </form>

      {/* Resources List */}
      {resources.length > 0 && (
        <div className="mt-6 space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-md-on-surface-variant">
            Added Resource URLs ({resources.length})
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 overflow-hidden">
            {resources.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 sm:px-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-md-secondary-container/60 text-md-primary">
                    <Globe className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {item.title || item.url}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-md-primary hover:underline truncate max-w-sm sm:max-w-md"
                    >
                      {item.url}
                      <ExternalLink className="h-3 w-3 inline" />
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remove resource ${item.url}`}
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
