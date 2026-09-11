// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchFastApi } from "@/lib/fastapi/client";
import { FastApiClientError, normalizeApiError } from "@/lib/fastapi/errors";

describe("FastAPI Client Layer", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("attaches X-User-Id and X-User-Email headers when user context is supplied", async () => {
    let capturedHeaders: Headers | undefined;

    global.fetch = vi.fn().mockImplementation(async (_url, options) => {
      capturedHeaders = options.headers as Headers;
      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    await fetchFastApi("/api/health", {
      user: { id: "user_123", email: "user@example.com" },
    });

    expect(capturedHeaders?.get("X-User-Id")).toBe("user_123");
    expect(capturedHeaders?.get("X-User-Email")).toBe("user@example.com");
  });

  it("appends query parameters correctly", async () => {
    let capturedUrl = "";

    global.fetch = vi.fn().mockImplementation(async (url) => {
      capturedUrl = String(url);
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    await fetchFastApi("/api/insights", {
      params: { period: "2026-W37" },
    });

    expect(capturedUrl).toContain("/api/insights?period=2026-W37");
  });

  it("handles 204 No Content response gracefully", async () => {
    global.fetch = vi.fn().mockImplementation(async () => {
      return new Response(null, { status: 204 });
    });

    const result = await fetchFastApi("/api/sources/123", {
      method: "DELETE",
    });

    expect(result).toBeUndefined();
  });

  it("extracts FastAPI detail string on non-2xx response", async () => {
    global.fetch = vi.fn().mockImplementation(async () => {
      return new Response(JSON.stringify({ detail: "No report yet. Run analytics first." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    });

    await expect(fetchFastApi("/api/reports/latest")).rejects.toThrow(
      "No report yet. Run analytics first."
    );
  });

  it("normalizes errors to human-readable ApiError format", () => {
    const error = new FastApiClientError("Resource not found", 404);
    const normalized = normalizeApiError(error);

    expect(normalized.message).toBe("Resource not found");
    expect(normalized.status).toBe(404);
  });
});
