import { markBookAsRead } from "@/lib/lib";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Endpoints related to managing book statuses
 *
 * /api/books/mark/:
 *   post:
 *     tags:
 *       - Books
 *     summary: Update the status of a book
 *     description: Allows updating the status of a specific book (e.g., "read", "in-progress").
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status for the book (e.g., "read").
 *                 example: "read"
 *     responses:
 *       200:
 *         description: Successfully updated the book status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Successfully updated"
 *       400:
 *         description: Bad Request. Invalid book ID or status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid book ID or status"
 *       405:
 *         description: Method Not Allowed. Only POST method is allowed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Method not allowed"
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while updating the book status"
 */

export async function POST(req: NextRequest) {
  try {
    if (!req.headers.has("Authorization")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
    const { id } = await req.json();
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return null;
    const token = authHeader.split(" ")[1];
    const data = await markBookAsRead(id, token);
    return NextResponse.json(data, {
      status: 200,
      statusText: "Successfully updated ",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
