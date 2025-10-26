"use server";

import { Form, FormSerialized } from "@/types/form";
import { db } from "@/lib/mongo";
import { ObjectId, WithId } from "mongodb";
import { serializeForm } from "@/lib/serialize-utils";
import { revalidateTag } from "next/cache";
import { removeInputFromDraft } from "@/services/input-service";
import { checkFormHasInputWithId } from "../utils";

export async function RemoveInputFromDraft(
  formIdString: string,
  inputId: string
): Promise<FormSerialized | undefined> {
  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  const result: WithId<Form> | null = await removeInputFromDraft(
    db,
    formId,
    inputId
  );

  if (!result) return;
  revalidateTag(`form-${formId}`);

  return serializeForm(result);
}
