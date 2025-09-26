import { Document, ObjectId } from "mongodb";
import { FormInput } from "./input";

export type FormState = "draft" | "active" | "disabled" | "template";

export interface FormTemplate extends Document {
  _id?: ObjectId
  id?: string // TODO Pawel: id + state 'template': too much?
  title?: string
  description?: string
  inputs: FormInput[] 
}

// TODO: think of better name for non-template forms
interface FormCreated extends FormTemplate {
  url?: string // or urls: string[] ? maybe one's enough
  state?: FormState
}

// TODO Pawel: divide into FormInsert etc.
export interface Form extends FormCreated {
  createdBy?: ObjectId // if template form, no author needed
  createdAt: Date
  updatedAt: Date
}

export interface FormSerialized extends FormCreated {
  _id?: string
  createdBy?: string
  createdAt: string
  updatedAt: string
}