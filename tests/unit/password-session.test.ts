// @vitest-environment node
import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/password";
import { signSessionToken, verifySessionToken } from "@/lib/session";

describe("Password and Session Security", () => {
  it("correctly hashes and verifies passwords", async () => {
    const plain = "mypassword123!";
    const hash = await hashPassword(plain);

    expect(hash).not.toBe(plain);
    expect(hash.startsWith("$2")).toBe(true);

    const isMatch = await verifyPassword(plain, hash);
    expect(isMatch).toBe(true);

    const isWrong = await verifyPassword("wrongpassword", hash);
    expect(isWrong).toBe(false);
  });

  it("signs and verifies JWT session tokens", async () => {
    const payload = {
      userId: "user-abc-123",
      email: "test@knowledgepulse.com",
    };

    const token = await signSessionToken(payload);
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3);

    const decoded = await verifySessionToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.email).toBe(payload.email);
  });

  it("fails verification for invalid token", async () => {
    const invalid = await verifySessionToken("invalid.token.here");
    expect(invalid).toBeNull();
  });
});
