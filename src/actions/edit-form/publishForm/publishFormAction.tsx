"use server";

import { db } from "@/lib/mongo";
import { publishForm } from "@/services/form-service";
import { isUserAuthor } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { requireUser } from "@/services/queries/requireUser";
import { runAsyncAction } from "@/helpers/runAsyncFunction";

export async function publishFormAction(form: FormSerialized) {
  const user = await requireUser();

  if (!isUserAuthor(form, user.id))
    throw new Error("Jedynie autor/-ka może opublikować swój formularz");

  const formId: string = form._id!;

  return await runAsyncAction(async () => {
    await publishForm(db, formId);
    return `/submit/${formId}`;
  });
}
