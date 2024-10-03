import { getTrendingAuthors } from "@/lib/authors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authors = await getTrendingAuthors(); // Fetch the trending authors
    console.log(authors);
    return NextResponse.json({ authors }, { status: 200 }); // Return the authors in the response
  } catch (error) {
    console.error("Error fetching trending authors:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
