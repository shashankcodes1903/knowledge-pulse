import { fetchFastApi } from "./client";
import { ChatRequest, MessageOut } from "./types";

export async function sendChat(data: ChatRequest): Promise<MessageOut> {
  return fetchFastApi<MessageOut>("/api/chat", {
    method: "POST",
    body: data,
  });
}
