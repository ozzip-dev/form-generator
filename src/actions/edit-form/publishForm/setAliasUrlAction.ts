"use server";

import { isUserAuthor } from "@/helpers/formHelpers";
import { ValidationErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { db } from "@/lib/mongo";
import { setAliasSchema, SetAliasSchema } from "@/lib/zodSchema/setAliasSchema";
import { setAliasUrl } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { FormSerialized } from "@/types/form";
import { revalidateTag } from "next/cache";

export async function setAliasUrlAction(
  form: FormSerialized,
  alias: SetAliasSchema
): Promise<{ success: true } | { validationErrors: ValidationErrors }> {
  const user = await requireUser();

  const validationResult = setAliasSchema.safeParse(alias);

  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  if (!isUserAuthor(form, user.id))
    throw new Error("Jedynie autor/-ka może może edytować alias");

  const formId: string = form._id!;

  await setAliasUrl(db, formId, alias.url);
  revalidateTag(`form-${formId}`);
  return { success: true };
}
