"use server";

import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import {
  DocumentMetadataValues,
  ResourceUrlFormValues,
  documentMetadataSchema,
  resourceUrlSchema,
} from "@/lib/validations/resources";
import {
  ServiceSelectionValues,
  serviceSelectionSchema,
} from "@/lib/validations/services";
import {
  User,
  UserDocumentItem,
  UserResourceItem,
} from "@/models/user";
import { ActionResult } from "./auth";

export async function saveSelectedServices(
  rawValues: ServiceSelectionValues | { services: string[] },
): Promise<ActionResult<{ services: string[] }>> {
  try {
    const user = await requireUser();
    const validated = serviceSelectionSchema.safeParse(rawValues);

    if (!validated.success) {
      const firstIssue = validated.error.issues[0]?.message;
      return {
        success: false,
        error: firstIssue || "Invalid service selection.",
      };
    }

    await connectToDatabase();
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { $set: { services: validated.data.services } },
      { new: true },
    );

    if (!updatedUser) {
      return {
        success: false,
        error: "User account not found.",
      };
    }

    revalidatePath("/services");
    revalidatePath("/profile");

    return {
      success: true,
      data: { services: updatedUser.services },
      redirectUrl: "/onboarding/resources",
    };
  } catch (error) {
    console.error("Save services error:", error);
    return {
      success: false,
      error: "Failed to save selected services. Please try again.",
    };
  }
}

export async function addResourceUrlAction(
  rawValues: ResourceUrlFormValues,
): Promise<ActionResult<UserResourceItem>> {
  try {
    const user = await requireUser();
    const validated = resourceUrlSchema.safeParse(rawValues);

    if (!validated.success) {
      const firstIssue = validated.error.issues[0]?.message;
      return {
        success: false,
        error: firstIssue || "Invalid resource URL.",
      };
    }

    const newResource: UserResourceItem = {
      id: crypto.randomUUID(),
      title: validated.data.title || validated.data.url,
      url: validated.data.url,
      addedAt: new Date(),
    };

    await connectToDatabase();
    await User.findByIdAndUpdate(user.id, {
      $push: { resources: newResource },
    });

    revalidatePath("/onboarding/resources");
    revalidatePath("/profile");

    return {
      success: true,
      data: newResource,
    };
  } catch (error) {
    console.error("Add resource error:", error);
    return {
      success: false,
      error: "Failed to add resource URL. Please try again.",
    };
  }
}

export async function removeResourceAction(
  resourceId: string,
): Promise<ActionResult> {
  try {
    const user = await requireUser();
    await connectToDatabase();

    await User.findByIdAndUpdate(user.id, {
      $pull: { resources: { id: resourceId } },
    });

    revalidatePath("/onboarding/resources");
    revalidatePath("/profile");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Remove resource error:", error);
    return {
      success: false,
      error: "Failed to remove resource.",
    };
  }
}

export async function addDocumentMetadataAction(
  rawValues: DocumentMetadataValues,
): Promise<ActionResult<UserDocumentItem>> {
  try {
    const user = await requireUser();
    const validated = documentMetadataSchema.safeParse(rawValues);

    if (!validated.success) {
      const firstIssue = validated.error.issues[0]?.message;
      return {
        success: false,
        error: firstIssue || "Invalid document metadata.",
      };
    }

    const newDoc: UserDocumentItem = {
      id: validated.data.id || crypto.randomUUID(),
      name: validated.data.name,
      url: validated.data.url || undefined,
      type: validated.data.type || "application/octet-stream",
      size: validated.data.size || 0,
      addedAt: new Date(),
    };

    await connectToDatabase();
    await User.findByIdAndUpdate(user.id, {
      $push: { documents: newDoc },
    });

    revalidatePath("/onboarding/resources");
    revalidatePath("/profile");

    return {
      success: true,
      data: newDoc,
    };
  } catch (error) {
    console.error("Add document error:", error);
    return {
      success: false,
      error: "Failed to save document metadata.",
    };
  }
}

export async function removeDocumentAction(
  documentId: string,
): Promise<ActionResult> {
  try {
    const user = await requireUser();
    await connectToDatabase();

    await User.findByIdAndUpdate(user.id, {
      $pull: { documents: { id: documentId } },
    });

    revalidatePath("/onboarding/resources");
    revalidatePath("/profile");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Remove document error:", error);
    return {
      success: false,
      error: "Failed to remove document.",
    };
  }
}
