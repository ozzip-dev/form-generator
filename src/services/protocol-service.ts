import { Collection, Db, Document, InsertOneResult } from "mongodb";
import { db, findAll, findById, getCollection, insert } from "@/lib/mongo";
import { Protocol, ProtocolSerialized } from "@/types/protocol";

export async function getProtocols(database: Db): Promise<Protocol[]> {
  const protocols = await findAll<Protocol>(database, "protocol");
  return protocols;
}

// TODO Pawel: get records with no data, add download action
export async function getProtocolsNoData(database: Db): Promise<Protocol[]> {
  const collection: Collection<Protocol> = getCollection<Protocol>(
    database,
    "protocol"
  );
  const protocols = await collection.find({}).project({ data: 0 }).toArray();
  return protocols as Protocol[];
}

export async function addProtocol(
  database: Db,
  data: Partial<ProtocolSerialized>
): Promise<string> {
  const now = new Date()
  const lastModifiedAt = now
  const uploadedAt = now
  const disputeStartDate = new Date(data.disputeStartDate!)
  const { insertedId } = await insert<Protocol>(database, "protocol", {
    ...data,
    lastModifiedAt,
    uploadedAt,
    disputeStartDate
  });

  return insertedId
}
