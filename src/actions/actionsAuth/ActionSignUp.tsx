"use server";
import { parseZodErrors } from "@/helpers/helpersValidation/parseZodErrors";
import { authClient } from "@/lib/auth-client";
import { signUpSchema } from "@/lib/schema/signupSchema";
import { redirect } from "next/navigation";

export async function ActionSignUp(
  _: any,
  data: { email: string; password: string; name: string }
) {
  const validationResult = signUpSchema.safeParse(data);

  if (!validationResult.success) {
    const fieldErrors = parseZodErrors(validationResult.error);

    return { error: fieldErrors };
  }

  const result = await authClient.signUp?.email({
    email: data.email,
    password: data.password,
    name: data.name,
  });

  if (result.error) {
    console.log("validationReresult.error.messagesult", result.error.message);

    throw new Error(result.error.message ?? "Coś poszło nie tak");
  }

  redirect("/dashboard");
}
