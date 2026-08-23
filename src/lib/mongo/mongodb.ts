import { MongoClient } from "mongodb";
import { makeDbCollection } from "./mongo-utils";
import {
  FormModel,
  InputModel,
  UserModel,
  FileModel,
  PostModel,
  ProtocolModel,
  ResultModel,
  TopicModel,
  TemplateFormId,
  EventLogModel,
} from "./models";
import { DbModel } from "@/types/mongo";
import { maybeAddTemplateForm } from "@/services/migrations/form-input-migrations";

const client = new MongoClient(process.env.DATABASE_URL as string);
await client.connect();
const db = client.db();

const collections: [string, DbModel][] = [
  ["user", UserModel],
  ["input", InputModel],
  ["form", FormModel],
  ["file", FileModel],
  ["protocol", ProtocolModel],
  ["post", PostModel],
  ["topic", TopicModel],
  ["event_log", EventLogModel],
];

async function initCollections() {
  for (const [name, model] of collections) {
    const collections = db.listCollections({ name });

    if (!(await collections.toArray())?.length) {
      await makeDbCollection(db, model);
      console.log(`Initialized the '${name}' collection`);
    }
  }
}

/* if template is missing at an instance, add it */
async function addTemplateForms() {
  for (const id of Object.values(TemplateFormId)) {
    await maybeAddTemplateForm(db, id);
  }
}

await initCollections();
await addTemplateForms();

export { db };
