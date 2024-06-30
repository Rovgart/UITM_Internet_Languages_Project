import { getBook } from "@/lib/books";
import { login } from "@/lib/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json(); // Ensure you are destructuring the book_id from the JSON body
    const data = await login(book_id);
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
