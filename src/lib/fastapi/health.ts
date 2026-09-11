import { fetchFastApi } from "./client";

export async function getHealth(): Promise<{ status: "connected" | "unavailable"; message?: string }> {
  try {
    await fetchFastApi("/api/health", {
      method: "GET",
    });
    return { status: "connected" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unavailable";
    return { status: "unavailable", message };
  }
}
