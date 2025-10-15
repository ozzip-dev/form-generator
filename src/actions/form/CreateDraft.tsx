"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { db, findOne } from "@/lib/mongo";
import { createDraft } from "@/services/form-service";
import { Form } from "@/types/form";
import { Document, ObjectId } from "mongodb";
import { redirect } from "next/navigation";

const isEmpty = (templateId: string) => templateId === "empty";

export async function CreateDraft(templateId: string) {
  const user = await requireUser();

  const userId = new ObjectId(user.id);

  const formsCount = await db.collection("form").countDocuments({
    createdBy: userId,
  });

  if (formsCount >= 10) {
    throw new Error("Osiągnięto limit, maksymalnie 10 formularzy.");
  }

  const empty = isEmpty(templateId);

  const template: Document | null = await findOne(db, "form", {
    id: templateId,
  });

  if (!template && !empty) {
    throw new Error("Nie znaleziono szablonu lub brak dostępu.");
  }

  const { title, description, inputs } = empty
    ? { title: "[ tytuł ]", description: "[ opis ]", inputs: [] }
    : (template as Form);

  const id: ObjectId = await createDraft(
    db,
    userId,
    title || "",
    description || "",
    inputs
  );

  redirect(`/create-form/${id}/edit`);
}
