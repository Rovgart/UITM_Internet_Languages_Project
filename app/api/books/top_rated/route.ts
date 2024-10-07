import { getTopRated } from "@/lib/books";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Endpoints related to retrieving book collections
 *
 * /api/books/top_rated:
 *   get:
 *     tags:
 *       - Books
 *     summary: Retrieve books by followed authors
 *     description: Returns a collection of books based on an array of followed authors.
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
    if (!req.headers.has("Authorization")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const data = await getTopRated();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server errror" }, { status: 500 });
  }
}
