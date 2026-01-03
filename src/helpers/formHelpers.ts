import { FormResultVisibility, FormType } from "@/enums/form";
import { Form, FormCreated, FormSerialized } from "@/types/form";

export function isDraft(form: Form | FormCreated | FormSerialized): boolean {
  return form.state === "draft";
}

export function isActive(form: Form | FormCreated | FormSerialized): boolean {
  return form.state === "active";
}

export function isUserAuthor(form: FormSerialized, userId: string): boolean {
  return form.createdBy?.toString() === userId;
}

export function isFormSecret(form: FormSerialized | Form): boolean {
  return form.resultVisibility === FormResultVisibility.Secret;
}

export const formTypesWithLabels: { label: string; value: FormType }[] = [
  { label: "Ankieta pracownicza", value: FormType.Survey },
  { label: "Wybory SIP", value: FormType.Inspector },
  { label: "Referendum strajkowe", value: FormType.Strike },
  { label: "Inne", value: FormType.Other },
];

export const formVisibilityData: {
  label: string;
  value: FormResultVisibility;
}[] = [
  { label: "Jawne", value: FormResultVisibility.Open },
  { label: "Tajne", value: FormResultVisibility.Secret },
];

export const formStateWithLabels: Record<string, string> = {
  draft: "Szkic",
  active: "Aktywny",
  disabled: "Nieaktywny",
  removed: "Usunięty",
  template: "Szablon",
};

export const getTypeLabel = (type: FormType): string =>
  formTypesWithLabels.find(({ value }) => value == type)?.label ||
  (type as string);
