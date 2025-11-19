"use server";

import { db } from "@/lib/mongo";
import { FormSerialized } from "@/types/form";
import { ObjectId } from "mongodb";
import { requireUser } from "./requireUser";

export async function getFormsLst() {
  const user = await requireUser();

  try {
    const forms = await db
      .collection("form")
      .find({ createdBy: new ObjectId(user.id) })
      .sort({ updatedAt: -1 })
      .toArray();
    const safeForms: Partial<FormSerialized>[] = forms.map((form) => ({
      _id: form._id.toString(),
      id: form.id?.toString?.() ?? "",
      title: form.title ?? "",
      description: form.description ?? "",
      state: form.state ?? "",
      inputs: form.inputs ?? [],
      createdAt:
        form.createdAt instanceof Date
          ? form.createdAt.toISOString()
          : form.createdAt ?? null,
      updatedAt:
        form.updatedAt instanceof Date
          ? form.updatedAt.toISOString()
          : form.updatedAt ?? null,
    }));

    return safeForms;
  } catch (err: any) {
    throw new Error("Błąd podczas pobierania formularzy:", err);
  }
}
