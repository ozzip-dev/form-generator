"use server";

import { ValidationErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { createdFormSchema } from "@/lib/zodSchema/createdFormSchema";
import {
  addSubmission,
  checkUniqueFieldsValid,
  createResult,
  formResultExists,
} from "@/services/result-service";
import { FormInput } from "@/types/input";
import { Answers } from "@/types/result";

export async function submitFormAction(
  formId: string,
  answers: Answers,
  inputs: FormInput[]
): Promise<void | { validationErrors: ValidationErrors }> {
  const schema = createdFormSchema(inputs);

  const validationResult = schema.safeParse(answers);

  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  const resultExists = await formResultExists(formId);
  if (resultExists) await checkUniqueFieldsValid(formId, answers);

  resultExists
    ? await addSubmission(formId, answers)
    : await createResult(formId, answers);
}
