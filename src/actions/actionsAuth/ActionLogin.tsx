"use server";

import { parseZodErrors } from "@/helpers/helpersValidation/parseZodErrors";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/schema/loginSchema";
import { redirect } from "next/navigation";

export async function ActionLogin(
  
  data: {
  email: string;
  password: string;
  rememberMe?: boolean;
}

) {
  // const validationResult = loginSchema.safeParse(data);

  // if (!validationResult.success) {
  //   const fieldErrors = parseZodErrors(validationResult.error);

  //   return { error: fieldErrors };
  // }

  // console.log("datadddd", data);
 const hardcoded = {
    email: "gitaragra@gmail.com",
    password: "25czerwcaaaa",
    rememberMe: false,
  };
  // const result = await authClient.signIn?.email(data);

  // const result = await authClient.signIn?.email({
  //   email: "gitaragra@gmail.com",
  //   password: "25czerwca",
  //   rememberMe: false,
  // });

//  const result = await authClient.signUp?.email({
//     email: data.email,
//     password: data.password,
//     name: data.name,
//   });


  const result = await authClient.signIn?.email(hardcoded);

  
  if (result.error) {
    console.log("validationReresult.error.messagesult", result.error.message);

    throw new Error(result.error.message ?? "Coś poszło nie tak");
  }

  redirect("/dashboard");
}
