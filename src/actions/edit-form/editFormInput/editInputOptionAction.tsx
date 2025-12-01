"use server";

import {
  handleServerErrors,
  ModelFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { db, updateById } from "@/lib/mongo";
import { makeId } from "@/lib/utils";
import { editInputFormSchema } from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
import { getFormById } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

const editInputOptionAction = async (
  formIdString: string,
  inputId: string,
  optionValue: string,
  name: string
): Promise<void | { error: ModelFieldErrors }> => {
  await requireUser();

  const index: number = Number(name.split(".")[1]);
  const formId = new ObjectId(formIdString);

  const form = await getFormById(formId.toString());
  const { inputs } = form;
  const { options } = inputs.find(({ id }) => id == inputId)!;

  const validationResult = editInputFormSchema.partial().safeParse({ options });

  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  let mappedOptions = options;

  if (!options[index]) {
    mappedOptions.push({ value: makeId(inputId), label: optionValue });
  } else {
    mappedOptions = options.map((option, i) => {
      if (i != index) return option;
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
