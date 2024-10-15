import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const welcomeCookie = request.cookies.get("welcome_shown");

  // If the welcome cookie doesn't exist and the path is not /welcome, redirect to /welcome
  if (!welcomeCookie && request.nextUrl.pathname !== "/welcome") {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  // For all other cases, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
