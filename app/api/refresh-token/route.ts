/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 *
 * /api/refresh-token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Returns a new access token and refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The user's refresh token used to generate a new access token and refresh token.
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Successfully returned new access token and refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: The newly generated access token.
 *                 refresh_token:
 *                   type: string
 *                   description: The newly generated refresh token.
 *       400:
 *         description: Bad Request, missing or invalid refresh token.
 *       401:
 *         description: Unauthorized, invalid refresh token or user not logged in.
 *       500:
 *         description: Internal server error.
 */

import { updateSessions } from "@/lib/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (!req.headers.has("Authorization")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!req.headers.get("Authorization")?.startsWith("Bearer")) {
      return NextResponse.json(
        { message: "Invalid authorization token format" },
        { status: 400 }
      );
    }
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
    const refreshToken = await updateSessions();
    return NextResponse.json(refreshToken, { status: 200 });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
