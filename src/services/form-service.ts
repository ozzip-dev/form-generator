import { FormType } from "@/enums/form";
import {
  db,
  deleteById,
  find,
  findById,
  findOne,
  insert,
  update,
  updateById,
} from "@/lib/mongo";
import { Form, FormSerialized } from "@/types/form";
import { FormInput } from "@/types/input";
import { Db, ObjectId, WithId } from "mongodb";
import { cache } from "react";
import { redirect } from "next/navigation";
import { serializeFile, serializeForm } from "@/lib/serialize-utils";
import { getUserById, requireUser } from "./user-service";
import { isUserAuthor } from "@/helpers/formHelpers";
import { getFileById, removeFile } from "./file-service";
import { File } from "@/types/file";


export const getForm = cache(async (formId: string): Promise<FormSerialized> => {
  await requireUser();

  const form: Form | null = await findById<Form>(
    db,
    "form",
    new ObjectId(formId),
  );

  if (!form) {
    console.error(`Form not found: ${formId}`);
    redirect("/dashboard-moderator");
  }

  return serializeForm(form);
});

export async function formHasInputWithId(
  db: Db,
  formId: ObjectId,
  inputId: string,
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
  inputs: FormInput[] = [],
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
    resultVisibility: "",
    displayAuthorEmail: false,
  };

  const { insertedId } = await insert<Form>(db, "form", insertData);

  return insertedId;
}

export async function getFormTemplates(): Promise<Form[]> {
  const forms = await find<Form>(db, "form", { state: "template" });
  return forms;
}

export async function updateForm(
  db: Db,
  formId: ObjectId,
  updates: { title?: string; description?: string; type?: FormType },
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
  slug: string,
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
  url: string,
): Promise<void> {
  const form = await getFormBySlug(db, url);
  const formIdObj = new ObjectId(formId);
  if (form)
    throw new Error(`Formularz o ID lub ścieżce "${url}" już istnieje.`);

  await updateById<Form>(db, "form", formIdObj, {
    $set: {
      url,
      updatedAt: new Date(),
    },
  });
}

export async function removeAliasUrl(db: Db, formId: string): Promise<void> {
  const form = await getFormById(formId);
  const formIdObj = new ObjectId(formId);

  if (!form) throw new Error(`Błąd ładowania formularza`);

  await updateById<Form>(db, "form", formIdObj, {
    $unset: {
      url: 1,
    },
  });
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
      { updatedAt: -1 },
    );

    const serializedForms: FormSerialized[] = forms.map((form) =>
      serializeForm(form),
    );

    return serializedForms;
  } catch (err: any) {
    throw new Error("Błąd podczas pobierania formularzy:", err);
  }
}

// TODO Pawel: nazwe moze zmienic? Aale sama logika chyba ok
export const getFormByAuthor = async (
  formId: string,
): Promise<FormSerialized> => {
  const user = await requireUser();
  const form = await getForm(formId);

  if (!form) {
    throw new Error("Formularz nie istnieje");
  }

  const serializedForm = form;

  if (!isUserAuthor(serializedForm, user._id))
    throw new Error("Nie jesteś autorem tego formularza");

  return serializedForm;
};

export async function getFormById(formId: string): Promise<Form> {
  const form = await findById<Form>(db, "form", new ObjectId(formId));
  if (!form) throw new Error("Invalid form id");
  return form;
}

export async function getFormsByType(type: FormType): Promise<Form[]> {
  const forms = await find<Form>(db, "form", { type });
  return forms;
}

export async function removeForm(formId: string): Promise<void> {
  await deleteById(db, "form", new ObjectId(formId));
}

export async function addFieldToForm(
  formId: string,
  inputData: FormInput,
): Promise<Form> {
  const result: WithId<Form> | null = await updateById<Form>(
    db,
    "form",
    new ObjectId(formId),
    {
      $push: {
        inputs: {
          ...inputData,
        },
      },
      $set: {
        updatedAt: new Date(),
      },
    },
  );

  if (!result) {
    throw new Error("Nie udało się dodać pola formularza");
  }

  return result;
}

export async function addFormHeaderFile(
  formId: string,
  fileId: string,
): Promise<void> {
  const form = await getFormById(formId);
  const oldHeaderFileId = form.headerFileId;

  try {
    await updateById(db, "form", new ObjectId(formId), {
      $set: {
        headerFileId: fileId,
        lastModifiedAt: new Date(),
      },
    });

    if (!oldHeaderFileId) return;

    await removeFile(oldHeaderFileId);
  } catch (e) {
    /* Reset to old file if sth gfoes wrong (?) */
    await updateById(db, "form", new ObjectId(formId), {
      $set: {
        headerFileId: fileId,
      },
    });
  }
}

export async function removeFormHeaderFile(formId: string): Promise<void> {
  const form = await getFormById(formId);
  const fileId = form.headerFileId;

  if (!fileId) {
    throw new Error("Formularz nie ma obrazka nagłówku");
  }

  try {
    await updateById(db, "form", new ObjectId(formId), {
      $unset: {
        headerFileId: 1,
      },
      $set: {
        lastModifiedAt: new Date(),
      },
    });

    await removeFile(fileId);
  } catch (e) {
    /* Reset to old file if sth gfoes wrong (?) */
    await updateById(db, "form", new ObjectId(formId), {
      $set: {
        headerFileId: fileId,
      },
    });
  }
}

export async function toggleDisplayAuthorEmail(
  formId: ObjectId,
): Promise<void> {
  const form = (await findById(db, "form", formId)) as Form;

  await update<Form>(
    db,
    "form",
    {
      _id: form._id,
    },
    {
      $set: {
        displayAuthorEmail: !form.displayAuthorEmail,
        updatedAt: new Date(),
      },
    },
  );
}

/* returns header image data and author email */
export async function getFormAdditionalData(formId: string): Promise<{
  headerFileData?: string;
  authorEmail: string;
}> {
  const form = await getFormById(formId);
  const file: File | null = form.headerFileId
    ? await getFileById(form.headerFileId)
    : null;

  const authorId = form.createdBy?.toString();
  const formAuthor = await getUserById(authorId as string);

  return {
    headerFileData: file ? serializeFile(file)?.data : undefined,
    authorEmail: formAuthor.email,
  };
}
