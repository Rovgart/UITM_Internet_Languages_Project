import { getMostPopularBooks } from "@/lib/books";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const MostPopularBooks = await getMostPopularBooks();
    if (MostPopularBooks) {
      return NextResponse.json(MostPopularBooks, {
        status: 200,
        statusText: "The list of most popular books",
      });
    }
    return NextResponse.json(MostPopularBooks, { status: 500 });
  } catch (error: any) {
    console.error(error?.message);
  }
};
