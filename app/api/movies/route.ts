// pages/api/movies.ts
import { getMovies } from "app/lib/movies";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("Handler started"); // Debugging line
  const data = await getMovies();
  console.log("Data received:", data); // Debugging line
  if (data) {
    // console.error("Error:", data.movies.error); // Debugging line
    return NextResponse.json(data, { status: 200 });
  } else {
    return NextResponse.json(data, { status: 500 });
  }
}
