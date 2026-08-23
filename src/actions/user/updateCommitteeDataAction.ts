"use server";

import { db, updateById } from "@/lib/mongo";
import { isModerator } from "@/lib/utils";
import {
  UserDetailsSchema,
  userDetailsSchema,
} from "@/lib/zod-schema/userDetailsShema";
import { addCommitteeDetailsUpdatedLog } from "@/services/event-log-service";
import { requireUser, updateCommitteeInfo } from "@/services/user-service";
import { CommitteeInfoKey, IUser, UserCommitteeInfo } from "@/types/user";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCommitteeDataAction(
  data: UserDetailsSchema,
  isEditMode: boolean,
): Promise<void | { validationErrors: Record<string, string[]> }> {
  const user = await requireUser();

  const validationResult = userDetailsSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      validationErrors: validationResult.error.formErrors.fieldErrors,
    };
  }

  updateCommitteeInfo(user, data);

  revalidatePath("/user-settings");

  if (isModerator(user as IUser) && !isEditMode) {
    redirect("/forms/list");
  }
}
