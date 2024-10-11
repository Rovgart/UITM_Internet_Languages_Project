import { retrieveReadBooksByUser } from "@/lib/lib";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Endpoints related to managing book statuses
 *
 * /api/books/read_books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Retrieve read books for a user
 *     description: Returns a list of books that the user has marked as read.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for user authentication.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of read books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Successfully retrieved read books"
 *                 readBooks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The ID of the book.
 *                         example: "12345"
 *                       title:
 *                         type: string
 *                         description: The title of the book.
 *                         example: "The Great Gatsby"
 *                       author:
 *                         type: string
 *                         description: The author of the book.
 *                         example: "F. Scott Fitzgerald"
 *       401:
 *         description: Unauthorized. No valid token provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while retrieving read books"
 */

export async function GET(req: NextRequest) {
  try {
    if (!req.headers.has("Authorization"))
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (req.method !== "GET") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
    const authHeaders = req.headers.get("Authorization");
    if (!authHeaders) {
      return null;
    }
    const token = authHeaders.split(" ")[1];

    const data = retrieveReadBooksByUser(token);
    return NextResponse.json(data, {
      status: 200,
      statusText: "Successfully retrieved read books",
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
