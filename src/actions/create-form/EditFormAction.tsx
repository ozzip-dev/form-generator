"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { handleServerErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { serializeForm } from "@/lib/form-utils";
import { db } from "@/lib/mongo";
import { editFormSchema, EditFormSchema } from "@/lib/zodShema/editFormSchema";
import { updateForm } from "@/services/form-service";
import { Form, FormSerialized } from "@/types/form";
import { ObjectId, WithId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function EditFormAction(
  formId: string,
  updateData: EditFormSchema
): Promise<FormSerialized | { error: string } | { error: any }> {
  requireUser();

  const { title, description, type } = updateData;
  const validationResult = editFormSchema.safeParse({
    title,
    description,
    type,
  });

  if (!validationResult.success) {
    console.log("");
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
