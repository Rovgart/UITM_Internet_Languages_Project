import { getTrendingAuthors } from "@/lib/authors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (req.headers.has("Authorization")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (req.method !== "GET") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
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
