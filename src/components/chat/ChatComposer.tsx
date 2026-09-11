"use client";

import { useState } from "react";
import { ArrowUp, Loader2 } from "lucide-react";

interface ChatComposerProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatComposer({ onSend, isLoading }: ChatComposerProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    onSend(input.trim());
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-slate-200/80 bg-white/90 p-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90"
    >
      <div className="relative flex items-center">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your knowledge..."
          disabled={isLoading}
          className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 py-3 pl-4 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#6750A4] focus:outline-hidden focus:ring-1 focus:ring-[#6750A4] disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800/70 dark:text-white"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#6750A4] text-white shadow-xs transition hover:bg-[#6750A4]/90 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </button>
      </div>
      <p className="mt-2 text-center text-[11px] text-slate-400">
        Responses are grounded in your connected sources. Press Enter to send, Shift+Enter for new line.
      </p>
    </form>
  );
}
