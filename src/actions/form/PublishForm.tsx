"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/dataAccessLayer/queries";
import { db } from "@/lib/mongo";
import { publishForm } from "@/services/form-service";
import { isUserAuthor } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";

export async function PublishForm(form: FormSerialized) {
  const user = await requireUser();

  if (!isUserAuthor(form, user.id))
    throw new Error('Jedynie autor/-ka może opublikować swój formularz')

  const formId: string = form._id!

  try {
    await publishForm(db, formId)
  } catch (err: any) {
    console.error(err)
    // TODO: what should happen? Redirect + error/warning message?
    redirect('/dashboard')
  }

  redirect(`/submit/${formId}`);
}