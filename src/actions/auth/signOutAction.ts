"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

type SignOutResponse = { success: true } | { success: false; error: string };

export async function signOutAction(): Promise<SignOutResponse> {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Nie można się wylogować" };
  }
}
