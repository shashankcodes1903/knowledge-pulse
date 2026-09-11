"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import {
  createSource,
  deleteSource,
  reindexSource,
  sendChat,
  triggerAnalyticsBatch,
  uploadSource,
} from "@/lib/fastapi";
import { MessageOut, SourceOut } from "@/lib/fastapi/types";
import {
  analyticsRunSchema,
  chatRequestSchema,
  websiteSourceSchema,
} from "@/lib/validations/intelligence";

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Sends a chat question to FastAPI backend.
 */
export async function sendChatMessage(
  question: string,
  sessionId: string
): Promise<ActionResult<MessageOut>> {
  try {
    await requireUser();

    const parsed = chatRequestSchema.safeParse({ question, session_id: sessionId });
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Invalid chat request.",
      };
    }

    const message = await sendChat({
      question: parsed.data.question,
      session_id: parsed.data.session_id,
    });

    return {
      success: true,
      data: message,
    };
  } catch (error) {
    console.error("sendChatMessage error:", error);
    const message =
      error instanceof Error ? error.message : "Unable to get an answer right now.";
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Creates a website knowledge source.
 */
export async function createWebsiteSourceAction(
  location: string,
  label?: string | null
): Promise<ActionResult<SourceOut>> {
  try {
    await requireUser();

    const parsed = websiteSourceSchema.safeParse({ location, label });
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Invalid website URL.",
      };
    }

    const source = await createSource({
      kind: "website",
      location: parsed.data.location,
      label: parsed.data.label || null,
    });

    revalidatePath("/sources");
    return {
      success: true,
      data: source,
    };
  } catch (error) {
    console.error("createWebsiteSourceAction error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to connect website source.";
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Uploads a document source file (PDF, DOCX) via multipart/form-data.
 */
export async function uploadDocumentSourceAction(
  formData: FormData
): Promise<ActionResult<SourceOut>> {
  try {
    await requireUser();

    const file = formData.get("file");
    if (!file || !(file instanceof File) || file.size === 0) {
      return {
        success: false,
        error: "Please select a valid document file to upload.",
      };
    }

    const source = await uploadSource(formData);

    revalidatePath("/sources");
    return {
      success: true,
      data: source,
    };
  } catch (error) {
    console.error("uploadDocumentSourceAction error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to upload document source.";
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Reindexes an existing knowledge source.
 */
export async function reindexSourceAction(
  sourceId: string
): Promise<ActionResult<SourceOut>> {
  try {
    await requireUser();

    if (!sourceId) {
      return {
        success: false,
        error: "Source ID is required.",
      };
    }

    const source = await reindexSource(sourceId);
    revalidatePath("/sources");
    return {
      success: true,
      data: source,
    };
  } catch (error) {
    console.error("reindexSourceAction error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to reindex source.";
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Deletes an existing knowledge source.
 */
export async function deleteSourceAction(
  sourceId: string
): Promise<ActionResult<void>> {
  try {
    await requireUser();

    if (!sourceId) {
      return {
        success: false,
        error: "Source ID is required.",
      };
    }

    await deleteSource(sourceId);
    revalidatePath("/sources");
    return {
      success: true,
    };
  } catch (error) {
    console.error("deleteSourceAction error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to delete source.";
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Triggers the background analytics batch calculation.
 */
export async function triggerAnalyticsBatchAction(
  period?: string | null
): Promise<ActionResult<void>> {
  try {
    await requireUser();

    const parsed = analyticsRunSchema.safeParse({ period });
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Invalid analytics period.",
      };
    }

    await triggerAnalyticsBatch(parsed.data.period);

    revalidatePath("/overview");
    revalidatePath("/report");
    revalidatePath("/insights");
    return {
      success: true,
    };
  } catch (error) {
    console.error("triggerAnalyticsBatchAction error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to trigger analytics batch.";
    return {
      success: false,
      error: message,
    };
  }
}
