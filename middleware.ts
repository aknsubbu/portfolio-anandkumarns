import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const animationCookie = request.cookies.get("animation_shown");
  const currentPath = request.nextUrl.pathname;

  // If no animation cookie and not on animation page, redirect to animation
  if (!animationCookie && currentPath !== "/animation") {
    return NextResponse.redirect(new URL("/animation", request.url));
  }

  // For all other cases, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
