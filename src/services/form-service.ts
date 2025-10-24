import { FormType } from "@/enums/form";
import { find, findById, insert, updateById } from "@/lib/mongo";
import { Form } from "@/types/form";
import { FormInput } from "@/types/input";
import { Db, ObjectId, WithId } from "mongodb";

export async function formHasInputWithId(
  db: Db,
  formId: ObjectId,
  inputId: string
): Promise<boolean> {
  const form = (await findById(db, "form", formId)) as Form | null;
  if (!form) return false;
  return form.inputs.some(({ id }) => id === inputId);
}

export async function createDraft(
  db: Db,
  userId: ObjectId,
  title: string,
  description: string,
  inputs: FormInput[]
): Promise<ObjectId> {
  const now: Date = new Date()
  const insertData: Form = {
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    title,
    description,
    inputs,
    state: 'draft',
    type: FormType.Other
  }

  const { insertedId } = await insert(db, 'form', insertData)

  return insertedId
}

export async function getFormTemplates(database: Db): Promise<Form[]> {
  const forms =  await find(database, 'form', { state: 'template' })
  return forms as Form[]
}

export async function updateForm(
  db: Db,
  formId: ObjectId,
  updates: { title?: string; description?: string; type?: FormType }
): Promise<WithId<Form>> {
  return (await updateById(
    db,
    'form',
    formId,
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    }
  )) as WithId<Form>
}