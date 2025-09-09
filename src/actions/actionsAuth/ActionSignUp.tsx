"use server";
import { parseZodErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { auth } from "@/lib/auth";
import { signUpSchema } from "@/lib/schema/signupSchema";
import { redirect } from "next/navigation";

export async function ActionSignUp(data: {
  email: string;
  password: string;
  name: string;
}) {
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
    return {
      error: {
        email: {
          type: "auth",
          message: err?.message ?? "Rejestracja nie powiodła się",
        },
      },
    };
  }
  redirect("/dashboard");
}
