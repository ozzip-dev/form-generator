"use server";

import { db } from "@/lib/mongo";
import { publishForm } from "@/services/form-service";
import { isUserAuthor } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { requireUser } from "@/services/user-service";

export type HeaderErrors = {
  title?: string;
  type?: string;
  resultVisibility?: string;
};

const HEADER_FIELDS: {
  key: keyof HeaderErrors;
  value: (form: FormSerialized) => boolean;
  message: string;
}[] = [
  {
    key: "title",
    value: (form) => !!form.title,
    message: "wpisz tytuł",
  },
  {
    key: "type",
    value: (form) => !!form.type,
    message: "wybierz kategorię",
  },
  {
    key: "resultVisibility",
    value: (form) => !!form.resultVisibility,
    message: "wybierz tryb wyników",
  },
];

const ADD_FIELD_ERROR = "dodaj jedno pytanie";
const INPUT_HEADER_ERROR_SG = "wpisz tytuł pytania";
const INPUT_HEADER_ERROR_PL = "wpisz tytuły pytań";

export type PublishFormActionResult =
  | {
      success: true;
      msg: string;
    }
  | {
      success: false;
      headerError: HeaderErrors | null;
      addFieldError: string | null;
      missingHeadersError: string | null;
    };

export async function publishFormAction(
  form: FormSerialized,
): Promise<PublishFormActionResult> {
  const user = await requireUser();

  if (!isUserAuthor(form, user.id)) {
    throw new Error("Jedynie autor/-ka może opublikować swój formularz");
  }

  const headerErrorObj: HeaderErrors = {};

  for (const field of HEADER_FIELDS) {
    if (!field.value(form)) {
      headerErrorObj[field.key] = field.message;
    }
  }

  const headerError =
    Object.keys(headerErrorObj).length > 0 ? headerErrorObj : null;

  const addFieldError = form.inputs?.length ? null : ADD_FIELD_ERROR;

  const missingHeaders: number =
    form.inputs.filter(({ header }) => !header).length || 0;
  const getMissingHeadersError = (): string | null => {
    if (!missingHeaders) return null;
    if (missingHeaders == 1) return INPUT_HEADER_ERROR_SG;
    return INPUT_HEADER_ERROR_PL;
  };

  if (headerError || addFieldError) {
    return {
      success: false,
      headerError,
      addFieldError,
      missingHeadersError: getMissingHeadersError(),
    };
  }

  const formId: string = form._id!;
  await publishForm(db, formId);

  return {
    success: true,
    msg: `/${form.url ?? formId}`,
  };
}
