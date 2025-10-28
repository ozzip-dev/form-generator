import { MongoClient } from "mongodb";
import { makeDbCollection } from "./mongo-utils";
import { FormModel, InputModel, UserModel } from "@/models";
import { DbModel } from "@/types/mongo";
import { TemplateInputId } from "@/models/Input";
import { TemplateFormId } from "@/models/Form";
import {
  maybeAddTemplateForm,
  maybeAddTemplateInput,
} from "@/services/migrations/form-input-migrations";
import { ProtocolModel } from "@/models/Protocol";

const client = new MongoClient(process.env.DATABASE_URL as string);
await client.connect();
const db = client.db();

const collections: [string, DbModel][] = [
  ["user", UserModel],
  ["input", InputModel],
  ["form", FormModel],
  ["protocol", ProtocolModel],
];

// TODO Pawel
async function initCollections() {
  for (const [name, model] of collections) {
    const collections = db.listCollections({ name });

    if (!(await collections.toArray())?.length) {
      await makeDbCollection(db, model);
      console.log(`Initialized the '${name}' collection`);
    }
  }
}

// TODO Pawel: or simply iterate through formTemplates?
async function addTemplateForms() {
  for (const id of Object.values(TemplateFormId)) {
    await maybeAddTemplateForm(db, id);
  }
}

// TODO Pawel: or simply iterate through inputTemplates?
async function addTemplateInputs() {
  for (const id of Object.values(TemplateInputId)) {
    await maybeAddTemplateInput(db, id);
  }
}

await initCollections();
await addTemplateInputs();
await addTemplateForms();

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

export { db };
