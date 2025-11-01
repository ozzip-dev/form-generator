"use server";

import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { auth } from "@/lib/zodSchema/zodAuthSchema/auth";
import { signUpSchema } from "@/lib/zodSchema/zodAuthSchema/signupSchema";

type FormData = {
  email: string;
  password: string;
  name: string;
};

export async function SignUpAction(data: FormData) {
  const validationResult = signUpSchema.safeParse(data);

  if (!validationResult.success) {
    const fieldErrors = handleServerErrors(validationResult.error);

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
