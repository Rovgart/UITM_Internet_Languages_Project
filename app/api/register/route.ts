import { NextRequest, NextResponse } from "next/server";
import { registerUserToDatabase } from "@/lib/register";
import { register } from "@/lib/lib";
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 *
 * /api/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a user
 *     description: Register a user by passing email and password
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
 *         description: Succesfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully registered, now please login"
 *       400:
 *         description: Bad Request, missing or invalid refresh token.
 *       401:
 *         description: Unauthorized, invalid refresh token or user not logged in.
 *       500:
 *         description: Internal server error.
 */
export const POST = async (req: NextRequest) => {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
    const data = await req.json();
    if (!data) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
    const { email, password } = data;
    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing email or password" },
        { status: 400 }
      );
    }
    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { message: "Invalid email or password format" },
        { status: 400 }
      );
    }
    const result = await register(data);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json(
      { message: "This email is already registered" },
      { status: 500 }
    );
  }
};
