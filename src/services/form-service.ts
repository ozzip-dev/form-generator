import { db, find, insert } from "@/lib/mongo";
import { formTemplates } from "@/lib/mongo/templates";
import { Form } from "@/types/form";
import { FormInput } from "@/types/input";
import { Db, Document, ObjectId } from "mongodb";

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
    state: 'draft'
  }

  await insert(db, 'form', insertData)
}


export async function getFormTemplates(database: Db): Promise<Form[]> {
  const forms =  await find(database, 'form', { state: 'template' })
  return forms as Form[]
}