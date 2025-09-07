"use server";

import { parseZodErrors } from "@/helpers/helpersValidation/parseZodErrors";
import { authClient } from "@/lib/auth-client";
import { forgotPasswordSchema } from "@/lib/schema/forgotPasswordSchema";
import { redirect } from "next/navigation";

export async function ActionLogin(
  _: any,
  data: { email: string; password: string; rememberMe?: boolean }
) {
  const validationResult = forgotPasswordSchema.safeParse(data);

  if (!validationResult.success) {
    const fieldErrors = parseZodErrors(validationResult.error);

    return { error: fieldErrors };
  }

  const result = await authClient.forgetPassword({
    email: data.email,
  });

  if (result.error) {
    // console.log("validationReresult.error.messagesult", result.error.message);

    throw new Error(result.error.message ?? "Coś poszło nie tak");
  }

  redirect("/reset-password");
}
