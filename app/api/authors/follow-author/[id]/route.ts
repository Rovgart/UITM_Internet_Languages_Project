import { followAuthor } from "@/lib/authors";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Authors
 *     description: Endpoints related to authors
 *
 * /api/authors/follow-author/{id}:
 *   post:
 *     tags:
 *       - Authors
 *     summary: Follow an author
 *     description: Increment the followers count of a specific author.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author's unique identifier (ObjectId).
 *     responses:
 *       200:
 *         description: Success, author followed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Author followed successfully
 *       404:
 *         description: Author not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Author not found
 *       500:
 *         description: Internal server error.
 */

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
    const followAuthorResult = await followAuthor(params.id);
    return NextResponse.json({ message: followAuthorResult }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
