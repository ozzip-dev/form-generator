"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";
import { toggleRequired } from "@/services/input-service";
import { requireUser } from "@/services/queries/requireUser";
import { runAsyncAction } from "@/helpers/runAsyncFunction";

export async function toggleRequiredAction(
  formIdString: string,
  inputId: string
): Promise<void> {
  await requireUser();

  const formId = new ObjectId(formIdString);

  checkFormHasInputWithId(db, formId, inputId);

  await runAsyncAction(async () => {
    await toggleRequired(db, formId, inputId);
    revalidateTag(`form-${formId}`);
  });
}
