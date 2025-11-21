"use server";

import { Answers } from "@/types/result";
import { addSubmission, checkUniqueFieldsValid, createResult, formResultExists } from "@/services/result-service";
import { revalidateTag } from "next/cache";

export async function SubmitForm(formId: string, answers: Answers) {
  // await requireUser();
  // TODO: check user is not logged in? moderator can't submit?

  const resultExists = await formResultExists(formId)
  if (resultExists)
    await checkUniqueFieldsValid(formId, answers)

  resultExists
    ? await addSubmission(formId, answers)
    : await createResult(formId, answers)
    
    revalidateTag(`form-${formId}`);
}