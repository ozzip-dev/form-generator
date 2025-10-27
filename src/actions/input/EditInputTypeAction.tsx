"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../utils";
import { updateFormInputType } from "@/services/input-service";
import { InputType } from "@/enums/input";

export async function EditInputTypeAction(
  formIdString: string,
  inputId: string,
  type: InputType
): Promise<void> {
  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  await updateFormInputType(db, formId, inputId, type);

  revalidateTag(`form-${formId}`);
}
