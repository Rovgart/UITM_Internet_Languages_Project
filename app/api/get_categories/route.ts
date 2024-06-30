import { getBooksCategories } from "@/lib/books";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const booksCategories = await getBooksCategories();
    console.log(booksCategories);
    if (!booksCategories.ok) {
      return NextResponse.json(booksCategories, { status: 500 });
    } else {
      return NextResponse.json(booksCategories, { status: 200 });
    }
  } catch (error: any) {
    console.error(error?.message);
  }
}
