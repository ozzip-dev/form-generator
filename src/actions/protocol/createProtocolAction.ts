"use server";

import { db } from "@/lib/mongo";
import { addProtocol } from "@/services/protocol-service";
import { ProtocolInsertData } from "@/types/protocol";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createProtocolAction({
  branch,
  disputeReason,
  tradeUnionName,
  workplaceName,
  disputeStartDate,
}: ProtocolInsertData): Promise<void> {
  let protocolId = "";
  try {
    protocolId = await addProtocol(db, {
      branch,
      disputeReason,
      tradeUnionName,
      workplaceName,
      disputeStartDate,
      fileIds: {
        demands: [],
        mediationMeetings: [],
        mediationDiscrepancy: [],
        negotiationMeetings: [],
        negotiationDiscrepancy: [],
        agreement: [],
        other: [],
      },
    });

    revalidateTag("protocols");
  } catch (_) {
    // Delete files? If yes, trigger proper action
    throw new Error("Invalid protocol data");
  }

  redirect(`/protocols/${protocolId}`);
}
