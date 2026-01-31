"use server";

import { db } from "@/lib/mongo";
import { publishForm } from "@/services/form-service";
import { isUserAuthor } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { requireUser } from "@/services/user-service";
import { FormPublishError } from "@/components/shared/errors/FormPublishError";

const getFormEmptyRequiredData = (form: FormSerialized): string[] => {
  const { title, type, inputs, resultVisibility } = form;
  const errorFields: { value: boolean; name: string }[] = [
    {
      value: !!title,
      name: "Tytuł formularza",
    },
    {
      value: !!type,
      name: "Kategoria formularza",
    },
    {
      value: !!inputs?.length,
      name: "Brak pytań w formularzu",
    },
    {
      value: !!resultVisibility,
      name: "Tryb wyników",
    },
  ];

  return errorFields.filter(({ value }) => !value).map(({ name }) => name);
};

export async function publishFormAction(
  form: FormSerialized,
): Promise<{ success: boolean; msg: string }> {
  const user = await requireUser();

  if (!isUserAuthor(form, user.id))
    throw new Error("Jedynie autor/-ka może opublikować swój formularz");

  const missingData = getFormEmptyRequiredData(form);
  if (missingData.length)
    return {
      success: false,
      msg: `${missingData.join(", ")}`,
    };

  const formId: string = form._id!;

  await publishForm(db, formId);

  return {
    success: true,
    msg: `/${form.url ?? formId}`,
  };
}
