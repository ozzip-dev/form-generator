"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../utils";
import { toggleRequired } from "@/services/input-service";

export async function ToggleRequired(
  formIdString: string,
  inputId: string
): Promise<void> {
  console.log("ToggleRequired action called with:", formIdString, inputId);
  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  await toggleRequired(db, formId, inputId);

  revalidateTag(`form-${formId}`);
}
