"use server";

import { serializeForm } from "@/lib/form-utils";
import { db, findById, updateById } from "@/lib/mongo";
import { Form, FormSerialized } from "@/types/form";
import { FormInput, Input } from "@/types/input";
import { Document, ObjectId, UpdateResult, WithId } from "mongodb";
import { revalidateTag } from "next/cache";

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
    /* id: create from input's id + some number if ids are duplicated? or simply uuid? */
    id: Math.random().toString(),
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
  formId: string,
  input: Input
): Promise<FormSerialized | { error: string }> {
  try {
    throw new Error("ooooo");
    const draft = await findById(db, "form", new ObjectId(formId));
    if (!draft) {
      return { error: "Nie znaleziono formularza" };
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
      return { error: "Nie udało się zaktualizować formularza" };
    }
    revalidateTag(`form-${formId}`);

    return serializeForm(result as Form);
  } catch (err: any) {
    console.error("Błąd AddInputToDraft:", err);
    throw new Error(`Błąd: ${err}`);
  }
}
