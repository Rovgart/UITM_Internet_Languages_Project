import { getCategory } from "@/lib/books";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const category = await req.json();
    if (!category) {
      return NextResponse.json(
        { error: "No category provided" },
        { status: 400 }
      );
    }
    const books = await getCategory(category);
    return NextResponse.json({ success: true, books }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message },
      { status: 500 }
    );
  }
}
