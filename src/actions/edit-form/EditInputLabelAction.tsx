"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../utils";
import { updateFormInputTexts } from "@/services/input-service";
import { requireUser } from "@/dataAccessLayer/queries";
import {
  editFormSchema,
  conditionalInputSchema,
  inputItemSchema,
} from "@/lib/zodSchema/editFormSchema";
import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";

export async function EditInputLabelAction(
  formIdString: string,
  inputId: string,
  data: { header?: string; description?: string }
): Promise<void | any> {
  requireUser();
  const validationResult = conditionalInputSchema.safeParse(data);
  console.log("validationResult", validationResult);
  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  const formId = new ObjectId(formIdString);

  if (!checkFormHasInputWithId(db, formId, inputId)) return;

  await updateFormInputTexts(db, formId, inputId, data);

  revalidateTag(`form-${formId}`);
}
