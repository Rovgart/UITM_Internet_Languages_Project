import { getTopSellingBooks } from "@/lib/books";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Endpoints related to retrieving book collections
 *
 * /api/books/top_selling:
 *   get:
 *     tags:
 *       - Books
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
    if (!req.headers.has("Authorization")) {
      return NextResponse.json(
        { message: "Missing authorization token" },
        { status: 401 }
      );
    }
    if (req.method !== "GET")
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );

    const data = await getTopSellingBooks();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    throw error;
  }
}
