import { cookies } from "next/headers";
import { usePathname } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

type Props = {};

async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const protectedRoutes = ["/l", "/r"];
  const publicRoutes = ["/sign-in", "/sign-up"];
  const session = req.cookies.get("access_token")?.value;
  if (session && req.nextUrl.pathname === "/home") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  if (protectedRoutes.includes(url.pathname) && !session) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }
  if (publicRoutes.includes(url.pathname) && session) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default middleware;
