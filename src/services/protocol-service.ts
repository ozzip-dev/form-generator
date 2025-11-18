import { Collection, Db, Document } from "mongodb";
import { findAll, getCollection, insert } from "@/lib/mongo";
import { Protocol } from "@/types/protocol";

export async function getProtocols(database: Db): Promise<Protocol[]> {
  const protocols = await findAll<Protocol>(database, "protocol");
  return protocols;
}

// TODO Pawel: get records with no data, add download action
export async function getProtocolsNoData(database: Db): Promise<Protocol[]> {
  const collection: Collection<Protocol> = getCollection<Protocol>(database, 'protocol');
  const protocols = await collection
    .find({})
    .project({ data: 0 })
    .toArray()
  return protocols as Protocol[];
}

export async function addProtocol(
  database: Db,
  data: Partial<Protocol>
): Promise<void> {
  await insert<Protocol>(database, "protocol", data);
}
