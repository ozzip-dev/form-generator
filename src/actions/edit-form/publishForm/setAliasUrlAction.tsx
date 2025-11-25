"use server";

import { db } from "@/lib/mongo";
import { setAliasUrl } from "@/services/form-service";
import { isUserAuthor } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { revalidateTag } from "next/cache";
import { requireUser } from "@/services/queries/requireUser";
import { runAsyncAction } from "@/helpers/runAsyncFunction";
import { setAliasSchema, SetAliasSchema } from "@/lib/zodSchema/setAliasSchema";
import {
  handleServerErrors,
  MoledFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";

export async function setAliasUrlAction(
  form: FormSerialized,
  alias: SetAliasSchema
): Promise<{ success: true } | { error: MoledFieldErrors }> {
  const user = await requireUser();

  const validationResult = setAliasSchema.safeParse(alias);
  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  if (!isUserAuthor(form, user.id))
    throw new Error("Jedynie autor/-ka może opublikować swój formularz");

  const formId: string = form._id!;

  return await runAsyncAction(async () => {
    await setAliasUrl(db, formId, alias.url);
    revalidateTag(`form-${formId}`);
    return { success: true };
  });
}
