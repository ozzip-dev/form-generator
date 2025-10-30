"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { serializeForm } from "@/lib/form-utils";
import { db } from "@/lib/mongo";
import { editFormSchema } from "@/lib/zodSchema/editFormSchema";
import { updateForm } from "@/services/form-service";
import { Form, FormSerialized } from "@/types/form";
import { ObjectId, WithId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function EditFormHeaderAction(
  formId: string,
  updateData: any
): Promise<FormSerialized | { error: string } | { error: any }> {
  requireUser();

  console.log("updateData", updateData);

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
