import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (req.method !== "GET") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Invalid token format" },
        { status: 400 }
      );
    }

    try {
      const user = await getUser(token);
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.name === "JWSSignatureVerificationFailed" ||
          error.message.includes("ERR_JWS_SIGNATURE_VERIFICATION_FAILED")
        ) {
          return NextResponse.json(
            { message: "Invalid token signature" },
            { status: 401 }
          );
        } else if (error.name === "JWTExpired") {
          return NextResponse.json(
            { message: "Token has expired" },
            { status: 401 }
          );
        } else if (error.name === "JWTClaimValidationFailed") {
          return NextResponse.json(
            { message: "Token claim validation failed" },
            { status: 401 }
          );
        }
      }
      console.error("JWT verification error:", error);
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error in GET /api/user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// In your users.ts file
import { decrypt } from "@/lib/lib";

export const getUser = async (token: string) => {
  try {
    const payload = await decrypt(token);
    console.log(payload);
    return payload;
  } catch (error) {
    console.error("Error in getUser:", error);
    throw error; // Rethrow the error to be caught in the route handler
  }
};
