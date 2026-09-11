import { fetchFastApi } from "./client";
import { SourceCreate, SourceOut } from "./types";

export async function listSources(): Promise<SourceOut[]> {
  return fetchFastApi<SourceOut[]>("/api/sources", {
    method: "GET",
  });
}

export async function createSource(data: SourceCreate): Promise<SourceOut> {
  return fetchFastApi<SourceOut>("/api/sources", {
    method: "POST",
    body: data,
  });
}

export async function uploadSource(formData: FormData): Promise<SourceOut> {
  return fetchFastApi<SourceOut>("/api/sources/upload", {
    method: "POST",
    body: formData,
  });
}

export async function reindexSource(sourceId: string): Promise<SourceOut> {
  return fetchFastApi<SourceOut>(`/api/sources/${encodeURIComponent(sourceId)}/reindex`, {
    method: "POST",
  });
}

export async function deleteSource(sourceId: string): Promise<void> {
  return fetchFastApi<void>(`/api/sources/${encodeURIComponent(sourceId)}`, {
    method: "DELETE",
  });
}
