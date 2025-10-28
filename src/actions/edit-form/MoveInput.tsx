"use server";

import { serializeForm } from "@/lib/form-utils";
import { db } from "@/lib/mongo";
import { moveInputDown, moveInputUp } from "@/services/input-service";
import { FormSerialized } from "@/types/form";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../utils";
import { requireUser } from "@/dataAccessLayer/queries";

export async function MoveInputUp(
  formIdString: string,
  inputId: string
): Promise<FormSerialized | undefined> {
  requireUser();

  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  const result = await moveInputUp(db, new ObjectId(formId), inputId);

  if (!result) return;
  revalidateTag(`form-${formId}`);

  return serializeForm(result);
}

export async function MoveInputDown(
  formIdString: string,
  inputId: string
): Promise<FormSerialized | undefined> {
  requireUser();
  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  const result = await moveInputDown(db, new ObjectId(formId), inputId);

  if (!result) return;
  revalidateTag(`form-${formId}`);

  return serializeForm(result);
}
