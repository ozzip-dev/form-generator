import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { cache } from "react";

const getUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  return session.user;
};
export const getUserCash = cache(getUser);
