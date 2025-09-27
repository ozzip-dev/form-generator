"use server";

import { redirect } from "next/navigation";
import { Form } from "@/types/form";
import { createDraft } from "@/services/form-service";
import { db, findOne } from "@/lib/mongo";
import { auth } from "@/lib/auth";
import { Document, ObjectId } from "mongodb";
import { headers } from "next/headers";

// TODO: move out
const isEmpty = (templateId: string) => templateId === 'empty'

export async function CreateDraft(templateId: string) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const empty = isEmpty(templateId)

  const template: Document | null = await findOne(db, "form", {
    id: templateId,
  });

  if ((!template && !empty) || !session?.user) {
    // TODO: add error message
    console.error("Invalid template or you got logged out");
    return;
  }

  const { title, description, inputs } = empty 
    ? { title: '[ tytuł ]', description: '[ opis ]', inputs: []}
    : template as Form;

  const id: ObjectId = await createDraft(
    db,
    new ObjectId(session.user.id),
    title || "",
    description || "",
    inputs
  );

  redirect(`/create-form/${id}`);
}
