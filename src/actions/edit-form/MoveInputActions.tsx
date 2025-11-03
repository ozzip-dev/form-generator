"use server";

import { serializeForm } from "@/lib/serialize-utils";
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
  await requireUser();

  if (!ObjectId.isValid(formIdString)) {
    throw new Error("Invalid formId");
  }
  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  try {
    const result = await moveInputUp(db, formId, inputId);

    if (!result) return;
    revalidateTag(`form-${formId}`);
    return serializeForm(result);
  } catch (err) {
    console.error("MoveInputUp:", err);
    throw new Error(`Błąd: ${String(err)}`);
  }
}

export async function MoveInputDown(
  formIdString: string,
  inputId: string
): Promise<FormSerialized | undefined> {
  requireUser();

  if (!ObjectId.isValid(formIdString)) {
    throw new Error("Invalid formId");
  }
  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  try {
    const result = await moveInputDown(db, formId, inputId);

    if (!result) return;
    revalidateTag(`form-${formId}`);

    return serializeForm(result);
  } catch (err) {
    console.error("MoveInputDown:", err);
    throw new Error(`Błąd: ${String(err)}`);
  }
}
