"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../utils";
import { toggleUnique } from "@/services/input-service";
import { requireUser } from "@/dataAccessLayer/queries";

export async function ToggleUniqueAction(
  formIdString: string,
  inputId: string
): Promise<void> {
  await requireUser();

  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  try {
    await toggleUnique(db, formId, inputId);
    revalidateTag(`form-${formId}`);
  } catch (err) {
    console.error("Błąd ToggleUniqueAction:", err);
    throw new Error(`Błąd: ${err}`);
  }
}
