import { NextRequest, NextResponse } from "next/server";

async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const session = req.cookies.get("AccessToken")?.value;

  const publicRoutes = ["/home", "/sign-in", "/sign-up"];
  const protectedRoutes = ["/dashboard", "/dashboard/book"];
  const isProtectedRoute = (path: string) => {
    return (
      protectedRoutes.some((route) => path.startsWith(route)) ||
      path.match(/^\/dashboard\/book\/[\w-]+$/)
    );
  };

  if (session && url.pathname === "/home") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (isProtectedRoute(url.pathname) && !session) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (publicRoutes.includes(url.pathname) && session) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default middleware;
