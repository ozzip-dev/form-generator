"use server";

import { db } from "@/lib/mongo";
import { addAcceptedValues } from "@/services/input-service";
import { requireUser } from "@/services/user-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";

export async function addAcceptedValuesAction(
  formIdString: string,
  inputId: string,
  values: (string | number)[],
): Promise<{
  ok: boolean;
  newValues?: (string | number)[];
  duplicatedValues?: (string | number)[];
  invalidValues?: (string | number)[];
}> {
  await requireUser();

  const formId = new ObjectId(formIdString);

  checkFormHasInputWithId(db, formId, inputId);

  try {
    const { newValues, duplicatedValues } = await addAcceptedValues(
      db,
      formId,
      inputId,
      values,
    );

    revalidateTag(`form-${formId}`);

    return {
      ok: true,
      duplicatedValues,
      newValues,
    };
  } catch (error) {
    const invalidValues = String((error as Error)?.message ?? "")
      .split(";")
      .map((value) => value.trim())
      .filter(Boolean);

    return {
      ok: false,
      invalidValues,
    };
  }
}
