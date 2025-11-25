"use server";

import {
  handleServerErrors,
  MoledFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { runAsyncAction } from "@/helpers/runAsyncFunction";
import { db, findById, updateById } from "@/lib/mongo";
import { addFormFieldSchema } from "@/lib/zodSchema/editFormSchemas/addFormFieldSchema";
import { requireUser } from "@/services/queries/requireUser";
import { Form } from "@/types/form";
import { FormInput, Input } from "@/types/input";
import { Document, ObjectId, WithId } from "mongodb";
import { revalidateTag } from "next/cache";

function makeId(header: string): string {
  return `${header.trim().toLowerCase()}-${Math.round(
    Math.random() * 100000
  ).toString()}`;
}

/* If form is empty, add index 0. If form has inputs add last one + 1 */
function getNextOrder(form: Form): number {
  const orderValues: number[] = form.inputs.map(({ order }) => order);
  if (!orderValues.length) return 0;
  const maxOrder = Math.max(...orderValues);
  return maxOrder + 1;
}

function mapInputDocToFormInputData(input: Input, order: number): FormInput {
  const { type, header, description, validation, options = [] } = input;
  return {
    /* id: create from input's id + some number if ids are duplicated? or simply uuid? */
    id: makeId(header),
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

export async function addFormFieldAction(
  formId: string,
  input: Input
): Promise<void | { error: MoledFieldErrors }> {
  await requireUser();

  const { header, type } = input;
  const validationResult = addFormFieldSchema.safeParse({ header, type });

  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  const addNewField = async () => {
    const draft = await findById<Form>(db, "form", new ObjectId(formId));
    if (!draft) {
      throw new Error("Nie znaleziono formularza");
    }

    const order = getNextOrder(draft as Form);
    const inputData = mapInputDocToFormInputData(input, order);

    const result: WithId<Document> | null = await updateById(
      db,
      "form",
      new ObjectId(formId),
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

    if (!result) {
      throw new Error("Nie udało się dodać pola formularza");
    }
    revalidateTag(`form-${formId}`);
  };

  await runAsyncAction(addNewField);
}
