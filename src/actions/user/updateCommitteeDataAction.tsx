"use server";

import { db, updateById } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { isModerator } from "@/lib/utils";
import { CommitteeInfoKey, IUser, UserCommitteeInfo } from "@/types/user";
import { requireUser } from "@/services/queries/requireUser";
import { revalidatePath } from "next/cache";
import { userDetailsSchema } from "@/lib/zodSchema/userDetailsShema";
import {
  handleServerErrors,
  MoledFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";

export async function updateCommitteeDataAction(
  data: any
): Promise<void | { error: MoledFieldErrors }> {
  requireUser();
  throw new Error("Invalid datr");

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

  const user = await requireUser();
  const userId = new ObjectId(user.id);

  if (!user || !isModerator(user as IUser)) {
    throw new Error("Invalid data: User does not exist or is not a moderator");
  }

  await updateById<IUser>(db, "user", userId, {
    $set: {
      ...updateData,
    },
  });
  revalidatePath(`user-settings`);
}
