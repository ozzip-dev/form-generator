"use server";

import { Answers } from "@/types/result";
import {
  addSubmission,
  checkUniqueFieldsValid,
  createResult,
  formResultExists,
} from "@/services/result-service";

export async function submitFormAction(formId: string, answers: Answers) {
  const resultExists = await formResultExists(formId);
  if (resultExists) await checkUniqueFieldsValid(formId, answers);

  resultExists
    ? await addSubmission(formId, answers)
    : await createResult(formId, answers);
}
