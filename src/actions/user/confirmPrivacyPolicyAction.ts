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

  await confirmPrivacyPolicy(user.id.toString());

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
