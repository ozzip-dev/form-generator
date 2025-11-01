"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { db, findOne } from "@/lib/mongo";
import { createDraft } from "@/services/form-service";
import { Form } from "@/types/form";
import { Document, ObjectId } from "mongodb";
import { redirect } from "next/navigation";

const MAX_FORMS_PER_USER = 10;

const isEmpty = (templateId: string) => templateId === "empty";

const hasReachedFormLimit = async (userId: ObjectId): Promise<boolean> => {
  const formsCount = await db.collection("form").countDocuments({
    createdBy: userId,
  });

  return formsCount >= MAX_FORMS_PER_USER;
};

const checkFormLimitError = async (userId: ObjectId): Promise<boolean> => {
  if (await hasReachedFormLimit(userId)) {
    throw new Error(
      `Osiągnięto limit, maksymalnie ${MAX_FORMS_PER_USER} formularzy.`
    );
  }
  return false;
};

export async function CreateFormDraftAction(templateId: string) {
  const user = await requireUser();

  const userId = new ObjectId(user.id);

  await checkFormLimitError(userId);

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
