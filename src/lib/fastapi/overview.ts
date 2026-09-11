import { fetchFastApi } from "./client";
import { OverviewOut } from "./types";

export async function getOverview(): Promise<OverviewOut> {
  return fetchFastApi<OverviewOut>("/api/overview", {
    method: "GET",
  });
}
