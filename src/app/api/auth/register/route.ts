import { NextResponse } from "next/server";
import { registerUser } from "@/actions/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await registerUser(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error?.includes("already exists") ? 409 : 400 },
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
