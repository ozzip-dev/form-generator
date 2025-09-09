"use server";

import { parseZodErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { auth } from "@/lib/auth";
import { resetPasswordSchema } from "@/lib/schema/resetPasswordSchema";

export async function ActionResetPassword(data: {
  password: string;
  token: string;
}) {
  const validationResult = resetPasswordSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: parseZodErrors(validationResult.error) };
  }

  try {
    await auth.api.resetPassword({
      body: { newPassword: data.password, token: data.token },
    });

    return { success: true };
  } catch (err: any) {
    return {
      error: {
        password: {
          type: "auth",
          message:
            err?.message ??
            "Nie można zresetować hasła. Token może być nieprawidłowy lub wygasł",
        },
      },
    };
  }
}
