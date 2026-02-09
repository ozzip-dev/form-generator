"use server";

import { isUserAuthor } from "@/helpers/formHelpers";
import { ValidationErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { isInputTypeParagraph } from "@/helpers/inputHelpers";
import { makeId } from "@/lib/utils";
import { addFormFieldSchema } from "@/lib/zodSchema/editFormSchemas/addFormFieldSchema";
import { addFieldToForm, getFormById } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { Form } from "@/types/form";
import { FormInput, Input } from "@/types/input";
import { revalidateTag } from "next/cache";

/* If form is empty, add index 0. If form has inputs add last one + 1 */
function getNextOrder(form: Form): number {
  const orderValues: number[] = form.inputs.map(({ order }) => order);
  if (!orderValues.length) return 0;
  const maxOrder = Math.max(...orderValues);
  return maxOrder + 1;
}

function mapInputDocToFormInputData(input: Input, order: number): FormInput {
  const { type, header, description, validation, options = [] } = input;

  const idPrefix = header || description!;

  return {
    /* id: create from input's id + some number if ids are duplicated? or simply uuid? */
    // id: makeId(idPrefix),
    id: new Date().toString(),
    type,
    header,
    description,
    validation,
    options,
    required: false,
    unique: false,
    order,
  };
}

const maxInputCount = Number(process.env.NEXT_PUBLIC_MAX_INPUTS_PER_FORM) || 20;

const hasReachedInputLimit = (form: Form): boolean =>
  form.inputs.length >= maxInputCount;

export async function addFormFieldAction(
  formId: string,
  input: Input,
): Promise<
  | void
  | { validationErrors: ValidationErrors }
  | { inputId: string | undefined }
> {
  const user = await requireUser();
  const draft = await getFormById(formId);

  if (!draft) {
    throw new Error("Nie znaleziono formularza");
  }

  if (hasReachedInputLimit(draft)) {
    throw new Error("Osiągnięto maksymalną liczbę pól w formularzu");
  }

  if (!isUserAuthor(draft, user.id))
    throw new Error("Jedynie autor/-ka może może edytować alias");

  const { header, type, ...res } = input;
  const validationResult = addFormFieldSchema.safeParse({ header, type });

  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  const newInput = isInputTypeParagraph(input)
    ? { description: header, header: "", type, ...res }
    : input;

  const order = getNextOrder(draft);
  const inputData = mapInputDocToFormInputData(newInput, order);

  await addFieldToForm(formId, inputData);

  revalidateTag(`form-${formId}`);

  return { inputId: inputData.id };
}
