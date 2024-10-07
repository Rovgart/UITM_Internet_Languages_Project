import { getBook } from "@/lib/books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!req.headers.has("Authorization")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (req.method !== "GET") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
    const slug = params.id;
    console.log(slug);
    const data = await getBook(slug);
    if (data) {
      console.log(data);
      return NextResponse.json(data, { status: 200 }); // Return the data as a JSON response
    } else {
      return NextResponse.json({ message: "Book not found" }, { status: 404 }); // Handle case where book is not found
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 }); // Return the error message with a 500 status code
  }
}
