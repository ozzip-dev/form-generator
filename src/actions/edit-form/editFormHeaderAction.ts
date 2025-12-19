"use server";

import { ValidationErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { db } from "@/lib/mongo";
import { editFormHeaderSchema } from "@/lib/zodSchema/editFormSchemas/editFormHeaderSchema";
import { updateForm } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { Form } from "@/types/form";
import { ObjectId, WithId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function editFormHeaderAction(
  formId: string,
  updateData: Record<string, string>
): Promise<void | { validationErrors: ValidationErrors }> {
  await requireUser();

  const validationResult = editFormHeaderSchema.partial().safeParse(updateData);

  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  const result: WithId<Form> | null = await updateForm(
    db,
    new ObjectId(formId),
    updateData
  );

  if (!result) {
    throw new Error("Nie udało się zaktualizować formularza");
  }
  // revalidateTag(`form-${formId}`);
}
