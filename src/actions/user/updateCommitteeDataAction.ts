"use server";

import { db, updateById } from "@/lib/mongo";
import { isModerator } from "@/lib/utils";
import {
  UserDetailsSchema,
  userDetailsSchema,
} from "@/lib/zod-schema/userDetailsShema";
import { requireUser } from "@/services/user-service";
import { CommitteeInfoKey, IUser, UserCommitteeInfo } from "@/types/user";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCommitteeDataAction(
  data: UserDetailsSchema,
  isEditMode: boolean
): Promise<void | { validationErrors: Record<string, string[]> }> {
  const user = await requireUser();

  const validationResult = userDetailsSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      validationErrors: validationResult.error.formErrors.fieldErrors,
    };
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

  if (isModerator(user as IUser) && !isEditMode) {
    redirect("/forms/list");
  }
}
