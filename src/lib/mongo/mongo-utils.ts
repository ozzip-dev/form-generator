import { DbModel, Properties } from "@/types/mongo";
import {
  Collection,
  Db,
  DeleteResult,
  Document,
  Filter,
  InsertManyResult,
  InsertOneResult,
  ObjectId,
  OptionalUnlessRequiredId,
  Sort,
  UpdateResult,
  WithId,
} from "mongodb";

/* Next throws error if ObjectId(...) is passed inside an object */
export const parseObjProps = (obj: unknown) => JSON.parse(JSON.stringify(obj));

const getModelValidator = (
  properties: Properties,
  required: string[]
): Document => ({
  $jsonSchema: {
    // bsonType: 'object',
    required,
    properties,
  },
});

export const makeDbCollection = async (db: Db, model: DbModel) => {
  // TODO Pawel: uncomment once db schemas are established
  // const { name, properties, required } = model
  // const validator: Document = getModelValidator(
  //   properties, required
  // )
  // await db.createCollection(name, { validator })
  await db.createCollection(model.name);
};

/* queries */
export const getCollection = <T extends Document>(
  db: Db,
  collectionName: string
): Collection<T> => db.collection<T>(collectionName);

export async function find<T extends Document>(
  db: Db,
  collectionName: string,
  query: Filter<T>,
  sort: Sort | string = {}
): Promise<WithId<T>[]> {
  const collection: Collection<T> = getCollection(db, collectionName);
  const docs: WithId<T>[] = await collection.find(query).sort(sort).toArray();

  return docs;
}

export async function findOne<T extends Document>(
  db: Db,
  collectionName: string,
  query: Filter<T>
): Promise<WithId<T> | null> {
  const collection: Collection<T> = getCollection<T>(db, collectionName);
  const doc: WithId<T> | null = await collection.findOne(query);
  return doc;
}

export async function findById<T extends Document>(
  db: Db,
  collectionName: string,
  _id: ObjectId
): Promise<WithId<T> | null> {
  const collection: Collection<T> = getCollection(db, collectionName);
  const query: Filter<T> = { _id } as Filter<T>;
  const doc: WithId<T> | null = await collection.findOne(query);
  return doc;
}

export async function findAll<T extends Document>(
  db: Db,
  collectionName: string
): Promise<WithId<T>[]> {
  return find<T>(db, collectionName, {});
}

export async function insert<T extends Document>(
  db: Db,
  collectionName: string,
  doc: Partial<T>
): Promise<InsertOneResult<T>> {
  const collection: Collection<T> = getCollection(db, collectionName);
  const result: InsertOneResult<T> = await collection.insertOne(
    doc as OptionalUnlessRequiredId<T>
  );
  return result;
}

export async function insertMany<T extends Document>(
  db: Db,
  collectionName: string,
  docs: Partial<T>[]
): Promise<InsertManyResult<T>> {
  const collection: Collection<T> = getCollection(db, collectionName);
  const result: InsertManyResult<T> = await collection.insertMany(
    docs as OptionalUnlessRequiredId<T>[]
  );
  return result;
}

export async function updateMany<T extends Document>(
  db: Db,
  collectionName: string,
  query: Filter<T>,
  updateData: Partial<T>
): Promise<UpdateResult<T>> {
  const collection: Collection<T> = getCollection(db, collectionName);
  const result: UpdateResult<T> = await collection.updateMany(
    query,
    updateData
  );
  return result;
}

export async function update<T extends Document>(
  db: Db,
  collectionName: string,
  query: Document,
  updateData: Document
): Promise<WithId<Document> | null> {
  const collection: Collection<Document> = getCollection(db, collectionName);
  const result = await collection.findOneAndUpdate(query, updateData);
  return result;
}

export async function updateById<T extends Document>(
  db: Db,
  collectionName: string,
  _id: ObjectId,
  updateData: Partial<T>
): Promise<WithId<T> | null> {
  const collection: Collection<T> = getCollection(db, collectionName);
  const query: Filter<T> = { _id } as Filter<T>;
  const result = await collection.findOneAndUpdate(query, updateData, {
    returnDocument: "after",
  });
  return result;
}

export async function deleteMany<T extends Document>(
  db: Db,
  collectionName: string,
  query: Filter<T>
): Promise<DeleteResult> {
  const collection: Collection<T> = getCollection(db, collectionName);
  const result: DeleteResult = await collection.deleteMany(query);
  return result;
}

export async function deleteById<T extends Document>(
  db: Db,
  collectionName: string,
  _id: ObjectId
): Promise<DeleteResult> {
  const collection: Collection<T> = getCollection(db, collectionName);
  const query: Filter<T> = { _id } as Filter<T>;
  const result: DeleteResult = await collection.deleteOne(query);
  return result;
}

export async function getCount<T extends Document>(
  db: Db,
  collectionName: string,
  query: Filter<T>
): Promise<number> {
  const collection: Collection<T> = getCollection(db, collectionName);

  return collection.countDocuments(query);
}
