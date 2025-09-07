import { DbModel, Properties } from "@/types/mongo"
import { BSONType } from "mongodb"

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
  [UserField.NAME]: { bsonType: BSONType.string },
  [UserField.EMAIL]: { bsonType: BSONType.string },
  [UserField.EMAIL_VERIFIED]: { bsonType: BSONType.bool },
  [UserField.IMAGE]: { bsonType: BSONType.string },
  [UserField.ROLE]: { bsonType: BSONType.string },
  [UserField.CREATED_AT]: { bsonType: BSONType.date },
  [UserField.UPDATED_AT]: { bsonType: BSONType.date }
  // sessions      Session[]
  // accounts      Account[]
}

const userRequired = [
  UserField.NAME, UserField.EMAIL, UserField.EMAIL_VERIFIED, UserField.CREATED_AT, UserField.UPDATED_AT
]

export const UserModel: DbModel = {
  name: 'user',
  properties: userProperties,
  required: userRequired as unknown as string[]
}