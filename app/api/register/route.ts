import { NextRequest, NextResponse } from "next/server";
import { registerUserToDatabase } from "@/lib/register";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    const data = await registerUserToDatabase(email, password);
    if (data) {
      return data;
    }
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
