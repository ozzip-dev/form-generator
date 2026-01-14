"use server";

import {
  handleServerErrors,
  ModelFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import { db, updateById } from "@/lib/mongo";
import { makeId } from "@/lib/utils";
import { editInputFormSchema } from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
import { getFormById } from "@/services/form-service";
import { checkInputHasOtherOption } from "@/services/input-service";
import { requireUser } from "@/services/user-service";
import { FormInput } from "@/types/input";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

const maxOptionCount =
  Number(process.env.NEXT_PUBLIC_MAX_OPTIONS_PER_INPUT) || 20;

const hasReachedOptionLimit = (input: FormInput): boolean =>
  input.options?.length >= maxOptionCount;

export const editInputOptionAction = async (
  formIdString: string,
  inputId: string,
  inputLabel: string,
  inputName: string,
  isCurrentOptionOther: boolean
): Promise<void | { validationErrors: ModelFieldErrors }> => {
  await requireUser();

  const formId = new ObjectId(formIdString);
  const form = await getFormById(formId.toString());
  const input = form.inputs.find((i) => i.id === inputId);
  if (!input) return;

  if (hasReachedOptionLimit(input)) {
    throw new Error("Osiągnięto maksymalną liczbę opcji");
  }

  const optionIndex = Number(inputName.split(".")[1]);

  const dataToValidate = input.options.map((option, idx) =>
    idx === optionIndex ? { ...option, label: inputLabel } : option
  );

  const validationResult = editInputFormSchema.partial().safeParse({
    options: dataToValidate,
  });

  if (!validationResult.success) {
    return { validationErrors: handleServerErrors(validationResult.error) };
  }

  const options = [...input.options];

  const hasOptionOther = await checkInputHasOtherOption(formIdString, inputId);

  const isEdit =
    (!hasOptionOther && !!options[optionIndex]) ||
    (hasOptionOther && isCurrentOptionOther);

  const newOption = {
    value: isCurrentOptionOther ? OPTION_OTHER : makeId(inputId),
    label: inputLabel,
  };

  if (isEdit) {
    options[optionIndex] = {
      ...options[optionIndex],
      label: inputLabel,
    };
  } else {
    if (hasOptionOther) {
      const otherIndex = options.findIndex(
        (option) => option.value === OPTION_OTHER
      );
      options.splice(otherIndex, 0, newOption);
    } else {
      options.push(newOption);
    }
  }

  const mappedInputs = form.inputs.map((inp) =>
    inp.id === inputId ? { ...inp, options } : inp
  );

  await updateById(db, "form", formId, {
    $set: { inputs: mappedInputs },
  });

  if (inputName === OPTION_OTHER) revalidateTag(`form-${formId}`);
};
