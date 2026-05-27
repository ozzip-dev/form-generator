"use server";

import { isActive } from "@/helpers/formHelpers";
import { ValidationErrors } from "@/helpers/helpers-validation/handleFormErrors";
import { createdFormSchema } from "@/lib/zod-schema/createdFormSchema";
import { getFormById } from "@/services/form-service";
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
  inputs: FormInput[],
): Promise<void | { validationErrors: ValidationErrors }> {
  const form = await getFormById(formId);
  if (!isActive(form)) throw new Error("Only active form can be submitted");

  const schema = createdFormSchema(inputs);

  const validationResult = schema.safeParse(answers);

  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  const resultExists = await formResultExists(formId);
  const uniqueErrorFields = await checkUniqueFieldsValid(formId, answers);

  if (!uniqueErrorFields.length) {
    resultExists
      ? await addSubmission(formId, answers)
      : await createResult(formId, answers);

    return;
  }

  return {
    validationErrors: Object.fromEntries(
      uniqueErrorFields.map((id) => [
        id,
        ["Formularz z podaną wartością został już wysłany"],
      ]),
    ),
  };
}
