import { getCurrentUser } from "@/lib/auth";
import { env } from "@/lib/env";
import { FastApiClientError } from "./errors";

export interface FastApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  params?: Record<string, string | number | boolean | null | undefined>;
  user?: {
    id: string;
    email: string;
  } | null;
}

/**
 * Server-only fetcher communicating with FastAPI backend.
 * Automatically resolves current user identity and attaches:
 * - X-User-Id: <MongoDB user ID>
 * - X-User-Email: <User email>
 */
export async function fetchFastApi<T>(
  endpoint: string,
  options: FastApiRequestOptions = {}
): Promise<T> {
  const { body, params, user: explicitUser, headers: customHeaders, ...restOptions } = options;

  // Resolve user context
  let userId = explicitUser?.id;
  let userEmail = explicitUser?.email;

  if (!userId || !userEmail) {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        userId = currentUser.id;
        userEmail = currentUser.email;
      }
    } catch {
      // Allow unauthenticated fallback for health checks or during tests
    }
  }

  // Build URL with query params
  const baseUrl = env.fastapiBaseUrl.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(`${baseUrl}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers = new Headers(customHeaders);

  if (userId) {
    headers.set("X-User-Id", userId);
  }
  if (userEmail) {
    headers.set("X-User-Email", userEmail);
  }

  let requestBody: BodyInit | undefined;

  if (body !== undefined) {
    if (body instanceof FormData) {
      requestBody = body;
      // Note: do not set Content-Type for FormData so fetch adds multipart boundary
    } else if (typeof body === "string") {
      requestBody = body;
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    } else {
      requestBody = JSON.stringify(body);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }
  }

  try {
    const response = await fetch(url.toString(), {
      ...restOptions,
      headers,
      body: requestBody,
      cache: "no-store",
    });

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      let errorDetails: unknown;

      try {
        const errorJson = await response.json();
        errorDetails = errorJson;

        if (typeof errorJson?.detail === "string") {
          errorMessage = errorJson.detail;
        } else if (Array.isArray(errorJson?.detail) && errorJson.detail.length > 0) {
          const firstDetail = errorJson.detail[0];
          errorMessage = firstDetail?.msg || JSON.stringify(firstDetail);
        } else if (typeof errorJson?.message === "string") {
          errorMessage = errorJson.message;
        }
      } catch {
        const text = await response.text().catch(() => "");
        if (text) {
          errorMessage = text;
        }
      }

      throw new FastApiClientError(errorMessage, response.status, errorDetails);
    }

    // 204 No Content
    if (response.status === 204) {
      return undefined as unknown as T;
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    if (error instanceof FastApiClientError) {
      throw error;
    }

    const message =
      error instanceof Error && error.message.includes("fetch failed")
        ? "KnowledgePulse intelligence services are currently unavailable."
        : error instanceof Error
        ? error.message
        : "Failed to connect to KnowledgePulse intelligence services.";

    throw new FastApiClientError(message, 503, error);
  }
}
