"use server";

import { auth } from "@/lib/auth/auth";
import { confirmPrivacyPolicy } from "@/services/user-service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function confirmPrivacyPolicyAction(): Promise<void> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { user } = session;

  if (user.privacyPolicyConfirmed)
    throw new Error(
      "Użytkownik/Użytkowniczka ma już zatwierdzoną politykę poprawności",
    );

  await confirmPrivacyPolicy(user.id.toString());

  redirect("/dashboard");
}
