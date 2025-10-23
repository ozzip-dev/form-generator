"use server";

import { serializeForm } from "@/lib/form-utils";
import { db } from "@/lib/mongo";
import {
  formHasInputWithId,
  moveInputDown,
  moveInputUp,
} from "@/services/form-service";
import { FormSerialized } from "@/types/form";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function MoveInputUp(
  formIdString: string,
  inputId: string
): Promise<FormSerialized | undefined> {
  const formId = new ObjectId(formIdString);

  console.log("xxxx", formId);
  if (!formHasInputWithId(db, formId, inputId))
    console.error(`Form doesn\'t contain input: ${inputId}`);

  const result = await moveInputUp(db, new ObjectId(formId), inputId);
  console.log("result", result);
  if (!result) return;
  revalidateTag(`form-${formId}`);

  return serializeForm(result);
}

export async function MoveInputDown(
  formIdString: string,
  inputId: string
): Promise<FormSerialized | undefined> {
  const formId = new ObjectId(formIdString);
  if (!formHasInputWithId(db, formId, inputId))
    console.error(`Form doesn\'t contain input: ${inputId}`);

  const result = await moveInputDown(db, new ObjectId(formId), inputId);

  if (!result) return;
  revalidateTag(`form-${formId}`);
  return serializeForm(result);
}
