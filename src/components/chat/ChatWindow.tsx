"use client";

import { useState } from "react";
import { sendChatMessage } from "@/actions/intelligence";
import { ChatComposer } from "./ChatComposer";
import { ChatMessage } from "./MessageBubble";
import { MessageList } from "./MessageList";

export function ChatWindow() {
  const [sessionId] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    let id = sessionStorage.getItem("kp_chat_session_id");
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `sess_${Date.now()}`;
      try {
        sessionStorage.setItem("kp_chat_session_id", id);
      } catch {
        // Fallback for private mode
      }
    }
    return id;
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend(question: string) {
    if (!question.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      text: question,
      createdAt: new Date().toISOString(),
      confidence: null,
      citations: [],
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await sendChatMessage(question, sessionId);

      if (result.success && result.data) {
        setMessages((prev) => [...prev, result.data!]);
      } else {
        const errorMessage: ChatMessage = {
          id: `err_${Date.now()}`,
          role: "assistant",
          text: result.error || "Unable to get an answer right now. Please check if your intelligence backend is connected.",
          createdAt: new Date().toISOString(),
          confidence: null,
          citations: [],
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: `err_${Date.now()}`,
        role: "assistant",
        text: "Failed to communicate with intelligence service.",
        createdAt: new Date().toISOString(),
        confidence: null,
        citations: [],
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-14rem)] min-h-[500px] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatComposer onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
