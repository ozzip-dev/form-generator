"use server";

import { parseZodErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { auth } from "@/lib/auth";
import { signUpSchema } from "@/lib/zodShema/zodAuthShema/signupSchema";

type FormData = {
  email: string;
  password: string;
  name: string;
};

export async function ActionSignUp(data: FormData) {
  const validationResult = signUpSchema.safeParse(data);

  if (!validationResult.success) {
    const fieldErrors = parseZodErrors(validationResult.error);

    return { error: fieldErrors };
  }

  try {
    await auth.api.signUpEmail({
      body: { email: data.email, password: data.password, name: data.name },
    });
  } catch (err: any) {
    throw new Error(err?.message ?? "Rejestracja się nie powiodła");
  }
}
