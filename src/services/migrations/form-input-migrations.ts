import { find, insert } from "@/lib/mongo";
import { formTemplates, inputTemplates } from "@/lib/mongo/templates";
import { Form } from "@/types/form";
import { Input } from "@/types/input";
import { Db } from "mongodb";

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

export async function maybeAddTemplateForm(db: Db, id: string) {
  const form = await find(db, 'form', { id })
  
  /* If form exists, skip */
  if (form?.length) return
  
  const formTemplate: Form | undefined = formTemplates
    .find(({ id: templateId }) => templateId === id)
  
  /* If no template found, skip */
  if (!formTemplate) return

  await addTemplateForm(db, formTemplate)
}

async function addTemplateInput(
  db: Db,
  inputTemplate: Input
): Promise<void> {  
  await insert(
    db,
    'input',
    { 
      ...inputTemplate,
      template: true
    }
  )

  console.log(`Inserted '${inputTemplate.id}' input template`)
}

export async function maybeAddTemplateInput(db: Db, id: string) {
  const input = await find(db, 'input', { id })
  
  /* If input exists, skip */
  if (input?.length) return
  
  const inputTemplate: Input | undefined = inputTemplates
    .find(({ id: templateId }) => templateId === id)
  
  /* If no template found, skip */
  if (!inputTemplate) return

  await addTemplateInput(db, inputTemplate)
}