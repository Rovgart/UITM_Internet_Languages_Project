import { login } from "@/lib/lib";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 *
 * /api/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     description: Returns access token and refresh token for authorized user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Success, returns access token and refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Bad Request, missing email or password.
 *       401:
 *         description: Unauthorized, invalid email or password.
 *       500:
 *         description: Internal server error.
 */

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = { email, password };
    const data = await login(user);
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are requires" },
        { status: 400 }
      );
    }
    if (data) {
      return NextResponse.json({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error. Please try again" },
      { status: 500 }
    );
  }
}
