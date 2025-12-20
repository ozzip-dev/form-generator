"use server";

import { checkFormHasInputWithId } from "@/actions/utils";
import { db } from "@/lib/mongo";
import { removeInputFromDraft } from "@/services/input-service";
import { requireUser } from "@/services/user-service";
import { Form } from "@/types/form";
import { ObjectId, WithId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function removeInputFromDraftAction(
  formIdString: string,
  inputId: string
): Promise<void> {
  await requireUser();

  if (!ObjectId.isValid(formIdString)) {
    throw new Error("Invalid formId");
  }

  const formId = new ObjectId(formIdString);

  checkFormHasInputWithId(db, formId, inputId);

  const result: WithId<Form> | null = await removeInputFromDraft(
    db,
    formId,
    inputId
  );

  if (!result) return;
  revalidateTag(`form-${formId}`);
}
