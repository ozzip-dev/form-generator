"use server";

import { db } from "@/lib/mongo";
import { addProtocol } from "@/services/protocol-service";
import { ProtocolInsertData} from "@/types/protocol";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// const fileDefaults: {
//   meetings: string[]
//   discrepancy: string[]
// } = {
//   meetings: [],
//   discrepancy: []
// }

export async function createProtocol({
  branch,
  disputeReason,
  tradeUnionName,
  workplaceName,
  disputeStartDate,
  // negotiations = fileDefaults,
  // mediations = fileDefaults
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
        // negotiations: fileDefaults,
        // mediations: fileDefaults,
        demands: [],
        mediationMeetings: [],
        mediationDiscrepancy: [],
        negotiationMeetings: [],
        negotiationDiscrepancy: [],
        agreement: [],
        other: []
      },
    });

    revalidateTag("protocols");

  } catch(_) {
    // Delete files? If yes, trigger proper action
    throw new Error('Invalid protocol data')
  }
  
  redirect(`/protocols/${protocolId}`);
}
