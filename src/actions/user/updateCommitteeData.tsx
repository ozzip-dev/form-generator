"use server";

import { db, updateById } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { isModerator } from "@/lib/utils";
import { CommitteeInfoKey, IUser } from "@/types/user";
import { requireUser } from "@/dataAccessLayer/queries";

export async function updateCommitteeData(data: FormData): Promise<void> {

  const updateData: Partial<Record<CommitteeInfoKey, string>> = {}

  Array.from(data.entries())
    .filter(([_, value]) => value)
    .forEach(([key, value]) => {
      if (typeof value === "string") {
        updateData[key as CommitteeInfoKey] = value;
      }
    })

  const user = await requireUser()
  const userId = new ObjectId(user.id);

  if (!user || !isModerator(user as IUser)) {
    throw new Error('Invalid data: User does not exist or is not a moderator')
  }

  await updateById(db, 'user', userId, {
    $set: {
      ...updateData
    }
  }) as IUser
}
