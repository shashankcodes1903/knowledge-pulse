import { describe, expect, it } from "vitest";
import { toSafeUser } from "@/models/user";

describe("User Model Safe Projection", () => {
  it("never exposes password or verification code in safe user output", () => {
    const rawUser = {
      _id: "650000000000000000000001",
      name: "Alice Johnson",
      email: "alice@acme.com",
      organization_name: "Acme Analytics",
      password: "$2a$10$verysecretpasswordhash",
      verifyCode: "829104",
      verifyCodeExpiry: new Date(Date.now() + 3600000),
      isVerified: true,
      subscription: "active" as const,
      services: ["docs-mismatch", "chatbot"],
      documents: [
        {
          id: "doc-1",
          name: "Guide.pdf",
          addedAt: new Date(),
        },
      ],
      resources: [
        {
          id: "res-1",
          title: "Docs site",
          url: "https://docs.acme.com",
          addedAt: new Date(),
        },
      ],
    };

    const safe = toSafeUser(rawUser);

    expect(safe.id).toBe("650000000000000000000001");
    expect(safe.name).toBe("Alice Johnson");
    expect(safe.email).toBe("alice@acme.com");
    expect(safe.organization_name).toBe("Acme Analytics");
    expect(safe.isVerified).toBe(true);
    expect(safe.subscription).toBe("active");
    expect(safe.services).toEqual(["docs-mismatch", "chatbot"]);
    expect(safe.documents).toHaveLength(1);
    expect(safe.resources).toHaveLength(1);

    // Verify secret fields are stripped
    expect("password" in safe).toBe(false);
    expect("verifyCode" in safe).toBe(false);
    expect("verifyCodeExpiry" in safe).toBe(false);
  });
});
