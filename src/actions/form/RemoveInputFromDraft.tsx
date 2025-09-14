"use server";

import { Form, FormSerialized } from "@/types/form";
import { db, findById } from "@/lib/mongo";
import { Db, ObjectId, WithId } from "mongodb";
import { removeInputFromDraft } from "@/services/form-service";
import { serializeForm } from "@/lib/form-utils";

async function formHasInputWithId(
  db: Db,
  formId: ObjectId,
  inputId: string
): Promise<boolean> {
  const form = (await findById(db, "form", formId)) as Form | null;
  if (!form) return false;
  return form.inputs.some(({ id }) => id === inputId);
}

export async function RemoveInputFromDraft(
  formIdString: string,
  inputId: string
): Promise<FormSerialized | undefined> {
  const formId = new ObjectId(formIdString);
  if (!formHasInputWithId(db, formId, inputId))
    console.error(`Form doesn\'t contain input: ${inputId}`);

  const result: WithId<Form> | null = await removeInputFromDraft(
    db,
    formId,
    inputId
  );

  if (!result) return;

  return serializeForm(result);
}
