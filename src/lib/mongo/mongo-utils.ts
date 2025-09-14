import { DbModel, Properties } from "@/types/mongo"
import { Collection, Db, DeleteResult, Document, InsertManyResult, InsertOneResult, ObjectId, UpdateResult, WithId } from "mongodb"

// TODO Pawel: wrong place
export enum FieldType {
  STRING = 'string',
  OBJECT = 'object',
  OBJECT_ID = 'objectId',
  INT = 'int',
  BOOL = 'bool',
  DATE = 'date',
  ARRAY = 'array',
}

/* Next throws error if ObjectId(...) is passed inside an object */
export const parseObjProps = (obj: unknown) => (
  JSON.parse(JSON.stringify(obj))
)

const getModelValidator = (
  properties: Properties, 
  required: string[],
): Document => ({
    $jsonSchema: {
      // bsonType: 'object',
      required,
      properties
  }
})

export const makeDbCollection = async  (db: Db, model: DbModel) => {
  const { name, properties, required } = model
  const validator: Document = getModelValidator(
    properties, required
  )
  await db.createCollection(name, { validator })
}

/* queries */
const getCollection = (
  db: Db,
  collectionName: string
): Collection<Document>  => db.collection(collectionName)

export async function find(
  db: Db,
  collectionName: string,
  query: Document
): Promise<Document[]> {
  const collection: Collection<Document> = getCollection(db, collectionName)
  const docs: Document[] = await collection.find(query).toArray()
  return docs
}

export async function findOne(
  db: Db,
  collectionName: string,
  query: Document
): Promise<Document | null> {
  const collection: Collection<Document> = getCollection(db, collectionName)
  const doc: Document | null  = await collection.findOne(query)
  return doc
}

export async function findById(
  db: Db,
  collectionName: string,
  _id: ObjectId
): Promise<Document | null> {
  const collection: Collection<Document> = getCollection(db, collectionName)
  const doc: Document | null  = await collection.findOne({ _id })
  return doc
}

export async function findAll(
  db: Db,
  collectionName: string
): Promise<Document[]> {
  return find(db, collectionName, {})
}

export async function insert(
  db: Db, 
  collectionName: string,
  doc: Document
): Promise<InsertOneResult<Document>> {
  const collection: Collection<Document> = getCollection(db, collectionName)
  const result: InsertOneResult<Document> = await collection.insertOne(doc)
  return result
}

export async function insertMany(
  db: Db, 
  collectionName: string,
  docs: Document[]
): Promise<InsertManyResult<Document>> {
  const collection: Collection<Document> = getCollection(db, collectionName)
  const result: InsertManyResult<Document> = await collection.insertMany(docs)
  return result
}

export async function updateMany(
  db: Db, 
  collectionName: string,
  query: Document,
  updateData: Document,
): Promise<UpdateResult<Document>> {
  const collection: Collection<Document> = getCollection(db, collectionName)
  const result: UpdateResult<Document> = await collection.updateMany(query, updateData)
  return result
}

export async function update(
  db: Db, 
  collectionName: string,
  query: Document,
  updateData: Document,
): Promise<WithId<Document> | null> {
  const collection: Collection<Document> = getCollection(db, collectionName)
  const result = await collection.findOneAndUpdate(query, updateData)
  return result
}

export async function updateById(
  db: Db,
  collectionName: string,
  _id: ObjectId,
  updateData: Document,
): Promise<WithId<Document> | null> {
  const collection: Collection<Document> = getCollection(db, collectionName)

  const result = await collection.findOneAndUpdate(
    { _id },
    updateData,
    { returnDocument: "after" }
  );

  return result;
}

export async function deleteMany(
  db: Db, 
  collectionName: string,
  query: Document,
): Promise<DeleteResult> {
  const collection: Collection<Document> = getCollection(db, collectionName)
  const result: DeleteResult = await collection.deleteMany(query)
  return result
}

export async function deleteById(
  db: Db, 
  collectionName: string,
  _id: ObjectId
): Promise<DeleteResult> {
  const collection: Collection<Document> = getCollection(db, collectionName)
  const result: DeleteResult = await collection.deleteOne({ _id })
  return result
}
