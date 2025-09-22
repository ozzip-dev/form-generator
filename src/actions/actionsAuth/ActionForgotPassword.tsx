"use server";

import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { auth } from "@/lib/auth";
import { forgotPasswordSchema } from "@/lib/zodShema/zodAuthShema/forgotPasswordSchema";

type FormData = {
  email: string;
};

export async function ActionForgotPassword(data: FormData) {
  const validationResult = forgotPasswordSchema.safeParse(data);

  if (!validationResult.success) {
    const fieldErrors = handleServerErrors(validationResult.error);
    return { error: fieldErrors };
  }

  try {
    await auth.api.forgetPassword({
      body: { email: data.email, redirectTo: "/reset-password" },
    });

    return { success: true };
  } catch (err: any) {
    return {
      error: {
        email: {
          type: "auth",
          message: err?.message ?? "Nie można wysłać linku resetującego hasło",
        },
      },
    };
  }
}
