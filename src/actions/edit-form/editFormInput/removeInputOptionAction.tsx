"use server";

import { db, findById, updateById } from "@/lib/mongo";
import { requireUser } from "@/services/queries/requireUser";
import { Form } from "@/types/form";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

const removeInputOptionAction = async (
  formIdString: string,
  inputId: string,
  optionName: string
): Promise<void> => {
  const index: number = Number(optionName.split(".")[1]);
  const formId = new ObjectId(formIdString);

  await requireUser();

  // TODO Pawel: zrob to dobrze!!!
  const form = await findById<Form>(db, "form", formId);
  if (!form) return;

  const { inputs } = form;
  const { options } = inputs.find(({ id }) => id == inputId)!;

  const filteredOptions = options.filter((_, i) => {
    return i != index;
  });

  const mappedInputs = inputs.map((input) => {
    if (input.id != inputId) return input;
    return {
      ...input,
      options: filteredOptions,
    };
  });

  await updateById(db, "form", formId, {
    $set: {
      inputs: [...mappedInputs],
    },
  });

  revalidateTag(`form-${formId}`);
};

export default removeInputOptionAction;
