import { find, findById, insert, update } from "@/lib/mongo";
import { Form } from "@/types/form";
import { FormInput, Input } from "@/types/input";
import { Db, ObjectId } from "mongodb";

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
    updatedBy: userId,
    updatedAt: now,
    title,
    description,
    inputs,
    state: 'draft'
  }

  const { insertedId } = await insert(db, 'form', insertData)

  return insertedId
}

function getNextOrder(form: Form): number {
  const orderValues: number[] = form.inputs.map(({order}) => order)
  const maxOrder = Math.max(...orderValues)
  return maxOrder + 1
}

function mapInputDocToFormInputData(input: Input, order: number): FormInput {
  const {
    type, header, description, validation, options
  } = input
  return {
    /* id: create from input's id + some number if ids are duplicated? */
    type,
    header,
    description,
    validation,
    options,
    required: false,
    unique: false,
    order
  }
}

export async function addInputToDraft(
  db: Db,
  formId: ObjectId,
  input: Input
): Promise<void> {
  const draft = await findById(db, 'form', formId)
  if (!draft) return
  const order = getNextOrder(draft as Form)
  const inputData = mapInputDocToFormInputData(input, order)
  
  await update(db, 'form', { _id: formId }, {
    $push: {
      inputs: {
        ...inputData
      }
    }
  })
}

export async function getFormTemplates(database: Db): Promise<Form[]> {
  const forms =  await find(database, 'form', { state: 'template' })
  return forms as Form[]
}