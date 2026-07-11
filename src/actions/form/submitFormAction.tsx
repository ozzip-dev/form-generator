"use server";

import { isActive } from "@/helpers/formHelpers";
import { isInputSubmittable } from "@/helpers/inputHelpers";
import { ValidationErrors } from "@/helpers/helpers-validation/handleFormErrors";
import { db } from "@/lib/mongo";
import { createdFormSchema } from "@/lib/zod-schema/createdFormSchema";
import { getFormById } from "@/services/form-service";
import { addSubmittedValue } from "@/services/input-service";
import {
  addSubmission,
  checkUniqueFieldsValid,
  createResult,
  formResultExists,
} from "@/services/result-service";
import { FormInput } from "@/types/input";
import { Answers } from "@/types/result";
import { ObjectId } from "mongodb";

const normalizeAnswerValue = (
  value: string,
  inputType: FormInput["type"],
): string | number => {
  if (inputType === "number" || inputType === "pesel") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : value;
  }

  return value;
};

export async function submitFormAction(
  formId: string,
  answers: Answers,
  _inputs: FormInput[],
): Promise<void | { validationErrors: ValidationErrors }> {
  const form = await getFormById(formId);
  if (!isActive(form)) throw new Error("Only active form can be submitted");

  const submittableInputs = form.inputs.filter(isInputSubmittable);
  const schema = createdFormSchema(submittableInputs);
  const validationResult = schema.safeParse(answers);

  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  const acceptedValuesErrors: ValidationErrors = {};
  const valuesToSubmit: {
    inputId: string;
    value: string | number;
  }[] = [];

  for (const input of submittableInputs) {
    const { id, acceptedValues = [], submittedValues = [] } = input;
    if (!id || !acceptedValues.length) continue;

    const answerValue = answers[id];
    if (typeof answerValue !== "string") continue;

    const trimmedValue = answerValue.trim();
    if (!trimmedValue) continue;

    const normalizedValue = normalizeAnswerValue(trimmedValue, input.type);
    const valueNotAccepted = !acceptedValues.includes(normalizedValue);
    const valueAlreadySubmitted = submittedValues.includes(normalizedValue);

    if (valueNotAccepted || valueAlreadySubmitted) {
      const msg = valueNotAccepted
        ? "Podana wartość nie jest akceptowana"
        : "Ta wartość została już wykorzystana";
      acceptedValuesErrors[id] = [msg];
      continue;
    }
    valuesToSubmit.push({ inputId: id, value: normalizedValue });
  }

  const resultExists = await formResultExists(formId);
  const uniqueErrorFields = await checkUniqueFieldsValid(formId, answers);

  const uniqueErrors: ValidationErrors = Object.fromEntries(
    uniqueErrorFields.map((id) => [
      id,
      ["Formularz z podaną wartością został już wysłany"],
    ]),
  );

  const validationErrors: ValidationErrors = {
    ...acceptedValuesErrors,
    ...uniqueErrors,
  };

  if (Object.keys(validationErrors).length) {
    return { validationErrors };
  }

  resultExists
    ? await addSubmission(formId, answers)
    : await createResult(formId, answers);

  for (const { inputId, value } of valuesToSubmit) {
    await addSubmittedValue(db, new ObjectId(formId), inputId, value);
  }

  return;
}
