"use server";

import {
  handleServerErrors,
  ModelFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { db } from "@/lib/mongo";
import { updateFormInputTexts } from "@/services/input-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";
import { editInputFormSchema } from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
import { requireUser } from "@/services/user-service";
import { headers } from "next/headers";
export async function editInputLabelAction(
  formIdString: string,
  inputId: string,
  data: { header?: string; description?: string }
): Promise<void | { error: any }> {
  await requireUser();

  if (data.header || data.description) {
    const validationResult = editInputFormSchema.partial().safeParse(data);

    if (!validationResult.success) {
      return { error: validationResult.error.formErrors.fieldErrors };
    }
  }
  const formId = new ObjectId(formIdString);

  checkFormHasInputWithId(db, formId, inputId);

  await updateFormInputTexts(db, formId, inputId, data);

  revalidateTag(`form-${formId}`);
}
