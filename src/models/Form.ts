import { FieldType } from "@/enums"
import { DbModel, Properties } from "@/types/mongo"

export enum TemplateFormId {
  MEMBERSHIP = 'membership',
  FAVOURITE_COLOR = 'favourite-color',
  STRIKE = 'strike'
  // TODO Pawel: add more
}

enum FormField {
  ID = 'id',
  TYPE = 'type',
  TITLE = 'title',
  DESCRIPTION = 'description',
  CREATED_BY = 'createdBy',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  INPUTS = 'inputs',
  STATE = 'state',
}

const formProperties: Properties = {
  [FormField.ID]: { bsonType: FieldType.STRING },
  [FormField.TYPE]: { bsonType: FieldType.STRING },
  [FormField.TITLE]: { bsonType: FieldType.STRING },
  [FormField.DESCRIPTION]: { bsonType: FieldType.STRING },
  [FormField.CREATED_BY]: { bsonType: FieldType.OBJECT_ID },
  [FormField.CREATED_AT]: { bsonType: FieldType.DATE },
  [FormField.UPDATED_AT]: { bsonType: FieldType.DATE },
  [FormField.INPUTS]: { bsonType: FieldType.ARRAY },
  [FormField.STATE]: { bsonType: FieldType.STRING },
}

const formRequired: any[] = [
  FormField.TITLE, FormField.TYPE, FormField.CREATED_AT, FormField.UPDATED_AT, FormField.STATE, FormField.INPUTS
]

export const FormModel: DbModel = {
  name: 'form',
  // TODO Pawel: uncomment once db schemas are established
  // properties: formProperties,
  // required: formRequired as unknown as string[]
}