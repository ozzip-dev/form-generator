"use server";

import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { auth } from "@/lib/auth";
import { resetPasswordSchema } from "@/lib/zodShema/zodAuthShema/resetPasswordSchema";
import { redirect } from "next/navigation";

type FormData = {
  password: string;
  token: string;
};

export async function ActionResetPassword(data: FormData) {
  const validationResult = resetPasswordSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  try {
    await auth.api.resetPassword({
      body: { newPassword: data.password, token: data.token },
    });
  } catch (err: any) {
    throw new Error(err?.message ?? "Nie można się wylogować");
  }

  redirect("/login?resetPassword=success");
}
