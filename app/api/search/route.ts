import { getBookByName } from "@/lib/books";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next/types";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const { q } = await req.json();

    if (!q || typeof q !== "string") {
      return NextResponse.json(
        { error: "Invalid query parameter" },
        { status: 400 }
      );
    }
    try {
      const book = await getBookByName(q);
      console.log(q);
      if (!book) {
        return NextResponse.json(
          { message: "Book not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(book, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    res.headers.set("Allow", "GET");
    return NextResponse.json({ message: "Invalid method", status: 405 });
  }
}
