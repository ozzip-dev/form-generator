"use server";

import { auth } from "@/lib/auth/auth";
import {
  signupSchema,
  SignupSchema,
} from "@/lib/zod-schema/zod-auth-schema/signupSchema";
import { addAccountCreatedLog } from "@/services/event-log-service";

type ActionResult<T> = {
  success: boolean;
  data?: T;
  validationErrors?: Record<string, string[]>;
  catchError?: string;
};

export async function signupAction(
  data: SignupSchema,
): Promise<ActionResult<null>> {
  const validationResult = signupSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      validationErrors: validationResult.error.formErrors.fieldErrors,
    };
  }

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    const createdUserId = response?.user?.id;
    if (!!createdUserId) await addAccountCreatedLog(createdUserId);

    return { success: true, data: null };
  } catch (err: any) {
    const userWithEmailExists =
      err?.body?.code == "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL";
    const catchError = userWithEmailExists
      ? "Użytkownik o podanym adresie email już istnieje"
      : `Rejestracja się nie powiodła: ${err?.message}`;

    return {
      success: false,
      catchError,
    };
  }
}
