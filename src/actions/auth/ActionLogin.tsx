"use server";

import { loginSchema } from "@/lib/zodSchema/zodAuthSchema/loginSchema";
import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { auth } from "@/lib/zodSchema/zodAuthSchema/auth";
import { redirect } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export async function ActionLogin(data: FormData) {
  const validationResult = loginSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  try {
    await auth.api.signInEmail({
      body: { email: data.email, password: data.password },
    });
  } catch (err: any) {
    throw new Error(err?.message ?? "Nieprawidłowy email lub hasło");
  }
  redirect("/dashboard?login=success");
}
