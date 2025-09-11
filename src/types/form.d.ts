import { ObjectId } from "mongodb";
import { FormInput } from "./input";

export type FormState = "draft" | "active" | "disabled" | "template";

// TODO Pawel: divide into FormInsert etc.
export interface Form {
  id?: string; // TODO Pawel: id + state 'template': too much?
  title?: string;
  description?: string;
  createdBy?: ObjectId; // if template form, no author needed
  createdAt: Date;
  updatedBy?: ObjectId; // if template form, no author needed. moderators can share form?
  updatedAt: Date;
  inputs: FormInput[];
  url?: string; // or urls: string[] ? maybe one's enough
  state?: FormState;
}
