import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import {
  deleteSessionCookie,
  getSessionPayload,
  setSessionCookie,
} from "@/lib/session";
import { SafeUser, User, toSafeUser } from "@/models/user";

export async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getSessionPayload();
    if (!session) {
      return null;
    }

    await connectToDatabase();
    const user = await User.findById(session.userId);
    if (!user) {
      return null;
    }

    return toSafeUser(user);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest?: string }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("DYNAMIC_SERVER_USAGE")
    ) {
      throw error;
    }
    console.error("Failed to fetch current user:", error);
    return null;
  }
}

export async function requireUser(): Promise<SafeUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function createSession(
  userId: string,
  email: string,
): Promise<void> {
  await setSessionCookie({ userId, email });
}

export async function clearSession(): Promise<void> {
  await deleteSessionCookie();
}
