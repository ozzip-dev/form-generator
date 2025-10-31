"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { db } from "@/lib/mongo";
import { setAliasUrl } from "@/services/form-service";
import { isUserAuthor } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { revalidateTag } from "next/cache";

export async function SetAliasUrl(form: FormSerialized, alias: string) {
  const user = await requireUser();

  if (!isUserAuthor(form, user.id))
    throw new Error('Jedynie autor/-ka może opublikować swój formularz')

  const formId: string = form._id!

  try {
    await setAliasUrl(db, formId, alias)

    revalidateTag(`form-${formId}`);
  } catch (err: any) {
    // // TODO: what should happen? Redirect + error/warning message?
    throw new Error(err.message)
  }
}