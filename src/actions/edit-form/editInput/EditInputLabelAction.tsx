"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { db } from "@/lib/mongo";
import { conditionalInputSchema } from "@/lib/zodSchema/editFormSchema";
import { updateFormInputTexts } from "@/services/input-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";

export async function EditInputLabelAction(
  formIdString: string,
  inputId: string,
  data: { header?: string; description?: string }
): Promise<void | any> {
  await requireUser();

  if (data.header) {
    const validationResult = conditionalInputSchema.safeParse(data);

    if (!validationResult.success) {
      return { error: handleServerErrors(validationResult.error) };
    }
  }

  try {
    const formId = new ObjectId(formIdString);

    if (!checkFormHasInputWithId(db, formId, inputId)) return;

    await updateFormInputTexts(db, formId, inputId, data);

    revalidateTag(`form-${formId}`);
  } catch (err) {
    console.error("Błąd EditInputLabelAction:", err);
    throw new Error(`Błąd: ${err}`);
  }
}
