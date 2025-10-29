"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../utils";
import { toggleRequired } from "@/services/input-service";
import { requireUser } from "@/dataAccessLayer/queries";

export async function ToggleRequiredAction(
  formIdString: string,
  inputId: string
): Promise<void> {
  requireUser();

  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  await toggleRequired(db, formId, inputId);

  revalidateTag(`form-${formId}`);
}
