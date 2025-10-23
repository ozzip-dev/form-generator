import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { cache } from "react";
import { redirect } from "next/navigation";

type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  role: string;
};

export const requireUser = cache(async (): Promise<User> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
  return session.user;
});
