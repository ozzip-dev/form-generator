"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";
import { toggleUnique } from "@/services/input-service";
import { requireUser } from "@/services/queries/requireUser";
import { runAsyncAction } from "@/helpers/runAsyncFunction";

export async function toggleUniqueAction(
  formIdString: string,
  inputId: string
): Promise<void> {
  await requireUser();

  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  await runAsyncAction(async () => {
    await toggleUnique(db, formId, inputId);
    revalidateTag(`form-${formId}`);
  });
}
