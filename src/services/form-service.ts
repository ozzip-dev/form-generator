import { insert } from "@/lib/mongo";
import { Form } from "@/types/form";
import { FormInput } from "@/types/input";
import { Db, ObjectId } from "mongodb";

export async function createDraft(
  db: Db,
  userId: ObjectId,
  inputs: FormInput[]
): Promise<void> {
  const now: Date = new Date()
  const insertData: Form = {
    createdBy: userId,
    createdAt: now,
    updatedBy: userId,
    updatedAt: now,
    inputs,
    state: 'draft',
    template: false
  }

  await insert(db, 'form', insertData)
}