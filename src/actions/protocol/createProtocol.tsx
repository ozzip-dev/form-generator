"use server";

import { db, updateById } from "@/lib/mongo";
import { addProtocol } from "@/services/protocol-service";
import { Protocol, ProtocolFileCategory, ProtocolFiles, ProtocolFileType } from "@/types/protocol";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

type ProtocolInsertData = {
  branch: string
  disputeReason: string
  tradeUnionName: string
  workplaceName: string
  disputeStartDate: string
  negotiations: ProtocolFiles
  mediations: ProtocolFiles
}

const fileDefaults: {
  meetings: string[]
  discrepancy: string[]
} = {
  meetings: [],
  discrepancy: []
}

export async function createProtocol({
  branch,
  disputeReason,
  tradeUnionName,
  workplaceName,
  disputeStartDate,
  negotiations = fileDefaults,
  mediations = fileDefaults
}: ProtocolInsertData): Promise<Protocol> {
  try {
    const protocol = await addProtocol(db, {
      branch,
      disputeReason,
      tradeUnionName,
      workplaceName,
      disputeStartDate: new Date(disputeStartDate),
      files: {
        negotiations,
        mediations,
      },
      lastModifiedAt: new Date(),
      uploadedAt: new Date()
    });

    revalidateTag("protocols");
  
    return protocol;
  } catch(_) {
    // Delete files? If yes, trigger proper action
    throw new Error('Invalid protocol data')
  }
}

export async function addFileToProtocol({
  protocolId,
  fileId,
  fileCategory,
  fileType
}: {
  protocolId: string,
  fileId: string,
  fileCategory: ProtocolFileCategory,
  fileType: ProtocolFileType
}): Promise<void> {
  const pushQuery: string = `files.${fileCategory}.${fileType}`
  await updateById(
    db,
    'protocol',
    new ObjectId(protocolId),
    {
      $push: {
        [pushQuery]: fileId
      }
      // $push: {
      //   files: {
      //     [fileCategory]: {
      //       [fileType]: fileId
      //     }
      //   }
      // }
    }
  )
}
