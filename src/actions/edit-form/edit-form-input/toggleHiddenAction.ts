"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";
import { toggleHidden } from "@/services/input-service";
import { requireUser } from "@/services/user-service";

export async function toggleHiddenAction(
  formIdString: string,
  inputId: string,
): Promise<void> {
  await requireUser();

  const formId = new ObjectId(formIdString);

  checkFormHasInputWithId(db, formId, inputId);

  await toggleHidden(db, formId, inputId);
  revalidateTag(`form-${formId}`);
}
