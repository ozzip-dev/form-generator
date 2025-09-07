import { DbModel, Properties } from "@/types/mongo"
import { Collection, Db, Document, ObjectId } from "mongodb"

const getModelValidator = (
  properties: Properties, 
  required: string[],
): Document => ({
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required,
      properties
    }
  }
})

export const makeDbCollection = (db: Db, model: DbModel) => {
  const { name, properties, required } = model
  const validator: Document = getModelValidator(
    properties, required
  )
  db.createCollection(name, { validator })
}

/* queries */
const getCollection = (db: Db, collectionName: string): Collection<Document>  => db.collection(collectionName)

/* GET */
export async function find(db: Db, collectionName: string, query: Document): Promise<Document[]> {
  const collection: Collection<Document> = getCollection(db, collectionName)
  const docs: Document[] = await collection.find(query).toArray()
  return docs
}

export async function findById(db: Db, collectionName: string, _id: ObjectId): Promise<Document | null> {
  const collection: Collection<Document> = getCollection(db, collectionName)
  const doc: Document | null  = await collection.findOne({ _id })
  return doc
}

export async function findAll(db: Db, collectionName: string): Promise<Document[]> {
  return find(db, collectionName, {})
}

// TODO Pawel: add POST PUT/PATCH DELETE