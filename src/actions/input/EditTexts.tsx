"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../utils";
import { updateFormInputTexts } from "@/services/input-service";

export async function EditTexts(
  formIdString: string,
  inputId: string,
  data: { header?: string; description?: string }
): Promise<void> {
  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  await updateFormInputTexts(db, formId, inputId, data);

  revalidateTag(`form-${formId}`);
}
