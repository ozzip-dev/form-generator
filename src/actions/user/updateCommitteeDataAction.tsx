"use server";

import {
  handleServerErrors,
  MoledFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { db, updateById } from "@/lib/mongo";
import { isModerator } from "@/lib/utils";
import {
  UserDetailsSchema,
  userDetailsSchema,
} from "@/lib/zodSchema/userDetailsShema";
import { requireUser } from "@/services/queries/requireUser";
import { CommitteeInfoKey, IUser, UserCommitteeInfo } from "@/types/user";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

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

  await updateById<IUser>(db, "user", userId, {
    $set: {
      ...updateData,
    },
  });

  revalidatePath("/user-settings");
}
