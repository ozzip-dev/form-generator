"use server";

import { checkFormHasInputWithId } from "@/actions/utils";
import { runAsyncAction } from "@/helpers/runAsyncFunction";
import { db } from "@/lib/mongo";
import { moveInputDown, moveInputUp } from "@/services/input-service";
import { requireUser } from "@/services/queries/requireUser";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function moveInputUpAction(
  formIdString: string,
  inputId: string
): Promise<void> {
  await requireUser();

  const formId = new ObjectId(formIdString);

  if (!ObjectId.isValid(formIdString)) {
    throw new Error("Invalid formId");
  }

  checkFormHasInputWithId(db, formId, inputId);

  await runAsyncAction(async () => {
    const result = await moveInputUp(db, formId, inputId);

    if (!result) {
      throw new Error("Move failed");
    }
    revalidateTag(`form-${formId}`);
  });
}

export async function moveInputDownAction(
  formIdString: string,
  inputId: string
): Promise<void> {
  requireUser();

  if (!ObjectId.isValid(formIdString)) {
    throw new Error("Invalid formId");
  }
  const formId = new ObjectId(formIdString);

  checkFormHasInputWithId(db, formId, inputId);

  await runAsyncAction(async () => {
    const result = await moveInputDown(db, formId, inputId);

    if (!result) return;
    revalidateTag(`form-${formId}`);
  });
}
