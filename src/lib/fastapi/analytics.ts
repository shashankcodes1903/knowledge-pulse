import { fetchFastApi } from "./client";

export async function triggerAnalyticsBatch(period?: string | null): Promise<void> {
  return fetchFastApi<void>("/api/analytics/run", {
    method: "POST",
    params: period ? { period } : undefined,
  });
}
