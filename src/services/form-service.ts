import { find, insert, updateById } from "@/lib/mongo";
import { Form } from "@/types/form";
import { FormInput } from "@/types/input";
import { Db, ObjectId, WithId } from "mongodb";

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
    state: 'draft'
  }

  const { insertedId } = await insert(db, 'form', insertData)

  return insertedId
}

export async function getFormTemplates(database: Db): Promise<Form[]> {
  const forms =  await find(database, 'form', { state: 'template' })
  return forms as Form[]
}

export async function removeInputFromDraft(
  db: Db,
  formId: ObjectId,
  inputId: string
): Promise<WithId<Form>> {
  return (await updateById(
    db,
    'form',
    formId,
    {
      $pull: {
        inputs: { id: inputId }
      }
    }
  )) as WithId<Form>
}