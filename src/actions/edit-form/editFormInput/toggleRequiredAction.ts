"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";
import { toggleRequired } from "@/services/input-service";
import { requireUser } from "@/services/user-service";

export async function toggleRequiredAction(
  formIdString: string,
  inputId: string
): Promise<void> {
  await requireUser();

  const formId = new ObjectId(formIdString);

  checkFormHasInputWithId(db, formId, inputId);

  await toggleRequired(db, formId, inputId);
  revalidateTag(`form-${formId}`);
}
