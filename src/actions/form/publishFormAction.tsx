"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/mongo";
import { publishForm } from "@/services/form-service";
import { isUserAuthor } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { requireUser } from "@/services/queries/requireUser";

export async function publishFormAction(form: FormSerialized) {
  const user = await requireUser();

  if (!isUserAuthor(form, user.id))
    throw new Error("Jedynie autor/-ka może opublikować swój formularz");

  const formId: string = form._id!;

  try {
    await publishForm(db, formId);
  } catch (err: any) {
    console.error(err);
    // TODO: what should happen? Redirect + error/warning message?
    redirect("/dashboard");
  }

  redirect(`/submit/${formId}`);
}
