import { getBook } from "@/lib/books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const data = await getBook(slug);
    if (data) {
      console.log(data);
      return NextResponse.json(data); // Return the data as a JSON response
    } else {
      return NextResponse.json({ message: "Book not found" }, { status: 404 }); // Handle case where book is not found
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 }); // Return the error message with a 500 status code
  }
}
