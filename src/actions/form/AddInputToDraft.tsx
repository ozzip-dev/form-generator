"use server";

import { findById, update } from "@/lib/mongo";
import { Form } from "@/types/form";
import { FormInput, Input } from "@/types/input";
import { Db, ObjectId } from "mongodb";

/* If form is empty, add index 0. If form has inputs add last one + 1 */
function getNextOrder(form: Form): number {
  const orderValues: number[] = form.inputs.map(({ order }) => order);
  if (!orderValues.length) return 0;
  const maxOrder = Math.max(...orderValues);
  return maxOrder + 1;
}

function mapInputDocToFormInputData(input: Input, order: number): FormInput {
  const { type, header, description, validation, options } = input;
  return {
    /* id: create from input's id + some number if ids are duplicated? */
    type,
    header,
    description,
    validation,
    options,
    required: false,
    unique: false,
    order,
  };
}

export async function AddInputToDraft(
  db: Db,
  formId: ObjectId,
  input: Input
): Promise<void> {
  const draft = await findById(db, "form", formId);
  if (!draft) return;
  const order = getNextOrder(draft as Form);
  const inputData = mapInputDocToFormInputData(input, order);

  await update(
    db,
    "form",
    { _id: formId },
    {
      $push: {
        inputs: {
          ...inputData,
        },
      },
      $set: {
        updatedAt: new Date(),
      },
    }
  );
}
