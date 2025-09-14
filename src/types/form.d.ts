import { Document, ObjectId } from "mongodb";
import { FormInput } from "./input";

export type FormState = "draft" | "active" | "disabled" | "template";

export interface FormTemplate extends Document {
  _id?: ObjectId,
  id?: string, // TODO Pawel: id + state 'template': too much?
  title?: string,
  description?: string,
  inputs: FormInput[] 
}

// TODO Pawel: divide into FormInsert etc.
export interface Form extends FormTemplate {
  createdBy?: ObjectId // if template form, no author needed
  createdAt: Date
  updatedAt: Date
  url?: string // or urls: string[] ? maybe one's enough
  state?: FormState
}

export interface FormSerialized {
  _id?: string
  id?: string
  title?: string
  description?: string
  inputs: FormInput[] 
  createdBy?: string
  createdAt: string
  updatedAt: string
  url?: string
  state?: FormState
}