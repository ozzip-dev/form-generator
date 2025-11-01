import { Form, FormCreated, FormSerialized } from "@/types/form";

export function isDraft(form: Form | FormCreated | FormSerialized): boolean {
  return form.state === "draft"
}

export function isActive(form: Form | FormCreated | FormSerialized): boolean {
  return form.state === "active"
}

export function isUserAuthor(form: FormSerialized, userId: string): boolean {
  return form.createdBy?.toString() === userId
}