import { getTopSellingBooks } from "@/lib/books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (!req.headers.has("Authorization")) {
      return NextResponse.json(
        { message: "Missing authorization token" },
        { status: 401 }
      );
    }
    if (req.method !== "GET")
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );

    const data = await getTopSellingBooks();
    return data;
  } catch (error) {
    throw error;
  }
}
