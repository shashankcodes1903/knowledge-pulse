export interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

export class FastApiClientError extends Error implements ApiError {
  public readonly status: number;
  public readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "FastApiClientError";
    this.status = status;
    this.details = details;
  }
}

/**
 * Normalizes any error or response into a clean, human-readable ApiError.
 */
export function normalizeApiError(error: unknown, fallbackMessage = "An error occurred with KnowledgePulse intelligence services."): ApiError {
  if (error instanceof FastApiClientError) {
    return {
      message: error.message,
      status: error.status,
      details: error.details,
    };
  }

  if (error && typeof error === "object") {
    const maybeError = error as { message?: string; status?: number; details?: unknown; detail?: unknown };
    if (typeof maybeError.message === "string") {
      return {
        message: maybeError.message,
        status: typeof maybeError.status === "number" ? maybeError.status : 500,
        details: maybeError.details ?? maybeError.detail,
      };
    }

    // FastAPI detail can be string or array
    if (typeof maybeError.detail === "string") {
      return {
        message: maybeError.detail,
        status: typeof maybeError.status === "number" ? maybeError.status : 500,
        details: maybeError.detail,
      };
    }
  }

  return {
    message: fallbackMessage,
    status: 500,
  };
}
