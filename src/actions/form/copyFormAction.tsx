"use server";

import { isUserAuthor } from "@/helpers/formHelpers";
import { ValidationErrors } from "@/helpers/helpers-validation/handleFormErrors";
import { db } from "@/lib/mongo";
import {
  checkFormLimitError,
  copyForm,
  getFormById,
} from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { Form } from "@/types/form";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function copyFormAction(
  formId: string,
): Promise<{ success: true } | { error: string }> {
  const user = await requireUser();

  const form: Form = await getFormById(formId);

  if (!isUserAuthor(form, user.id))
    return { error: "Tylko autor/autorka formularza może kopiować formularz." };

  const limitError = await checkFormLimitError(new ObjectId(user.id));
  console.log({ limitError });
  console.log({ userId: user.id });
  if (limitError) {
    return { error: limitError };
  }

  try {
    await copyForm(db, form, user.id);
  } catch (error) {
    return {
      errors: {
        url: [(error as Error).message],
      },
    };
  }

  revalidateTag(`form-${formId}`);

  return { success: true };
}
