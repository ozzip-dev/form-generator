import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/zodSchema/zodAuthSchema/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname === "/dashboard") {
    if (session.user.role === "admin") {
      return NextResponse.redirect(
        new URL("/dashboard-admin?login=success", request.url)
      );
    }
    if (session.user.role === "moderator") {
      return NextResponse.redirect(
        new URL("/dashboard-moderator?login=success", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
