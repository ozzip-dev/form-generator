"use server";

import { db, findOne } from "@/lib/mongo";
import { createDraft } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { Form } from "@/types/form";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

const maxFormCount = Number(process.env.NEXT_PUBLIC_MAX_FORMS_PER_USER) || 10;

const isEmpty = (templateId: string) => templateId === "empty";

const hasReachedFormLimit = async (userId: ObjectId): Promise<boolean> => {
  const formsCount = await db.collection("form").countDocuments({
    createdBy: userId,
  });

  return formsCount >= maxFormCount;
};

const checkFormLimitError = async (
  userId: ObjectId
): Promise<string | null> => {
  if (await hasReachedFormLimit(userId)) {
    return `Maksymalnie ${maxFormCount}`;
  }
  return null;
};

export async function createFormDraftAction(
  templateId: string
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

  const { title, description, inputs } = empty
    ? { title: "", description: "", inputs: [] }
    : (template as Form);

  const id: ObjectId = await createDraft(
    db,
    userId,
    title,
    description,
    inputs
  );

  redirect(`/forms/${id}/edit`);
}
