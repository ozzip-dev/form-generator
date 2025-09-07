import { ObjectId } from "mongodb"
import { FormInput } from "./input"

export interface Form {
  title: string
  description?: string
  createdBy: ObjectId
  createdAt: Date
  updatedBy: ObjectId // moderators can share form?
  updatedAt: Date
  inputs: FormInput[]
}