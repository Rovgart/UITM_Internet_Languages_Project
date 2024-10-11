import { getBookByName } from "@/lib/books";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  console.log("Request received", req.method, req.url);
  console.log("Query parameter", req.nextUrl.searchParams.get("q"));

  if (!q || typeof q !== "string") {
    return NextResponse.json(
      { error: "Invalid query parameter" },
      { status: 400 }
    );
  }
  try {
    const book = await getBookByName(q);
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(book, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
