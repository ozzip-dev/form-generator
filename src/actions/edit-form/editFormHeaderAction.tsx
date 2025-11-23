"use server";

import {
  handleServerErrors,
  MoledFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { serializeForm } from "@/lib/serialize-utils";
import { db } from "@/lib/mongo";
import { updateForm } from "@/services/form-service";
import { Form, FormSerialized } from "@/types/form";
import { ObjectId, WithId } from "mongodb";
import { revalidateTag } from "next/cache";
import { requireUser } from "@/services/queries/requireUser";
import { runAsyncAction } from "@/helpers/runAsyncFunction";
import { editFormHeaderSchema } from "@/lib/zodSchema/editFormSchemas/editFormHeaderSchema";

export async function editFormHeaderAction(
  formId: string,
  updateData: Record<string, string>
): Promise<FormSerialized | { error: MoledFieldErrors }> {
  await requireUser();

  const validationResult = editFormHeaderSchema.partial().safeParse(updateData);

  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  const performUpdate = async () => {
    const result: WithId<Form> | null = await updateForm(
      db,
      new ObjectId(formId),
      updateData
    );

    if (!result) {
      throw new Error("Nie udało się zaktualizować formularza");
    }
    revalidateTag(`form-${formId}`);

    return serializeForm(result as Form);
  };

  return await runAsyncAction(performUpdate);
}
