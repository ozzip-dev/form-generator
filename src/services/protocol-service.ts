import { Collection, Db, ObjectId } from "mongodb";
import {
  db,
  deleteById,
  findAll,
  findById,
  getCollection,
  insert,
  updateById,
} from "@/lib/mongo";
import {
  Protocol,
  ProtocolFileCategory,
  ProtocolInsertData,
  ProtocolSerialized,
  ProtocolWithFilesSerialized,
} from "@/types/protocol";
import { File, FileSerialized } from "@/types/file";
import { serializeFile, serializeProtocol } from "@/lib/serialize-utils";

export async function getProtocols(database: Db): Promise<Protocol[]> {
  const protocols = await findAll<Protocol>(database, "protocol");
  return protocols;
}

// TODO Pawel: get records with no data, add download action
export async function getProtocolsNoData(database: Db): Promise<Protocol[]> {
  const collection: Collection<Protocol> = getCollection<Protocol>(
    database,
    "protocol",
  );
  const protocols = await collection.find({}).project({ data: 0 }).toArray();
  return protocols as Protocol[];
}

export async function addProtocol(
  database: Db,
  userId: string,
  data: Partial<ProtocolSerialized>,
): Promise<string> {
  const now = new Date();
  const lastModifiedAt = now;
  const uploadedAt = now;
  const disputeStartDate = new Date(data.disputeStartDate!);
  const { insertedId } = await insert<Protocol>(database, "protocol", {
    ...data,
    lastModifiedAt,
    uploadedAt,
    uploadedBy: new ObjectId(userId),
    disputeStartDate,
  });

  return (insertedId as ObjectId).toString();
}

export async function getProtocolById(
  protocolId: string,
): Promise<ProtocolSerialized> {
  const protocol = await findById<Protocol>(
    db,
    "protocol",
    new ObjectId(protocolId),
  );
  if (!protocol) throw new Error("Invalid protocol id");
  return serializeProtocol(protocol);
}

export async function addFileToProtocol({
  protocolId,
  fileId,
  fileCategory,
}: {
  protocolId: string;
  fileId: string;
  fileCategory?: ProtocolFileCategory;
}): Promise<void> {
  const pushQuery: string = `fileIds.${fileCategory}`;

  await updateById(db, "protocol", new ObjectId(protocolId), {
    $push: {
      [pushQuery]: fileId,
    },
    $set: {
      lastModifiedAt: new Date(),
    },
  });
}

export async function removeFileFromProtocol({
  protocolId,
  fileId,
  fileCategory,
}: {
  protocolId: string;
  fileId: string;
  fileCategory?: ProtocolFileCategory;
}): Promise<void> {
  const pullQuery: string = `fileIds.${fileCategory}`;

  await updateById(db, "protocol", new ObjectId(protocolId), {
    $pull: {
      [pullQuery]: fileId,
    },
  });
}

export async function removeProtocol({
  protocolId,
}: {
  protocolId: string;
}): Promise<void> {
  await deleteById(db, "protocol", new ObjectId(protocolId));
}

export async function mapFilesToProtocol(
  protocolId: string,
): Promise<ProtocolWithFilesSerialized> {
  const protocol = await getProtocolById(protocolId);
  const serialiedProtocol = protocol;
  const { fileIds } = serialiedProtocol;

  const files: Record<ProtocolFileCategory, (FileSerialized | null)[]> = {
    agreement: [],
    demands: [],
    mediationDiscrepancy: [],
    mediationMeetings: [],
    negotiationDiscrepancy: [],
    negotiationMeetings: [],
    other: [],
  };
  const fileTypes: ProtocolFileCategory[] = Object.keys(
    fileIds,
  ) as ProtocolFileCategory[];
  for (const type of fileTypes) {
    for (const id of fileIds[type]) {
      try {
        const file = await findById<File>(db, "file", new ObjectId(id));
        if (file) files[type]?.push(serializeFile(file));
        else files[type]?.push(null);
      } catch (e) {
        files[type]?.push(null);
      }
    }
  }

  return {
    ...serialiedProtocol,
    files,
  };
}

export async function editProtocol(
  protocolId: string,
  data: ProtocolInsertData,
): Promise<void> {
  const updateData = {
    ...data,
    disputeStartDate: new Date(data.disputeStartDate),
  };
  await updateById(db, "protocol", new ObjectId(protocolId), {
    $set: {
      ...updateData,
    },
  });
}
