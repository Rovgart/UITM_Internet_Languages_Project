import { getBooksCategories } from "@/lib/books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (req.method !== "GET") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
    if (!req.headers.has("Authorization")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const booksCategories = await getBooksCategories();
    if (!booksCategories) {
      return NextResponse.json(booksCategories, { status: 500 });
    } else {
      return NextResponse.json(booksCategories, { status: 200 });
    }
  } catch (error: any) {
    console.error(error?.message);
  }
}
