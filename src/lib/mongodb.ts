import { MongoClient } from 'mongodb';
import { makeDbCollection } from './mongo-utils';
import { UserModel } from '@/models/User';

const client = new MongoClient(process.env.DATABASE_URL as string);
const db = client.db();

// TODO Pawel
const collections = db.listCollections({ name: 'users' })

if (!(await collections.toArray())?.length) {
  makeDbCollection(db, UserModel)
}

/*
Prisma models
model User {
  id            String    @id @map('_id')
  name          String
  email         String
  emailVerified Boolean
  image         String?
  createdAt     DateTime
  updatedAt     DateTime
  sessions      Session[]
  accounts      Account[]

  @@unique([email])
  @@map('user')
}

model Session {
  id        String   @id @map('_id')
  expiresAt DateTime
  token     String
  createdAt DateTime
  updatedAt DateTime
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@map('session')
}

model Account {
  id                    String    @id @map('_id')
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime
  updatedAt             DateTime

  @@map('account')
}

model Verification {
  id         String    @id @map('_id')
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime?
  updatedAt  DateTime?

  @@map('verification')
}
*/

export { db }
