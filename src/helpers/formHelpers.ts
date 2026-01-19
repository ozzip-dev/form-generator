import { FormResultVisibility, FormType } from "@/enums/form";
import { Form, FormCreated, FormSerialized } from "@/types/form";
import { FormInput } from "@/types/input";

export function isDraft(form: Form | FormCreated | FormSerialized): boolean {
  return form.state === "draft";
}

export function isActive(form: Form | FormCreated | FormSerialized): boolean {
  return form.state === "active";
}

export function isUserAuthor(
  form: Form | FormSerialized,
  userId: string,
): boolean {
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
  { label: "Jawny", value: FormResultVisibility.Open },
  {
    label: "Tajny",
    value: FormResultVisibility.Secret,
  },
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

export const getSortedInputs = (form: Form | FormSerialized): FormInput[] =>
  form.inputs.sort((a, b) => a.order - b.order);
