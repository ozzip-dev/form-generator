import { ObjectId } from "mongodb"
import { FormInput } from "./input"

export type FormState = 'draft' | 'active' | 'disabled'

export interface Form {
  title: string
  description?: string
  createdBy: ObjectId
  createdAt: Date
  updatedBy: ObjectId // moderators can share form?
  updatedAt: Date
  inputs: FormInput[]
  url: string // or urls: string[] ? maybe one's enough
  state: FormState
}