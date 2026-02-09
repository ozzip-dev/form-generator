"use server";

import { auth } from "@/lib/auth/auth";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/lib/zod-schema/zod-auth-schema/forgotPasswordSchema";

export async function forgotPasswordAction(data: ForgotPasswordSchema) {
  const validationResult = forgotPasswordSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      validationErrors: validationResult.error.formErrors.fieldErrors,
    };
  }

  try {
    // TODO: spr czy dobra funkcja
    await auth.api.requestPasswordReset({
      body: { email: data.email, redirectTo: "/reset-password" },
    });

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      catchError: `${err?.message} ?? Nie można wysłać linku resetującego hasło`,
    };
  }
}
