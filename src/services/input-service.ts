import { InputType } from "@/enums";
import { find, findById, update, updateById } from "@/lib/mongo";
import { Form } from "@/types/form";
import { FormInput, Input } from "@/types/input";
import { Db, ObjectId, WithId } from "mongodb";

function getFormInputById(
  inputs: FormInput[],
  id: string
): FormInput {
  const input = inputs.find((el: FormInput) => el.id == id!)

  if (!input) throw new Error(`Input not found: ${id}`);

  return input
}

export async function getTemplateInputs(database: Db): Promise<Input[]> {
  const templateInputs = await find(database, 'input', { template: true })
  return templateInputs as Input[]
}

async function decreaseRemainingInputsOrder(
  db: Db,
  formId: ObjectId,
  inputId: string
) {
  const form =  await findById(db, 'form', formId) as Form
  const { inputs } = form
  const startingOrder: number | undefined = getFormInputById(form.inputs, inputId!)?.order
  /* if order is undefined/null or is last element. We have no inputs to update */
  if (startingOrder == undefined || startingOrder >= inputs.length - 1) return
  const remainingOrders = inputs
    .sort((a, b) => a.order - b.order)
    .map(({ order }) => order)
    .filter((order) => order > startingOrder)

  for (const order of remainingOrders) {
    await update(
      db,
      'form',
      {
        _id: form._id,
        "inputs.order": order
      },
      {
        $inc: {
          "inputs.$.order": -1
        }
      }
    )
  }
}

export async function removeInputFromDraft(
  db: Db,
  formId: ObjectId,
  inputId: string
): Promise<WithId<Form>> {

  /* all inputs higher than removed one get their order decreased by 1 */
  await decreaseRemainingInputsOrder(
    db,
    formId,
    inputId
  )

  return (await updateById(
    db,
    'form',
    formId,
    {
      $pull: {
        inputs: { id: inputId }
      },
      $set: {
        updatedAt: new Date(),
      },
    }
  )) as WithId<Form>
}



export async function moveInputUp(
  db: Db,
  formId: ObjectId,
  inputId: string
): Promise<WithId<Form> | undefined> {
  const form =  await findById(db, 'form', formId) as Form
  const { inputs } = form
  const updatedOrder: number | undefined = getFormInputById(inputs, inputId!)?.order
  /* if order is undefined/null or 0. We can't move up input with index 0 */
  if (!updatedOrder) return

  const previousOrder = updatedOrder - 1

  await update(
    db,
    'form',
    {
      _id: form._id,
      "inputs.order": previousOrder
    },
    {
      $inc: {
        "inputs.$.order": 1
      }
    }
  )

  await update(
    db,
    'form',
    {
      _id: form._id,
      "inputs.id": inputId
    },
    {
      $inc: {
        "inputs.$.order": -1
      },
      $set: {
        updatedAt: new Date(),
      },
    }
  )

  const updatedForm =  await findById(db, 'form', formId) as Form
  return updatedForm as WithId<Form>
}


export async function moveInputDown(
  db: Db,
  formId: ObjectId,
  inputId: string
): Promise<WithId<Form> | undefined> {
  const form =  await findById(db, 'form', formId) as Form
  const { inputs } = form
  const updatedOrder: number | undefined = getFormInputById(inputs, inputId!)?.order
  /* if order is undefined/null or is last element. We can't move down last input */
  if (updatedOrder == undefined || updatedOrder >= inputs.length - 1) return

  const nextOrder = updatedOrder + 1

  await update(
    db,
    'form',
    {
      _id: form._id,
      "inputs.order": nextOrder
    },
    {
      $inc: {
        "inputs.$.order": -1
      }
    }
  )

  await update(
    db,
    'form',
    {
      _id: form._id,
      "inputs.id": inputId
    },
    {
      $inc: {
        "inputs.$.order": 1
      },
      $set: {
        updatedAt: new Date(),
      },
    }
  )

  const updatedForm =  await findById(db, 'form', formId) as Form
  return updatedForm as WithId<Form>
}

export async function toggleRequired(db: Db, formId: ObjectId, inputId: string): Promise<void> {
  const form =  await findById(db, 'form', formId) as Form
  const input: FormInput = getFormInputById(form.inputs, inputId)

  await update(
    db,
    'form',
    {
      _id: form._id,
      "inputs.id": inputId
    },
    {
      $set: {
        "inputs.$.required": !input.required,
        updatedAt: new Date(),
      },
    }
  )
}

export async function updateFormInputTexts(
  db: Db,
  formId: ObjectId,
  inputId: string,
  data: { header?: string; description?: string }
): Promise<void> {
  const form =  await findById(db, 'form', formId) as Form
  const { header, description } = data

  const updateData: any = {}
  if (header !== undefined) updateData["inputs.$.header"] = header
  if (description !== undefined) updateData["inputs.$.description"] = description

  await update(
    db,
    'form',
    {
      _id: form._id,
      "inputs.id": inputId
    },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    }
  )
}

export async function updateFormInputType(
  db: Db,
  formId: ObjectId,
  inputId: string,
  type?: InputType
): Promise<void> {
  const form =  await findById(db, 'form', formId) as Form

  await update(
    db,
    'form',
    {
      _id: form._id,
      "inputs.id": inputId
    },
    {
      $set: {
        "inputs.$.type": type,
        updatedAt: new Date(),
      },
    }
  )
}