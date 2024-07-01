import { getSession } from "@/lib/lib";
import { KeyLike } from "crypto";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = "SECRET_KEY" as KeyLike;
export default async function POST(req: NextRequest, res: NextResponse) {
  const token = await getSession();

  if (!token) {
    return NextResponse.json({ message: "Need authorization", status: 401 });
  }

  try {
    const decoded = jwtVerify(token, SECRET_KEY);
    return NextResponse.json({
      message: "Session exists",
      status: 200,
      token: decoded,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Invalid token or expired",
      status: 401,
    });
  }
}
