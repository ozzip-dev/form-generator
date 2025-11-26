"use server";

import { db } from "@/lib/mongo";
import { IUser, UserSerialized } from "@/types/user";
import { ObjectId } from "mongodb";
import { requireUser } from "./requireUser";
import { cache } from "react";
import { runAsyncAction } from "@/helpers/runAsyncFunction";
import { serializeUser } from "@/lib/serialize-utils";

export const getUser = cache(async (): Promise<UserSerialized | null> => {
  const user = await requireUser();
  const userId = new ObjectId(user.id);

  const performGerUser = async () => {
    const freshUser = await db
      .collection<IUser>("user")
      .findOne({ _id: userId });

    return freshUser ? serializeUser(freshUser) : null;
  };

  return await runAsyncAction(performGerUser);
});
