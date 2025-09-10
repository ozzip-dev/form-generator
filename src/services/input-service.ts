import { db, find, insert } from "@/lib/mongo";
import { inputTemplates } from "@/lib/mongo/templates";
import { Input } from "@/types/input";
import { Db } from "mongodb";

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

export async function maybeAddTemplateInput(id: string) {
  const input = await find(db, 'input', { id })
  
  /* If input exists, skip */
  if (input?.length) return
  
  const inputTemplate: Input | undefined = inputTemplates
    .find(({ id: templateId }) => templateId === id)
  
  /* If no template found, skip */
  if (!inputTemplate) return

  await addTemplateInput(db, inputTemplate)
}