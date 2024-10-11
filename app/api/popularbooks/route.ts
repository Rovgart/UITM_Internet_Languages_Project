import { getMostPopularBooks } from "@/lib/books";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    if (req.method !== "GET") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
    if (!req.headers.has("Authorization")) {
      return NextResponse.json(
        { message: "Authorization failed" },
        { status: 401 }
      );
    }
    const MostPopularBooks = await getMostPopularBooks();
    return NextResponse.json(MostPopularBooks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
};
