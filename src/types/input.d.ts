import { ObjectId } from "mongodb"

export type InputType = 'text' | 'superText' /* ? */ | 'email' | 'date' | 'number' | 'checkbox' | 'singleSelect' | 'multiSelect'  

interface InputValidation {
  min?: number
  max?: number
  custom?: bool // fn returning bool? 
}

export interface Input {
  id?: string /* template inputs only */
  type: InputType
  header: string
  description?: string
  // placeholder?: string // ?
  validation?: InputValidation
  options?: string[]
  template?: boolean
}

export interface FormInput extends Input {
  required: boolean
  unique: boolean
  order: number
}