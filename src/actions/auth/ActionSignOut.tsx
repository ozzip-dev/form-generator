"use server";

import { auth } from "@/lib/zodSchema/zodAuthSchema/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function ActionSignOut() {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (err: any) {
    throw new Error(err?.message ?? "Nie można się wylogować");
  }

  redirect("/login?logout=success");
}
