import { Sparkles, User } from "lucide-react";
import { MessageOut } from "@/lib/fastapi/types";
import { CitationList } from "./CitationList";
import { ConfidenceMeter } from "./ConfidenceMeter";

export interface ChatMessage extends MessageOut {
  isError?: boolean;
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-3">
        <div className="max-w-xl rounded-3xl rounded-tr-sm bg-[#6750A4] px-5 py-3.5 text-sm text-white shadow-xs">
          <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-slate-300">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8DEF8] text-[#6750A4] dark:bg-purple-950/60 dark:text-purple-300">
        <Sparkles className="h-4 w-4" />
      </div>

      <div
        className={`max-w-2xl rounded-3xl rounded-tl-sm p-5 text-sm shadow-xs ${
          message.isError
            ? "border border-rose-200 bg-rose-50/70 text-rose-900 dark:border-rose-950 dark:bg-rose-950/30 dark:text-rose-200"
            : "border border-slate-200/70 bg-[#F3EDF7]/50 text-slate-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white"
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>

        {!message.isError && (
          <>
            <ConfidenceMeter confidence={message.confidence} />
            <CitationList citations={message.citations} />
          </>
        )}
      </div>
    </div>
  );
}
