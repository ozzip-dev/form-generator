"use server";

import { auth } from "@/lib/auth/auth";
import {
  loginSchema,
  LoginSchema,
} from "@/lib/zod-schema/zod-auth-schema/loginSchema";
import { redirect } from "next/navigation";

type ActionResult = {
  success: boolean;
  validationErrors?: Record<string, string[]>;
  catchError?: string;
};

export async function loginAction(
  data: LoginSchema,
): Promise<ActionResult | void> {
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
    const statusToMsgMap: Record<string, string> = {
      UNAUTHORIZED: "Błędny email lub hasło.",
      FORBIDDEN: "Konto niezatwierdzone. Sprawdź skrzynkę email.",
    };
    const defaultMsg = `${err?.message || "Błąd"}. Nieudane logowanie.`;
    const catchError = statusToMsgMap[err.status] || defaultMsg;

    return {
      success: false,
      catchError,
    };
  }

  // TODO: przemyśleć dashbaord
  redirect("/dashboard?login=success");
}
