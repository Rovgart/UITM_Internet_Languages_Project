import { getBooks } from "@/lib/books";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const books = await getBooks();
    console.log(books);
    if (!books.ok) {
      return NextResponse.json(books, { status: 500 });
    } else {
      return NextResponse.json(books, { status: 200 });
    }
  } catch (error) {
    console.error(error?.message);
  }
}
