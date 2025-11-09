"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";
import { updateFormInputType } from "@/services/input-service";
import { InputType } from "@/enums/input";
import { requireUser } from "@/dataAccessLayer/queries";

export async function EditInputTypeAction(
  formIdString: string,
  inputId: string,
  type: InputType
): Promise<void> {
  await requireUser();
  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;
  try {
    await updateFormInputType(db, formId, inputId, type);

    revalidateTag(`form-${formId}`);
  } catch (err) {
    console.error("Błąd EditInputTypeAction:", err);
    throw new Error(`Błąd: ${err}`);
  }
}
