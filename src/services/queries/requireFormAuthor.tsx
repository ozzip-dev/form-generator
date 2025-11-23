"use server";

import { FormSerialized } from "@/types/form";
import { db, findById } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { requireUser } from "./requireUser";

export const requireFormAuthor = async (
  form: FormSerialized | null,
  formId: string
): Promise<{ user: any; form: FormSerialized }> => {
  const user = await requireUser();

  let finalForm: FormSerialized | null = form;

  if (!finalForm) {
    finalForm = await findById<FormSerialized>(
      db,
      "form",
      new ObjectId(formId)
    );

    if (!finalForm) {
      throw new Error("Formularz nie istnieje");
    }
  }

  if (finalForm.createdBy?.toString() !== user.id) {
    throw new Error("Nie jesteś autorem tego formularza");
  }

  return { user, form: finalForm };
};
