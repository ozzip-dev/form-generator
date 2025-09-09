export type InputType = {
  'text', 'superText' /* ? */, 'email', 'date', 'number', 'checkbox', 'singleSelect', 'multiSelect'  
}

interface InputValidation {
  min?: number
  max?: number
  custom?: bool // fn returning bool? 
}

export interface Input {
  type: FieldType
  header: string
  description?: string
  validation?: InputValidation
}

export interface FormInput extends Input {
  required: boolean
  unique: boolean
  order: number
}