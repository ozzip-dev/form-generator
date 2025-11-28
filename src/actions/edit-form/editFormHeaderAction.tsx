"use server";

import {
  handleServerErrors,
  ModelFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { db } from "@/lib/mongo";
import { updateForm } from "@/services/form-service";
import { Form } from "@/types/form";
import { ObjectId, WithId } from "mongodb";
import { revalidateTag } from "next/cache";
import { editFormHeaderSchema } from "@/lib/zodSchema/editFormSchemas/editFormHeaderSchema";
import { requireUser } from "@/services/user-service";

export async function editFormHeaderAction(
  formId: string,
  updateData: Record<string, string>
): Promise<void | { error: ModelFieldErrors }> {
  await requireUser();

  const validationResult = editFormHeaderSchema.partial().safeParse(updateData);

  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  const result: WithId<Form> | null = await updateForm(
    db,
    new ObjectId(formId),
    updateData
  );

  if (!result) {
    throw new Error("Nie udało się zaktualizować formularza");
  }
  revalidateTag(`form-${formId}`);
}
