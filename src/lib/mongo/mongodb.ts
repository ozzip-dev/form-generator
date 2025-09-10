import { MongoClient, ObjectId } from 'mongodb';
import { makeDbCollection } from './mongo-utils';
import { FormModel, InputModel, UserModel } from '@/models';
import { DbModel } from '@/types/mongo';
import { TemplateInputId } from '@/models/Input';
import { maybeAddTemplateInput } from '@/services/input-service';

const client = new MongoClient(process.env.DATABASE_URL as string);
const db = client.db();

const collections: [string, DbModel][] = [
  ['user', UserModel], 
  ['input', InputModel],
  ['form', FormModel]
]

  // TODO Pawel
async function initCollections() {
  for (const [name, model] of collections) {
    const collections = db.listCollections({ name })
    
    if (!(await collections.toArray())?.length) {
      await makeDbCollection(db, model)
      console.log(`Initialized the '${name}' collection`)
    }
  }
}

async function addTemplateInputs() {
  const { SURNAME_NAME, ADDRESS, AGE, CONTRACT_TYPE } = TemplateInputId
  for (const id of [SURNAME_NAME, ADDRESS, AGE, CONTRACT_TYPE]) {
    await maybeAddTemplateInput(id)
  }
}

await initCollections()
await addTemplateInputs()

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
