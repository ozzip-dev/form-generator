"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { db } from "@/lib/mongo";
import { redirect } from "next/navigation";

export type FormType = {
  createdAt: string | null;
  updatedAt: string;
  description: string;
  id: string;
  inputs: any[];
  state: string;
  title: string;
  _id: string;
};

export async function GetFormsLst() {
  await requireUser();

  try {
    const forms = await db.collection("form").find({}).toArray();

    const safeForms: FormType[] = forms.map((form) => ({
      _id: form._id.toString(),
      id: form.id?.toString() ?? "",
      title: form.title ?? "",
      description: form.description ?? "",
      state: form.state ?? "",
      inputs: form.inputs ?? [],
      createdAt: form.createdAt?.toISOString?.() ?? null,
      updatedAt: form.updatedAt?.toISOString?.() ?? null,
    }));

    return safeForms;
  } catch (err: any) {
    throw new Error(err);
  }
}
