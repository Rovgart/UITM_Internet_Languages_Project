import { migrateAuthors } from "@/lib/authors";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const migrateAuth = await migrateAuthors();
    return NextResponse.json(migrateAuth, { status: 200 });
  } catch (error) {
    console.error(error);
  }
};
