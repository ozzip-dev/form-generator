"use server";

import { auth } from "@/lib/auth/auth";
import {
  loginSchema,
  LoginSchema,
} from "@/lib/zodSchema/zodAuthSchema/loginSchema";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginSchema) {
  const validationResult = loginSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      validationErrors: validationResult.error.formErrors.fieldErrors,
    };
  }

  try {
    await auth.api.signInEmail({
      body: { email: data.email, password: data.password },
    });
  } catch (err: any) {
    const msg =
      err?.status == "UNAUTHORIZED"
        ? "Nieprawidłowy email lub hasło"
        : err?.message || "błąd";
    return {
      success: false,
      catchError: `${msg}. Nieudane logowanie.`,
    };
  }
  redirect("/dashboard?login=success");
}
