import { FieldType } from "@/lib/mongo/mongo-utils"
import { DbModel, Properties } from "@/types/mongo"

/* Leave commented out code for now */
enum InputField {
  TYPE = 'type',
  // REQUIRED = 'required',
  // UNIQUE = 'unique',
  HEADER = 'header',
  DESCRIPTION = 'description',
  // ORDER = 'order',
  VALIDATION = 'validation', // ?
}

const inputProperties: Properties = {
  [InputField.TYPE]: { bsonType: FieldType.STRING },
  [InputField.HEADER]: { bsonType: FieldType.STRING },
  [InputField.DESCRIPTION]: { bsonType: FieldType.STRING },
  [InputField.VALIDATION]: { bsonType: FieldType.OBJECT }
}

// const formInputProperties: Properties = {
//   ...inputProperties,
//   [InputField.ORDER]: { bsonType: FieldType.int },
//   [InputField.REQUIRED]: { bsonType: FieldType.bool }
// }

const inputRequired = [
  InputField.TYPE, InputField.HEADER, InputField.VALIDATION
]

// const formInputRequired = [
//   ...inputRequired, InputField.ORDER, InputField.REQUIRED
// ]

export const InputModel: DbModel = {
  name: 'input',
  properties: inputProperties,
  required: inputRequired as unknown as string[]
}

// export const FormInputModel: DbModel = {
//   name: 'form-input',
//   properties: formInputProperties,
//   required: formInputRequired as unknown as string[]
// }