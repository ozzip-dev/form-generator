"use server";

import { hasCompleteCommitteeData } from "@/helpers/hasCompleteCommitteeData";
import { auth } from "@/lib/auth/auth";
import { isModerator } from "@/lib/utils";
import { confirmPrivacyPolicy } from "@/services/user-service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function confirmPrivacyPolicyAction(): Promise<void> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { user } = session;

  if (user.privacyPolicyConfirmed) {
    throw new Error("Privacy policy już zaakceptowana");
  }

  // 1️⃣ update DB
  await confirmPrivacyPolicy(user.id.toString());

  // 2️⃣ 🔥 UPDATE SESJI (KLUCZ)
  // await auth.api.updateSession({
  //   user: {
  //     privacyPolicyConfirmed: true,
  //   },
  // });

  // 3️⃣ redirect — middleware zobaczy TRUE
  if (isModerator(user)) {
    redirect(
      hasCompleteCommitteeData({
        ...user,
        privacyPolicyConfirmed: true,
      })
        ? "/forms/list"
        : "/user-form",
    );
  }

  redirect("/dashboard");
}
