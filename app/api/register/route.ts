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
    const data = await req.json();
    const result = await register(data);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
