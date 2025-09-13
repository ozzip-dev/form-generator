"use server";

import { Form } from "@/types/form";
import { findById } from "@/lib/mongo";
import { Db, ObjectId } from "mongodb";
import { removeInputFromDraft } from "@/services/form-service";

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
  db: Db,
  formId: ObjectId,
  inputId: string
): Promise<void> {
  console.log(formId, inputId);
  if (!formHasInputWithId(db, formId, inputId))
    console.error(`Form doesn\'t contain input: ${inputId}`);

  await removeInputFromDraft(db, formId, inputId);
}
