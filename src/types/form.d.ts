import { Document, ObjectId } from "mongodb";
import { FormInput } from "./input";

export type FormState = "draft" | "active" | "disabled" | "template";

export interface FormTemplate extends Document {
  id?: string, // TODO Pawel: id + state 'template': too much?
  title?: string,
  description?: string,
  inputs: FormInput[] 
}

// TODO Pawel: divide into FormInsert etc.
export interface Form extends FormTemplate {
  createdBy?: ObjectId // if template form, no author needed
  createdAt: Date
  updatedBy?: ObjectId // if template form, no author needed. moderators can share form?
  updatedAt: Date
  url?: string // or urls: string[] ? maybe one's enough
  state?: FormState
}
