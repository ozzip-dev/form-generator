"use server";

import { loginSchema } from "@/lib/schema/loginSchema";
import { parseZodErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function ActionLogin(data: { email: string; password: string }) {
  const validationResult = loginSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: parseZodErrors(validationResult.error) };
  }

  try {
    await auth.api.signInEmail({
      body: { email: data.email, password: data.password },
    });
  } catch (err: any) {
    throw new Error(err?.message ?? "Nieprawidłowy email lub hasło");
  }
  redirect("/dashboard");
}
