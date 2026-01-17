import { Document, ObjectId } from "mongodb";
import { FormInput } from "./input";
import { FormResultVisibility, FormType } from "@/enums/form";

export type FormState =
  | "draft"
  | "active"
  | "disabled"
  | "removed"
  | "template";

export interface FormTemplate extends Document {
  _id?: ObjectId;
  id?: string; // TODO Pawel: id + state 'template': too much?
  type: FormType | "";
  resultVisibility: FormResultVisibility | "";
  title?: string;
  headerFileId?: string;
  description?: string;
  inputs: FormInput[];
  displayAuthorEmail?: boolean;
}

interface FormCreated extends FormTemplate {
  url?: string;
  state?: FormState;
}

export interface Form extends FormCreated {
  createdBy?: ObjectId; /* if template form, no author needed */
  createdAt: Date;
  updatedAt: Date;
}

export interface FormSerialized extends FormCreated {
  _id?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}
