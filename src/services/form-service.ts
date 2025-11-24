import { FormType } from "@/enums/form";
import { db, find, findById, findOne, insert, updateById } from "@/lib/mongo";
import { Form } from "@/types/form";
import { FormInput } from "@/types/input";
import { Db, ObjectId, WithId } from "mongodb";

export async function formHasInputWithId(
  db: Db,
  formId: ObjectId,
  inputId: string
): Promise<boolean> {
  const form = (await findById<Form>(db, "form", formId));
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

  const { insertedId } = await insert<Form>(db, 'form', insertData)

  return insertedId
}

export async function getFormTemplates(database: Db): Promise<Form[]> {
  const forms = await find<Form>(database, 'form', { state: 'template' })
  return forms
}

export async function updateForm(
  db: Db,
  formId: ObjectId,
  updates: { title?: string; description?: string; type?: FormType }
): Promise<WithId<Form> | null> {
  return (await updateById<Form>(
    db,
    'form',
    formId,
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    }
  ))
}

export async function publishForm(
  db: Db,
  formId: string
): Promise<void> {
  await updateById<Form>(
    db,
    'form',
    new ObjectId(formId),
    {
      $set: {
        state: 'active',
        updatedAt: new Date(),
      },
    }
  )
}

export async function getFormBySlug(
  db: Db,
  slug: string
): Promise<Form | null> {
  /* first look for form with url as slug */
  const formByUrl = await findOne<Form>(
    db,
    'form',
    {
      url: slug
    }
  )
  if (formByUrl) return formByUrl

  /* if no form is found, query by id */
  try {
    return findById<Form>(db, 'form', new ObjectId(slug))
  } catch (e) {
    return null
  }
}

export async function setAliasUrl(
  db: Db,
  formId: string,
  url: string
): Promise<void> {
  const form = await getFormBySlug(db, url)
  if (form)
    throw new Error(`Formularz o ID lub aliasie ${url} już istnieje.`)

  await updateById<Form>(
    db,
    'form',
    new ObjectId(formId),
    {
      $set: {
        url,
        updatedAt: new Date(),
      },
    }
  )
}

export async function getFormById(formId: string): Promise<Form> {
  const form = await findById<Form>(db, 'form', new ObjectId(formId))
  if (!form) throw new Error('Invalid form id')
  return form
}

// TODO: if not needed, delete, keep getFormById
export async function getFormInputs(formId: string): Promise<FormInput[]> {
  const form = await findById<Form>(db, 'form', new ObjectId(formId))
  if (!form) throw new Error('Invalid form id')
  return form.inputs
}