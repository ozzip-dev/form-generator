"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";

// TODO Krzysztof: typ juz jest zdefiniowany.
// Jeśli różni się od tego co jest w typach to trzeba się przyjrzeć temu,
// ew. dodać nowy typ w pliku .d.ts ale bazujący na innych typach Form
// sama funkcja tzn pobranie forms powinna być zdefiniowana w service a tutaj tylko wywołana

export type FormType = {
  createdAt: string | null;
  updatedAt: string | null;
  description: string;
  id: string;
  inputs: any[];
  state: string;
  title: string;
  _id: string;
};

export async function GetFormsLst() {
  const user = await requireUser();

  try {
    const forms = await db
      .collection("form")
      .find({ createdBy: new ObjectId(user.id) })
      .sort({ updatedAt: -1 })
      .toArray();
    const safeForms: FormType[] = forms.map((form) => ({
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
