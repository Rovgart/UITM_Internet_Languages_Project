import { getTrendingAuthors } from "@/lib/authors";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * tags:
 *   - name: Authors
 *     description: Endpoints related to authors
 *
 * /api/authors/trending_authors:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Retrieve top selling books
 *     description: Returns a collection of most sold books.
 *     responses:
 *       200:
 *         description: Successfully returned a collection of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   description: Array of books retrieved.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The book's unique identifier.
 *                       title:
 *                         type: string
 *                         description: The title of the book.
 *                       author:
 *                         type: string
 *                         description: The name of the author.
 *                       img:
 *                         type: string
 *                         description: URL of the book's image.
 *                         format: uri
 *       400:
 *         description: Bad Request. Invalid input or missing required fields.
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
export async function GET(req: NextRequest) {
  try {
    if (req.method !== "GET") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
    if (!req.headers.has("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const authors = await getTrendingAuthors();
    console.log(authors);
    return NextResponse.json({ authors }, { status: 200 });
  } catch (error) {
    console.error("Error fetching trending authors:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
