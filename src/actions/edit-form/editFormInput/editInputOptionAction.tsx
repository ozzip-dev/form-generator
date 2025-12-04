"use server";

import {
  handleServerErrors,
  ModelFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { db, updateById } from "@/lib/mongo";
import { editInputFormSchema } from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
import { getFormById } from "@/services/form-service";
import { checkInputHasOtherOption } from "@/services/input-service";
import { requireUser } from "@/services/user-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

const editInputOptionAction = async (
  formIdString: string,
  inputId: string,
  optionValue: string,
  inputValue: string
): Promise<void | { error: ModelFieldErrors }> => {
  await requireUser();

  const formId = new ObjectId(formIdString);
  const form = await getFormById(formId.toString());
  const { inputs } = form;
  const { options } = inputs.find(({ id }) => id == inputId)!;

  const validationResult = editInputFormSchema.partial().safeParse({ options });

  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  const editedOption = options.find(({ value }) => value == inputValue)

  let mappedOptions = options;

  if (!editedOption) {
    // TODO: opcja znika, potrzeba zrobic refresh karty
    await checkInputHasOtherOption(formIdString, inputId)
    
    mappedOptions.push({ value: inputValue, label: optionValue });
  } else {
    mappedOptions = options.map((option, i) => {
      if (option.value != inputValue) return option;
      return {
        ...option,
        label: optionValue
      };
    });
  }

  const mappedInputs = inputs.map((input) => {
    if (input.id != inputId) return input;
    return {
      ...input,
      options: mappedOptions,
    };
  });

  await updateById(db, "form", formId, {
    $set: {
      inputs: [...mappedInputs],
    },
  });

  revalidateTag(`form-${formId}`);
};

export default editInputOptionAction;
