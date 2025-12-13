"use server";

import { db } from "@/lib/mongo";
import { editInputFormSchema } from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
import { updateFormInputTexts } from "@/services/input-service";
import { requireUser } from "@/services/user-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";
import { ValidationErrors } from "@/helpers/helpersValidation/handleFormErrors";

export async function editInputLabelAction(
  formIdString: string,
  inputId: string,
  data: { header?: string; description?: string }
): Promise<void | { validationErrors: ValidationErrors }> {
  await requireUser();

  const validationResult = editInputFormSchema.partial().safeParse(data);

  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  const formId = new ObjectId(formIdString);

  checkFormHasInputWithId(db, formId, inputId);

  await updateFormInputTexts(db, formId, inputId, data);

  revalidateTag(`form-${formId}`);
}
