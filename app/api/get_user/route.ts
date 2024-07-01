import { getUser } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user_id } = await req.json();
    const user = await getUser(user_id);
    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
