import { fetchFastApi } from "./client";
import { EvaluationOut } from "./types";

export async function getLatestEvaluation(): Promise<EvaluationOut> {
  return fetchFastApi<EvaluationOut>("/api/evaluation/latest", {
    method: "GET",
  });
}
