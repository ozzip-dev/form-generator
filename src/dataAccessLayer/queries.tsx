import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { cache } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  role: string;
};

const getUser = async (): Promise<User | null> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  return session.user;
};
export const getUserCash = cache(getUser);
