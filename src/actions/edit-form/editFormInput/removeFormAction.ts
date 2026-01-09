"use server";

import { isUserAuthor } from "@/helpers/formHelpers";
import { db, findById } from "@/lib/mongo";
import { removeForm } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { Form } from "@/types/form";
import { IUser } from "@/types/user";
import { ObjectId, WithId } from "mongodb";
import { redirect } from "next/navigation";

export async function removeFormAction(formId: string): Promise<void> {
  try {
    const user: IUser = await requireUser();
    const form: WithId<Form> | null = await findById<Form>(
      db,
      "form",
      new ObjectId(formId)
    );

    if (!form) throw new Error("Invalid id, form not found");
    if (!isUserAuthor(form, user.id))
      throw new Error("Only author can remove a form");

    await removeForm(formId);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to remove protocol");
  }

  redirect("/forms/list");
}
