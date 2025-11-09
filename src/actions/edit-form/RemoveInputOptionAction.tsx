"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { db, findById, updateById } from "@/lib/mongo";
import { Form } from "@/types/form";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

const RemoveInputOptionAction = async (
  formIdString: string,
  inputId: string,
  optionName: string,
) => {
  const index: number = Number(optionName.split('.')[1])
  const formId = new ObjectId(formIdString)
  
  await requireUser();

  // TODO Pawel: zrob to dobrze!!!
  const form = await findById(db, 'form', formId)
  if (!form) return

  const { inputs } = form as Form
  const { options } = inputs.find(({ id }) => id == inputId)!

  const filteredOptions = options.filter((option, i) => {
    return i != index
  })

  const mappedInputs = inputs.map((input) => {
    if (input.id != inputId) return input
    return {
      ...input,
      options: filteredOptions
    }
  })

  await updateById(db, 'form', formId, {
    $set: {
      inputs: [
        ...mappedInputs
      ]
    }
  })

  revalidateTag(`form-${formId}`);
};

export default RemoveInputOptionAction;
