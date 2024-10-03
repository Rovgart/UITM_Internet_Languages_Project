import { logout } from "@/lib/lib";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 *
 * /api/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout a user
 *     description: Logs out current user by invalidating the refresh token or clearing the session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The user's refresh token to invalidate the session.
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Success, user is logged out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully logged out."
 *       400:
 *         description: Bad Request, missing or invalid refresh token.
 *       401:
 *         description: Unauthorized, invalid refresh token or user not logged in.
 *       500:
 *         description: Internal server error.
 */

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader?.startsWith("Bearer")) {
      return NextResponse.json({
        error: "Invalid or missing authorization header",
      });
    }
    const access_token = authHeader.split(" ")[1];
    await logout(access_token);

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during logout", error);
      return NextResponse.json({ message: error?.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
