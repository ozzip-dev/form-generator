"use server";

import { Form, FormSerialized } from "@/types/form";
import { db } from "@/lib/mongo";
import { ObjectId, WithId } from "mongodb";
import {
  formHasInputWithId,
  removeInputFromDraft,
} from "@/services/form-service";
import { serializeForm } from "@/lib/form-utils";
import { revalidateTag } from "next/cache";

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
  revalidateTag(`form-${formId}`);

  return serializeForm(result);
}
