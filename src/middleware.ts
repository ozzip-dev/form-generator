import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { isModerator } from "./lib/utils";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  if (!session) return NextResponse.redirect(new URL("/login", request.url));

  if (isModerator(session.user))
    return NextResponse.redirect(new URL("/forms/list", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
