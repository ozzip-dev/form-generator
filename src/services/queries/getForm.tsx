"use server";

import { db, findById } from "@/lib/mongo";
import { Form } from "@/types/form";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { cache } from "react";
import { requireUser } from "./requireUser";

export const getForm = cache(async (formId: string): Promise<Form> => {
  await requireUser();

  let form: Form | null = null;

  form = await findById<Form>(db, "form", new ObjectId(formId));

  if (!form) {
    console.error(`Form not found: ${formId}`);
    redirect("/dashboard-moderator");
  }

  return form;
});
