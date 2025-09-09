"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function ActionSignOut() {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true };
  } catch (err: any) {
    return {
      error: {
        message: err?.message ?? "Nie można się wylogować",
      },
    };
  }
}
