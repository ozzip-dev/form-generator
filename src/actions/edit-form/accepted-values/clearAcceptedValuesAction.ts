"use server";

import { db } from "@/lib/mongo";
import {
  clearAcceptedValues,
  removeAcceptedValue,
} from "@/services/input-service";
import { requireUser } from "@/services/user-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";

export async function clearAcceptedValuesAction(
  formIdString: string,
  inputId: string,
): Promise<void> {
  await requireUser();

  const formId = new ObjectId(formIdString);

  checkFormHasInputWithId(db, formId, inputId);

  await clearAcceptedValues(db, formId, inputId);

  revalidateTag(`form-${formId}`);
}
