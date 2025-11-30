"use server";

import { auth } from "@/lib/auth/auth";
import { signupSchema } from "@/lib/zodSchema/zodAuthSchema/signupSchema";

type SignupInput = {
  email: string;
  password: string;
  name: string;
};

type ActionResult<T> = {
  success: boolean;
  data?: T;
  validationErrors?: Record<string, string[]>;
  catchError?: string;
};

export async function signupAction(
  data: SignupInput
): Promise<ActionResult<null>> {
  const validationResult = signupSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      validationErrors: validationResult.error.formErrors.fieldErrors,
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    return { success: true, data: null };
  } catch (err: any) {
    return {
      success: false,
      catchError: `${err?.message}. Rejestracja się nie powiodła.`,
    };
  }
}
