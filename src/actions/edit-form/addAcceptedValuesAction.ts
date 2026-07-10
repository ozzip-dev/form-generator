"use server";

import { db } from "@/lib/mongo";
import { addAcceptedValues } from "@/services/input-service";
import { requireUser } from "@/services/user-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../utils";

export async function addAcceptedValuesAction(
  formIdString: string,
  inputId: string,
  values: (string | number)[],
): Promise<void> {
  await requireUser();

  const formId = new ObjectId(formIdString);

  checkFormHasInputWithId(db, formId, inputId);

  try {
    await addAcceptedValues(db, formId, inputId, values);
  } catch (error) {
    const invalidValues = (error as Error).message
      .split(";")
      .map((value) => value.trim())
      .filter(Boolean);

    throw new Error(invalidValues.join(", "));
  }

  revalidateTag(`form-${formId}`);
}
