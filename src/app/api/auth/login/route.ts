import { NextResponse } from "next/server";
import { loginUser } from "@/actions/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await loginUser(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 },
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
