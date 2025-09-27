import { FieldType } from "@/lib/mongo/mongo-utils"
import { DbModel, Properties } from "@/types/mongo"

export enum TemplateInputId {
  SURNAME_NAME = 'surname_name',
  ADDRESS = 'address',
  AGE = 'age',
  CONTRACT_TYPE = 'contract_type'
  // TODO Pawel: add many more
}

/* Leave commented out code for now */
enum InputField {
  ID = 'id',
  TYPE = 'type',
  // REQUIRED = 'required',
  // UNIQUE = 'unique',
  HEADER = 'header',
  DESCRIPTION = 'description',
  // ORDER = 'order',
  VALIDATION = 'validation', // ?
  OPTIONS = 'options',
  TEMPLATE = 'template', // or 'id' is enough?
}

const inputProperties: Properties = {
  [InputField.ID]: { bsonType: FieldType.STRING },
  [InputField.TYPE]: { bsonType: FieldType.STRING },
  [InputField.HEADER]: { bsonType: FieldType.STRING },
  [InputField.DESCRIPTION]: { bsonType: FieldType.STRING },
  [InputField.VALIDATION]: { bsonType: FieldType.OBJECT },
  [InputField.OPTIONS]: { bsonType: FieldType.ARRAY },
  [InputField.TEMPLATE]: { bsonType: FieldType.BOOL }
}

// const formInputProperties: Properties = {
//   ...inputProperties,
//   [InputField.ORDER]: { bsonType: FieldType.int },
//   [InputField.REQUIRED]: { bsonType: FieldType.bool }
// }

const inputRequired: InputField[] = [
  InputField.TYPE, InputField.HEADER, InputField.VALIDATION
]

// const formInputRequired = [
//   ...inputRequired, InputField.ORDER, InputField.REQUIRED
// ]

export const InputModel: DbModel = {
  name: 'input',
  // TODO Pawel: uncomment once db schemas are established
  // properties: inputProperties,
  // required: inputRequired as unknown as string[]
}

// export const FormInputModel: DbModel = {
//   name: 'form-input',
//   properties: formInputProperties,
//   required: formInputRequired as unknown as string[]
// }