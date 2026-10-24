"use server";

import { maxFormCount } from "@/helpers/formHelpers";
import { db, findOne } from "@/lib/mongo";
import { checkFormLimitError, createDraft } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { Form } from "@/types/form";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

const isEmpty = (templateId: string) => templateId === "empty";

export async function createFormDraftAction(
  templateId: string,
): Promise<null | { error: string }> {
  const user = await requireUser();

  const userId = new ObjectId(user.id);

  const limitError = await checkFormLimitError(userId);
  if (limitError) {
    return { error: limitError };
  }

  const empty = isEmpty(templateId);

  const template = await findOne<Form>(db, "form", {
    id: templateId,
  });

  if (!template && !empty) {
    throw new Error("Nie znaleziono szablonu lub brak dostępu.");
  }

  const {
    title,
    description,
    inputs,
    type,
    resultVisibility,
    headerFileId,
    displayAuthorEmail,
  } = empty ? { title: "", description: "", inputs: [] } : (template as Form);

  const id: ObjectId = await createDraft(
    db,
    userId,
    inputs,
    title,
    description,
    type,
    resultVisibility,
    headerFileId,
    displayAuthorEmail,
  );

  redirect(`/forms/${id}/edit`);
}
