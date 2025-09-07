import { DbModel, Properties } from "@/types/mongo"
import { BSONType } from "mongodb"

enum FormField {
  TITLE = 'title',
  DESCRIPTION = 'description',
  CREATED_BY = 'createdBy',
  CREATED_AT = 'createdAt',
  UPDATED_BY = 'updatedBy',
  UPDATED_AT = 'updatedAt',
  INPUTS = 'inputs',
}

const formProperties: Properties = {
  [FormField.TITLE]: { bsonType: BSONType.string },
  [FormField.DESCRIPTION]: { bsonType: BSONType.string },
  [FormField.CREATED_BY]: { bsonType: BSONType.objectId },
  [FormField.CREATED_AT]: { bsonType: BSONType.date },
  [FormField.UPDATED_BY]: { bsonType: BSONType.objectId },
  [FormField.UPDATED_AT]: { bsonType: BSONType.date },
  [FormField.INPUTS]: { bsonType: BSONType.array }
}

const formRequired = [
  FormField.TITLE, FormField.CREATED_BY, FormField.CREATED_AT, FormField.UPDATED_BY, FormField.UPDATED_AT
]

export const FormModel: DbModel = {
  name: 'form',
  properties: formProperties,
  required: formRequired as unknown as string[]
}