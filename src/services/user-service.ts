import { db, findById } from "@/lib/mongo";
import { IUser, UserSerialized } from "@/types/user";
import { ObjectId } from "mongodb";
import { cache } from "react";
import { serializeUser } from "@/lib/serialize-utils";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export const requireUser = cache(async (): Promise<IUser> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  return session.user;
});

// TODO Pawel: 
// pobieramy usera -> drugi raz pobieramy usera zeby zwrocic Promise<UserSerialized>?
// przemyslec inny sposob
export const getUser = cache(async (): Promise<UserSerialized | null> => {
  const loggedInUser = await requireUser();
  const userId = new ObjectId(loggedInUser.id);
  const user = await findById<IUser>(db, 'user', userId)

  return user ? serializeUser(user) : null;
});

