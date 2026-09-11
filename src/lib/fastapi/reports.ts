import { fetchFastApi } from "./client";
import { ReportOut } from "./types";

export async function getLatestReport(): Promise<ReportOut> {
  return fetchFastApi<ReportOut>("/api/reports/latest", {
    method: "GET",
  });
}

export async function listReports(): Promise<ReportOut[]> {
  return fetchFastApi<ReportOut[]>("/api/reports", {
    method: "GET",
  });
}
