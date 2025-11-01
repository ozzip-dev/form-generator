"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { serializeForm } from "@/lib/serialize-utils";
import { db } from "@/lib/mongo";
import { editFormSchema } from "@/lib/zodSchema/editFormSchema";
import { updateForm } from "@/services/form-service";
import { Form, FormSerialized } from "@/types/form";
import { ObjectId, WithId } from "mongodb";
import { revalidateTag } from "next/cache";

type FormActionError = { error: Record<string, { message: string }> | string };

export async function EditFormHeaderAction(
  formId: string,
  updateData: Record<string, string>
): Promise<FormSerialized | FormActionError> {
  requireUser();

  const validationResult = editFormSchema.partial().safeParse(updateData);

  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  try {
    const result: WithId<Form> = await updateForm(
      db,
      new ObjectId(formId),
      updateData
    );

    if (!result) {
      return { error: "Nie udało się zaktualizować formularza" };
    }
    revalidateTag(`form-${formId}`);

    return serializeForm(result as Form);
  } catch (err: any) {
    console.error("Błąd EditFormAction:", err);
    throw new Error(`Błąd: ${err}`);
  }
}
