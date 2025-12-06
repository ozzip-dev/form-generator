"use server";

import { db, updateById } from "@/lib/mongo";
import { addProtocol } from "@/services/protocol-service";
import {
  ProtocolFileCategory, ProtocolFileType, ProtocolInsertData
} from "@/types/protocol";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

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
}: ProtocolInsertData): Promise<void> {
  let protocolId = ''
  try {
    protocolId = await addProtocol(db, {
      branch,
      disputeReason,
      tradeUnionName,
      workplaceName,
      disputeStartDate,
      files: {
        negotiations,
        mediations,
      },
    });

    revalidateTag("protocols");

  } catch(_) {
    // Delete files? If yes, trigger proper action
    throw new Error('Invalid protocol data')
  }
  
  redirect(`/protocols/${protocolId}`);
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
