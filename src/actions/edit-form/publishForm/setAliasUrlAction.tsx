"use server";

import { db } from "@/lib/mongo";
import { setAliasUrl } from "@/services/form-service";
import { isUserAuthor } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { revalidateTag } from "next/cache";
import { requireUser } from "@/services/queries/requireUser";
import { runAsyncAction } from "@/helpers/runAsyncFunction";
import { success } from "better-auth/*";

export async function setAliasUrlAction(form: FormSerialized, alias: string) {
  const user = await requireUser();

  if (!isUserAuthor(form, user.id))
    throw new Error("Jedynie autor/-ka może opublikować swój formularz");

  const formId: string = form._id!;

  return await runAsyncAction(async () => {
    await setAliasUrl(db, formId, alias);
    revalidateTag(`form-${formId}`);
    return "succes";
  });
}
