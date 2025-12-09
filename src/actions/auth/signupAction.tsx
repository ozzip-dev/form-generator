"use server";

import { auth } from "@/lib/auth/auth";
import {
  signupSchema,
  SignupSchema,
} from "@/lib/zodSchema/zodAuthSchema/signupSchema";

type ActionResult<T> = {
  success: boolean;
  data?: T;
  validationErrors?: Record<string, string[]>;
  catchError?: string;
};

export async function signupAction(
  data: SignupSchema
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
