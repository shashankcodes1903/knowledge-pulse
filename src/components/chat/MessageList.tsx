import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { ChatLoadingBubble } from "@/components/shared/SkeletonPrimitives";
import { ChatMessage, MessageBubble } from "./MessageBubble";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8DEF8] text-[#6750A4] dark:bg-purple-950/60 dark:text-purple-300">
          <MessageSquare className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
          KnowledgePulse Assistant
        </h3>
        <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          Ask questions grounded in your connected documentation and websites.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && <ChatLoadingBubble />}

      <div ref={bottomRef} />
    </div>
  );
}
