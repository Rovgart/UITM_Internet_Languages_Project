// pages/api/test-connection.ts

// Assuming testConnection is a function that returns a result object
// This is an example of how the handler should be structured:

import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "../../lib/testConnection"; // Adjust the import path

export async function GET(req: NextRequest) {
  try {
    const result = await testConnection();
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
