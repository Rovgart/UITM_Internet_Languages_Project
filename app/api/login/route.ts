import { login } from "@/lib/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = { email, password };
    const data = await login(user);
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are requires" },
        { status: 400 }
      );
    }
    if (data) {
      return NextResponse.json({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error. Please try again" },
      { status: 500 }
    );
  }
}
