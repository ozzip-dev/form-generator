"use server";

import { isUserAuthor } from "@/helpers/formHelpers";
import { ValidationErrors } from "@/helpers/helpers-validation/handleFormErrors";
import { db } from "@/lib/mongo";
import {
  setAliasSchema,
  SetAliasSchema,
} from "@/lib/zod-schema/setAliasSchema";
import { getFormById, setAliasUrl } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { Form } from "@/types/form";
import { revalidateTag } from "next/cache";

export async function setAliasUrlAction(
  formId: string,
  alias: SetAliasSchema,
): Promise<{ success: true } | { validationErrors: ValidationErrors }> {
  const user = await requireUser();

  const validationResult = setAliasSchema.safeParse(alias);

  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  const form: Form = await getFormById(formId);

  if (!isUserAuthor(form, user.id))
    return {
      validationErrors: {
        url: ["Jedynie autor/-ka może może edytować alias"],
      },
    };

  try {
    await setAliasUrl(db, formId, alias.url);
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
