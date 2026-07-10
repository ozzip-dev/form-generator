"use server";

import { db } from "@/lib/mongo";
import { removeAcceptedValue } from "@/services/input-service";
import { requireUser } from "@/services/user-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";

export async function removeAcceptedValueAction(
  formIdString: string,
  inputId: string,
  value: string | number,
): Promise<void> {
  await requireUser();

  const formId = new ObjectId(formIdString);

  checkFormHasInputWithId(db, formId, inputId);

  await removeAcceptedValue(db, formId, inputId, value);

  revalidateTag(`form-${formId}`);
}
