import { DbModel } from "@/types/mongo"
import { BSONType } from "mongodb"

enum UserFields {
  name,
  email,
  emailVerified,
  image,
  createdAt,
  updatedAt
}

const userProperties = {
  name: { bsonType: BSONType.string },
  email: { bsonType: BSONType.string },
  emailVerified: { bsonType: BSONType.bool },
  image: { bsonType: BSONType.string },
  createdAt: { bsonType: BSONType.date },
  updatedAt: { bsonType: BSONType.date }
  // sessions      Session[]
  // accounts      Account[]
}

const userRequired = [
  UserFields.name, UserFields.email, UserFields.emailVerified, UserFields.createdAt, UserFields.updatedAt
]

export const UserModel: DbModel = {
  name: 'user',
  properties: userProperties,
  required: userRequired as unknown as string[]
}