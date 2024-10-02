import { logout } from "@/lib/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader?.startsWith("Bearer")) {
      return NextResponse.json({
        error: "Invalid or missing authorization header",
      });
    }
    const access_token = authHeader.split(" ")[1];
    await logout(access_token);

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during logout", error);
      return NextResponse.json({ message: error?.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
