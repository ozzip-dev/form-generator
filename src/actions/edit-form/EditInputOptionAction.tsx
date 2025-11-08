"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { db, findById, updateById } from "@/lib/mongo";
import { Form, FormSerialized } from "@/types/form";
import { ObjectId } from "mongodb";

const EditInputOptionAction = async (
  formIdString: string,
  inputId: string,
  optionValue: string,
  name: string
) => {
  const index: number = Number(name.split('.')[1])
  const formId = new ObjectId(formIdString)
  
  await requireUser();

  // TODO Pawel: zrob to dobrze!!!
  const form = await findById(db, 'form', formId)
  if (!form) return

  const { inputs } = form as Form
  const { options } = inputs.find(({ id }) => id == inputId)!

  let mappedOptions = options

  if (!options[index]) {
    mappedOptions.push(optionValue)
  } else {
    mappedOptions = options.map((option, i) => {
      if (i != index) return option
      return optionValue
    })
  }

  const mappedInputs = inputs.map((input) => {
    if (input.id != inputId) return input
    return {
      ...input,
      options: mappedOptions
    }
  })

  await updateById(db, 'form', formId, {
    $set: {
      inputs: [
        ...mappedInputs
      ]
    }
  })
};

export default EditInputOptionAction;
