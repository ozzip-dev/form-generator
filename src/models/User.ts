import { FieldType } from "@/lib/mongo/mongo-utils"
import { DbModel, Properties } from "@/types/mongo"

enum UserField {
  NAME = 'name',
  EMAIL = 'email',
  EMAIL_VERIFIED = 'emailVerified',
  IMAGE = 'image',
  ROLE = 'role',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum UserRole {
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

const userProperties: Properties = {
  [UserField.NAME]: { bsonType: FieldType.STRING },
  [UserField.EMAIL]: { bsonType: FieldType.STRING },
  [UserField.EMAIL_VERIFIED]: { bsonType: FieldType.BOOL },
  [UserField.IMAGE]: { bsonType: FieldType.STRING },
  [UserField.ROLE]: { bsonType: FieldType.STRING },
  [UserField.CREATED_AT]: { bsonType: FieldType.DATE },
  [UserField.UPDATED_AT]: { bsonType: FieldType.DATE }
  // sessions      Session[]
  // accounts      Account[]
}

const userRequired = [
  UserField.NAME, UserField.EMAIL, UserField.EMAIL_VERIFIED, UserField.CREATED_AT, UserField.UPDATED_AT
]

export const UserModel: DbModel = {
  name: 'user',
  // TODO Pawel: uncomment once db schemas are established
  // properties: userProperties,
  // required: userRequired as unknown as string[]
}