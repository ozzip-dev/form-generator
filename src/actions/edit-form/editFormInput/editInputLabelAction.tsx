"use server";

import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { db } from "@/lib/mongo";
import { conditionalInputSchema } from "@/lib/zodSchema/editFormSchemas/editFormSchema";
import { updateFormInputTexts } from "@/services/input-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";
import { requireUser } from "@/services/queries/requireUser";
import { runAsyncAction } from "@/helpers/runAsyncFunction";

export async function editInputLabelAction(
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

  const performEditInputLabel = async () => {
    const formId = new ObjectId(formIdString);

    if (!checkFormHasInputWithId(db, formId, inputId)) return;

    await updateFormInputTexts(db, formId, inputId, data);

    revalidateTag(`form-${formId}`);
  };

  await runAsyncAction(performEditInputLabel);
}
