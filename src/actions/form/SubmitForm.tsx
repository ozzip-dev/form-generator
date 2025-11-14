"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/dataAccessLayer/queries";
import { Answers } from "@/types/result";
import { addFormSubmission } from "@/services/result-service";

export async function SubmitForm(formId: string, answers: Answers) {
  await requireUser();

  // TODO: check user is not logged in? as moderator?

  try {
    await addFormSubmission(formId, answers)
  } catch (err: any) {
    console.error(err)
    // TODO: what should happen? Redirect + error/warning message?
    redirect('/dashboard')
  }
}