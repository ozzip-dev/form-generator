"use server";

import { auth } from "@/lib/auth/auth";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/lib/zod-schema/zod-auth-schema/resetPasswordSchema";
import { redirect } from "next/navigation";

type ActionResult = {
  success: boolean;
  validationErrors?: Record<string, string[]>;
  catchError?: string;
};

export async function resetPasswordAction(
  data: ResetPasswordSchema & { token: string }
): Promise<ActionResult | void> {
  const validationResult = resetPasswordSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      validationErrors: validationResult.error.formErrors.fieldErrors,
    };
  }

  try {
    await auth.api.resetPassword({
      body: { newPassword: data.password, token: data.token },
    });
  } catch (err: any) {
    return {
      success: false,
      catchError: `${err?.message}. Zmiana hasła się nie powiodła.`,
    };
  }

  redirect("/login?resetPassword=success");
}
