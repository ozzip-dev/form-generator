"use server";

import { db, updateById } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { isModerator } from "@/lib/utils";
import { CommitteeInfoKey, IUser, UserCommitteeInfo } from "@/types/user";
import { requireUser } from "@/services/queries/requireUser";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  UserDetailsSchema,
  userDetailsSchema,
} from "@/lib/zodSchema/userDetailsShema";
import {
  handleServerErrors,
  MoledFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { runAsyncAction } from "@/helpers/runAsyncFunction";
import { az } from "zod/v4/locales";

export async function updateCommitteeDataAction(
  data: UserDetailsSchema
): Promise<void | { error: MoledFieldErrors }> {
  const user = await requireUser();

  const validationResult = userDetailsSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  const updateData: Partial<UserCommitteeInfo> = {};

  Object.entries(data)
    .filter(([_, value]) => value)
    .forEach(([key, value]) => {
      if (typeof value === "string") {
        updateData[key as CommitteeInfoKey] = value;
      }
    });

  const userId = new ObjectId(user.id);

  if (!user || !isModerator(user as IUser)) {
    throw new Error("Invalid data: User does not exist or is not a moderator");
  }

  const performUpdateCommitteeData = async () => {
    await updateById<IUser>(db, "user", userId, {
      $set: {
        ...updateData,
      },
    });

    revalidatePath("/user-settings");
  };

  await runAsyncAction(performUpdateCommitteeData);
}
