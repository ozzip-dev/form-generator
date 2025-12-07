"use server";

import { Answers } from "@/types/result";
import {
  addSubmission,
  checkUniqueFieldsValid,
  createResult,
  formResultExists,
} from "@/services/result-service";
import { requireUser } from "@/services/user-service";
import { createdFormSchema } from "@/lib/zodSchema/createdFormSchema";
import { FormInput } from "@/types/input";
import { ValidationErrors } from "@/helpers/helpersValidation/handleFormErrors";

export async function submitFormAction(
  formId: string,
  answers: Answers,
  inputs: FormInput[]
): Promise<void | { validationErrors: ValidationErrors }> {
  await requireUser();
  console.log("inputs", inputs);

  const schema = createdFormSchema(inputs);

  const validationResult = schema.safeParse(answers);

  console.log(
    "errr",
    validationResult.error && validationResult.error.flatten().fieldErrors
  );

  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  const resultExists = await formResultExists(formId);
  if (resultExists) await checkUniqueFieldsValid(formId, answers);

  resultExists
    ? await addSubmission(formId, answers)
    : await createResult(formId, answers);
}
