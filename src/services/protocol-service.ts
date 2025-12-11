import { Collection, Db, ObjectId } from "mongodb";
import { db, findAll, findById, getCollection, insert, updateById } from "@/lib/mongo";
import { Protocol, ProtocolFileCategory, ProtocolSerialized } from "@/types/protocol";

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

export async function getProtocolById(formId: string): Promise<Protocol> {
  const protocol = await findById<Protocol>(db, 'protocol', new ObjectId(formId))
  if (!protocol) throw new Error('Invalid protocol id')
  return protocol
}

export async function addFileToProtocol({
  protocolId,
  fileId,
  fileCategory,
}: {
  protocolId: string,
  fileId: string,
  fileCategory?: ProtocolFileCategory,
}): Promise<void> {
  const pushQuery: string = `fileIds.${fileCategory}`

  await updateById(
    db,
    'protocol',
    new ObjectId(protocolId),
    {
      $push: {
        [pushQuery]: fileId
      }
    }
  )
}

export async function removeFileFromProtocol({
  protocolId,
  fileId,
  fileCategory,
}: {
  protocolId: string,
  fileId: string,
  fileCategory?: ProtocolFileCategory,
}): Promise<void> {
  const pullQuery: string = `fileIds.${fileCategory}`

  await updateById(
    db,
    'protocol',
    new ObjectId(protocolId),
    {
      $pull: {
        [pullQuery]: fileId
      }
    }
  )
}