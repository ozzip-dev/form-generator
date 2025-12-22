import { FormType } from "@/enums/form";
import { db, find, findById, findOne, insert, updateById } from "@/lib/mongo";
import { Form, FormSerialized } from "@/types/form";
import { FormInput } from "@/types/input";
import { Db, ObjectId, WithId } from "mongodb";
import { cache } from "react";
import { redirect } from "next/navigation";
import { serializeForm } from "@/lib/serialize-utils";
import { requireUser } from "./user-service";
import { isUserAuthor } from "@/helpers/formHelpers";
import { isInputSubmittable } from "@/helpers/inputHelpers";

export const getForm = cache(async (formId: string): Promise<Form> => {
  await requireUser();

  const form: Form | null = await findById<Form>(
    db,
    "form",
    new ObjectId(formId)
  );

  if (!form) {
    console.error(`Form not found: ${formId}`);
    redirect("/dashboard-moderator");
  }

  return form;
});

export async function formHasInputWithId(
  db: Db,
  formId: ObjectId,
  inputId: string
): Promise<boolean> {
  const form = await findById<Form>(db, "form", formId);
  if (!form) return false;
  return form.inputs.some(({ id }) => id === inputId);
}

export async function createDraft(
  db: Db,
  userId: ObjectId,
  title?: string,
  description?: string,
  inputs: FormInput[] = []
): Promise<ObjectId> {
  const now: Date = new Date();
  const insertData: Form = {
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
    title,
    description,
    inputs,
    state: "draft",
    type: "",
  };

  const { insertedId } = await insert<Form>(db, "form", insertData);

  return insertedId;
}

export async function getFormTemplates(database: Db): Promise<Form[]> {
  const forms = await find<Form>(database, "form", { state: "template" });
  return forms;
}

export async function updateForm(
  db: Db,
  formId: ObjectId,
  updates: { title?: string; description?: string; type?: FormType }
): Promise<WithId<Form> | null> {
  return await updateById<Form>(db, "form", formId, {
    $set: {
      ...updates,
      updatedAt: new Date(),
    },
  });
}

export async function publishForm(db: Db, formId: string): Promise<void> {
  await updateById<Form>(db, "form", new ObjectId(formId), {
    $set: {
      state: "active",
      updatedAt: new Date(),
    },
  });
}

export async function getFormBySlug(
  db: Db,
  slug: string
): Promise<Form | null> {
  /* first look for form with url as slug */
  const formByUrl = await findOne<Form>(db, "form", {
    url: slug,
  });
  if (formByUrl) return formByUrl;

  /* if no form is found, query by id */
  try {
    return findById<Form>(db, "form", new ObjectId(slug));
  } catch (e) {
    return null;
  }
}

export async function setAliasUrl(
  db: Db,
  formId: string,
  url: string
): Promise<void> {
  const form = await getFormBySlug(db, url);
  const formIdObj = new ObjectId(formId);
  if (form)
    throw new Error(`Formularz o ID lub ścierzce "${url}" już istnieje.`);

  await updateById<Form>(db, "form", formIdObj, {
    $set: {
      url,
      updatedAt: new Date(),
    },
  });

  await setFormUpdatedAtDate(formIdObj);
}

export async function getSerializedFormList(): Promise<
  Partial<FormSerialized>[]
> {
  const user = await requireUser();

  try {
    const forms: Form[] = await find(
      db,
      "form",
      { createdBy: new ObjectId(user.id) },
      { updatedAt: -1 }
    );

    const serializedForms: FormSerialized[] = forms.map((form) =>
      serializeForm(form)
    );

    return serializedForms;
  } catch (err: any) {
    throw new Error("Błąd podczas pobierania formularzy:", err);
  }
}

// TODO Pawel: nazwe moze zmienic? Aale sama logika chyba ok
export const getFormByAuthor = async (
  formId: string
): Promise<FormSerialized> => {
  const user = await requireUser();
  const form = await getForm(formId);

  if (!form) {
    throw new Error("Formularz nie istnieje");
  }

  const serializedForm = serializeForm(form);

  if (!isUserAuthor(serializedForm, user._id))
    throw new Error("Nie jesteś autorem tego formularza");

  return serializedForm;
};

export async function getFormById(formId: string): Promise<Form> {
  const form = await findById<Form>(db, "form", new ObjectId(formId));
  if (!form) throw new Error("Invalid form id");
  return form;
}

export async function setFormUpdatedAtDate(
  formId: ObjectId
): Promise<WithId<Form> | null> {
  return await updateById<Form>(db, "form", formId, {
    $set: { updatedAt: new Date() },
  });
}

export async function getFormsByType(type: FormType): Promise<Form[]> {
  const forms = await find<Form>(db, "form", { type });
  return forms;
}
