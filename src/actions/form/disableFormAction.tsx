"use server";

import { isUserAuthor } from "@/helpers/formHelpers";
import { ValidationErrors } from "@/helpers/helpers-validation/handleFormErrors";
import { db } from "@/lib/mongo";
import { getFormById, setFormDisabled } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { Form } from "@/types/form";
import { revalidateTag } from "next/cache";

const DEFAULT_DISABLED_TEXT = "Formularz nieaktywny";

export async function disableFormAction(
  formId: string,
  disabledText?: string,
): Promise<{ success: true } | { validationErrors: ValidationErrors }> {
  const user = await requireUser();

  const form: Form = await getFormById(formId);

  if (!isUserAuthor(form, user.id))
    throw new Error("Tylko autor/autorka formularza może edytować stan ");

  try {
    await setFormDisabled(db, formId, disabledText || DEFAULT_DISABLED_TEXT);
  } catch (error) {
    return {
      validationErrors: {
        url: [(error as Error).message],
      },
    };
  }

  revalidateTag(`form-${formId}`);

  return { success: true };
}
