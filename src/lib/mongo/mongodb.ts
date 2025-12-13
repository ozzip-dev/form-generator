import { MongoClient } from "mongodb";
import { makeDbCollection } from "./mongo-utils";
import { FormModel, InputModel, UserModel } from "@/models";
import { DbModel } from "@/types/mongo";
import { TemplateFormId } from "@/models/Form";
import { maybeAddTemplateForm } from "@/services/migrations/form-input-migrations";
import { ProtocolModel } from "@/models/Protocol";
import { PostModel } from "@/models/Post";
import { TopicModel } from "@/models/Topic";
import { FileModel } from "@/models/File";

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

await initCollections();
await addTemplateForms();

export { db };
