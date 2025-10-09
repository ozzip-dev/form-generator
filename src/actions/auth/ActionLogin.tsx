// "use server";

// import { loginSchema } from "@/lib/zodShema/zodAuthShema/loginSchema";
// import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

// type FormData = {
//   email: string;
//   password: string;
// };

// export async function ActionLogin(data: FormData) {
//   const validationResult = loginSchema.safeParse(data);
//   if (!validationResult.success) {
//     return { error: handleServerErrors(validationResult.error) };
//   }

//   try {
//     await auth.api.signInEmail({
//       body: { email: data.email, password: data.password },
//     });
//   } catch (err: any) {
//     throw new Error(err?.message ?? "Nieprawidłowy email lub hasło");
//   }
//   redirect("/dashboard?login=success");
// }

// "use server";
// import { headers } from "next/headers";
// import { loginSchema } from "@/lib/zodShema/zodAuthShema/loginSchema";
// import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

// type FormData = {
//   email: string;
//   password: string;
// };

// export async function ActionLogin(data: FormData) {
//   const validationResult = loginSchema.safeParse(data);
//   if (!validationResult.success) {
//     return { error: handleServerErrors(validationResult.error) };
//   }

//   let session;

//   try {
//     await auth.api.signInEmail({
//       body: { email: data.email, password: data.password },
//     });

//     session = await auth.api.getSession({ headers: await headers() });

//     console.log("session", session);

//     if (!session?.user) {
//       throw new Error("Nie udało się pobrać danych użytkownika");
//     }
//   } catch (err: any) {
//     throw new Error(err?.message ?? "Nieprawidłowy email lub hasło");
//   }

//   if (session?.user.role === "admin") {
//     redirect("/dashboard-admin?login=success");
//   } else if (session?.user.role === "moderator") {
//     redirect("/dashboard-moderator?login=success");
//   } else {
//     redirect("/dashboard?login=success");
//   }
// }

// "use server";

// import { headers } from "next/headers";
// import { loginSchema } from "@/lib/zodShema/zodAuthShema/loginSchema";
// import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

// type FormData = {
//   email: string;
//   password: string;
// };

// export async function ActionLogin(data: FormData) {
//   const validationResult = loginSchema.safeParse(data);
//   if (!validationResult.success) {
//     return { error: handleServerErrors(validationResult.error) };
//   }

//   try {
//     await auth.api.signInEmail({
//       body: { email: data.email, password: data.password },
//     });
//   } catch (err: any) {
//     throw new Error(err?.message ?? "Nieprawidłowy email lub hasło");
//   }

//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session?.user) {
//     throw new Error("Nie udało się pobrać danych użytkownika");
//   }

//   if (session.user.role === "admin") {
//     redirect("/dashboard-admin?login=success");
//   } else if (session.user.role === "moderator") {
//     redirect("/dashboard-moderator?login=success");
//   } else {
//     redirect("/dashboard?login=success");
//   }
// }

"use server";

import { loginSchema } from "@/lib/zodShema/zodAuthShema/loginSchema";
import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

type FormData = {
  email: string;
  password: string;
};

export async function ActionLogin(data: FormData) {
  const validationResult = loginSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  let userRole;

  try {
    const response = await auth.api.signInEmail({
      body: { email: data.email, password: data.password },
    });
    console.log("resp", response);

    userRole = await auth.api.getSession({ headers: await headers() });

    console.log("userRole", userRole);

    if (!userRole?.user) {
      throw new Error("Nie udało się pobrać danych użytkownika");
    }
  } catch (err: any) {
    throw new Error(err?.message ?? "Nieprawidłowy email lub hasło");
  }
  if (!userRole?.user) {
    throw new Error("Nie udało się pobrać danych użytkownika");
  }

  if (userRole?.user.role === "admin") {
    redirect("/dashboard-admin?login=success");
  } else if (userRole?.user.role === "moderator") {
    redirect("/dashboard-moderator?login=success");
  } else {
    redirect("/dashboard?login=success");
  }
}
