import { db, find, insert } from "@/lib/mongo";
import { formTemplates } from "@/lib/mongo/templates";
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
    state: 'draft'
  }

  await insert(db, 'form', insertData)
}

async function addTemplateForm(
  db: Db,
  formTemplate: Form
): Promise<void> {
  const formToInsert: Form = { 
    ...formTemplate,
    state: 'template'
  }

  await insert(
    db,
    'form',
    formToInsert
  )

  console.log(`Inserted '${formTemplate.id}' form template`)
}

export async function maybeAddTemplateForm(id: string) {
  const form = await find(db, 'form', { id })
  
  /* If form exists, skip */
  if (form?.length) return
  
  const formTemplate: Form | undefined = formTemplates
    .find(({ id: templateId }) => templateId === id)
  
  /* If no template found, skip */
  if (!formTemplate) return

  await addTemplateForm(db, formTemplate)
}