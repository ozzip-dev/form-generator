"use server";

import {
  handleServerErrors,
  MoledFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { db, findById, updateById } from "@/lib/mongo";
import { editInputFormSchema } from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
import { requireUser } from "@/services/queries/requireUser";
import { Form } from "@/types/form";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

const editInputOptionAction = async (
  formIdString: string,
  inputId: string,
  optionValue: string,
  name: string
): Promise<void | { error: MoledFieldErrors }> => {
  await requireUser();
  throw new Error("Invalid datr");

  const index: number = Number(name.split(".")[1]);
  const formId = new ObjectId(formIdString);

  const form = await findById<Form>(db, "form", formId);
  if (!form) return;

  const { inputs } = form;
  const { options } = inputs.find(({ id }) => id == inputId)!;

  const validationResult = editInputFormSchema.partial().safeParse({
    options: options.map((opt, idx) =>
      idx === index ? { value: optionValue } : { value: opt }
    ),
  });

  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  let mappedOptions = options;

  if (!options[index]) {
    mappedOptions.push(optionValue);
  } else {
    mappedOptions = options.map((option, i) => {
      if (i != index) return option;
      return optionValue;
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
