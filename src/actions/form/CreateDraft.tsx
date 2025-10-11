"use server";

import { getUserCash } from "@/dataAccessLayer/queries";
import { db, findOne } from "@/lib/mongo";
import { createDraft } from "@/services/form-service";
import { Form } from "@/types/form";
import { Document, ObjectId } from "mongodb";
import { redirect } from "next/navigation";

// TODO: move out
const isEmpty = (templateId: string) => templateId === "empty";

export async function CreateDraft(templateId: string) {
  const user = await getUserCash();
  if (!user) {
    redirect("/login");
  }

  const empty = isEmpty(templateId);

  const template: Document | null = await findOne(db, "form", {
    id: templateId,
  });

  if ((!template && !empty) || !user) {
    // TODO: add error message
    console.error("Invalid template or you got logged out");
    return;
  }

  const { title, description, inputs } = empty
    ? { title: "[ tytuł ]", description: "[ opis ]", inputs: [] }
    : (template as Form);

  const id: ObjectId = await createDraft(
    db,
    new ObjectId(user?.id),
    title || "",
    description || "",
    inputs
  );

  redirect(`/create-form/${id}/edit`);
}
