import { FieldType } from "@/lib/mongo/mongo-utils"
import { DbModel, Properties } from "@/types/mongo"

enum FormField {
  TITLE = 'title',
  DESCRIPTION = 'description',
  CREATED_BY = 'createdBy',
  CREATED_AT = 'createdAt',
  UPDATED_BY = 'updatedBy',
  UPDATED_AT = 'updatedAt',
  INPUTS = 'inputs',
  STATE = 'state',
}

const formProperties: Properties = {
  [FormField.TITLE]: { bsonType: FieldType.STRING },
  [FormField.DESCRIPTION]: { bsonType: FieldType.STRING },
  [FormField.CREATED_BY]: { bsonType: FieldType.OBJECT_ID },
  [FormField.CREATED_AT]: { bsonType: FieldType.DATE },
  [FormField.UPDATED_BY]: { bsonType: FieldType.OBJECT_ID },
  [FormField.UPDATED_AT]: { bsonType: FieldType.DATE },
  [FormField.INPUTS]: { bsonType: FieldType.ARRAY },
  [FormField.STATE]: { bsonType: FieldType.STRING }
}

const formRequired = [
  FormField.TITLE, FormField.CREATED_BY, FormField.CREATED_AT, FormField.UPDATED_BY, FormField.UPDATED_AT, FormField.STATE
]

export const FormModel: DbModel = {
  name: 'form',
  properties: formProperties,
  required: formRequired as unknown as string[]
}