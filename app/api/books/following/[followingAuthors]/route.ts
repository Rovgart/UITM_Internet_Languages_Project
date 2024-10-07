import { getBooksByFollowedAuthors } from "@/lib/books";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Endpoints related to retrieving book collections
 *
 * /api/books/following/{followingAuthors}:
 *   post:
 *     tags:
 *       - Books
 *     summary: Retrieve books by followed authors
 *     description: Returns a collection of books based on an array of followed authors.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followedAuthors:
 *                 type: array
 *                 description: An array of followed authors' information.
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The author's unique identifier.
 *             required:
 *               - followedAuthors
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

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
    // if (!req.headers.has("Authorization")) {
    //   return NextResponse.json(
    //     { message: "Authorization failed" },
    //     { status: 401 }
    //   );
    // }
    const { followedAuthors } = await req.json();
    const data = await getBooksByFollowedAuthors(followedAuthors);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
