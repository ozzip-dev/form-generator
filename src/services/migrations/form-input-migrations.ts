import { find, insert } from "@/lib/mongo";
import { formTemplates } from "@/lib/mongo/templates";
import { Form } from "@/types/form";
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
