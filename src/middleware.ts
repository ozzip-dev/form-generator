import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { isModerator } from "./lib/utils";
import { hasCompleteCommitteeData } from "./helpers/hasCompleteCommitteeData";


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

  const pathname = request.nextUrl.pathname;
  const moderator = isModerator(session.user);


  if (pathname === "/privacy") {
    if (moderator && session.user.privacyPolicyConfirmed) {
      const url = hasCompleteCommitteeData(session.user)
        ? "/forms/list"
        : "/user-form";
      return NextResponse.redirect(new URL(url, request.url));
    }
    return NextResponse.next();
  }

  // if (pathname === "/user-form") {
  //   if (moderator && !session.user.privacyPolicyConfirmed) {
  //     return NextResponse.redirect(new URL("/privacy", request.url));
  //   }
  //   if (moderator && hasCompleteCommitteeData(session.user)) {
  //     return NextResponse.redirect(new URL("/forms/list", request.url));
  //   }
  //   return NextResponse.next();
  // }

  if (pathname === "/dashboard" && moderator) {
    if (!session.user.privacyPolicyConfirmed) {
      return NextResponse.redirect(new URL("/privacy", request.url));
    }
    if (!hasCompleteCommitteeData(session.user)) {
      return NextResponse.redirect(new URL("/user-form", request.url));
    }
    return NextResponse.redirect(new URL("/forms/list", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/privacy", "/user-form"],
};
