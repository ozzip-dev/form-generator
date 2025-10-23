import { FormType } from "@/enums/form";
import { find, findById, insert, update, updateById } from "@/lib/mongo";
import { Form } from "@/types/form";
import { FormInput } from "@/types/input";
import { Db, ObjectId, WithId } from "mongodb";

export async function formHasInputWithId(
  db: Db,
  formId: ObjectId,
  inputId: string
): Promise<boolean> {
  const form = (await findById(db, "form", formId)) as Form | null;
  if (!form) return false;
  return form.inputs.some(({ id }) => id === inputId);
}

export async function createDraft(
  db: Db,
  userId: ObjectId,
  title: string,
  description: string,
  inputs: FormInput[]
): Promise<ObjectId> {
  const now: Date = new Date()
  const insertData: Form = {
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    title,
    description,
    inputs,
    state: 'draft',
    type: FormType.Other
  }

  const { insertedId } = await insert(db, 'form', insertData)

  return insertedId
}

export async function getFormTemplates(database: Db): Promise<Form[]> {
  const forms =  await find(database, 'form', { state: 'template' })
  return forms as Form[]
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

function getFormInputById(
  inputs: FormInput[],
  id: string
): FormInput | undefined {
  return inputs.find((el: FormInput) => el.id == id!)
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

export async function updateForm(
  db: Db,
  formId: ObjectId,
  updates: { title?: string; description?: string; type?: FormType }
): Promise<WithId<Form>> {
  return (await updateById(
    db,
    'form',
    formId,
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    }
  )) as WithId<Form>
}