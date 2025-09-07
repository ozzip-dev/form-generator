import { DbModel, Properties } from "@/types/mongo"
import { BSONType } from "mongodb"

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
  [InputField.TYPE]: { bsonType: BSONType.string },
  [InputField.HEADER]: { bsonType: BSONType.string },
  [InputField.DESCRIPTION]: { bsonType: BSONType.string },
  [InputField.VALIDATION]: { bsonType: BSONType.object }
}

// const formInputProperties: Properties = {
//   ...inputProperties,
//   [InputField.ORDER]: { bsonType: BSONType.int },
//   [InputField.REQUIRED]: { bsonType: BSONType.bool }
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