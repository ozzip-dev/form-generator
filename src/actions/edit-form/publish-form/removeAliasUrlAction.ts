"use server";

import { isUserAuthor } from "@/helpers/formHelpers";
import { db } from "@/lib/mongo";
import { removeAliasUrl } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { FormSerialized } from "@/types/form";
import { revalidateTag } from "next/cache";

export async function removeAliasUrlAction(
  form: FormSerialized
): Promise<void> {
  const user = await requireUser();

  if (!isUserAuthor(form, user.id))
    throw new Error("Jedynie autor/-ka może edytować alias");

  const formId: string = form._id!;

  await removeAliasUrl(db, formId);

  revalidateTag(`form-${formId}`);
}
