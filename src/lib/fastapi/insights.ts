import { fetchFastApi } from "./client";
import { InsightDetailOut, InsightOut } from "./types";

export async function listInsights(period?: string | null): Promise<InsightOut[]> {
  return fetchFastApi<InsightOut[]>("/api/insights", {
    method: "GET",
    params: period ? { period } : undefined,
  });
}

export async function getInsight(insightId: string): Promise<InsightDetailOut> {
  return fetchFastApi<InsightDetailOut>(`/api/insights/${encodeURIComponent(insightId)}`, {
    method: "GET",
  });
}
