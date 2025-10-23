import { Form, FormSerialized } from "@/types/form";

export function serializeForm(form: Form): FormSerialized {
  const {
    _id, createdAt, createdBy, updatedAt, url, state, id, title, description, inputs, type
  } = form
  return {
    _id: _id?.toString(),
    id,
    type,
    title,
    description,
    createdBy: createdBy?.toString(),
    createdAt: createdAt?.toISOString(),
    updatedAt: updatedAt?.toISOString(),
    url,
    state,
    inputs
  };
}