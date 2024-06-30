import { updateSessions } from "@/lib/lib";
import { NextRequest, NextResponse } from "next/server";

// Runs after every request of appplication
export const middleware = async (request: NextRequest) => {
  return await updateSessions(request);
};
