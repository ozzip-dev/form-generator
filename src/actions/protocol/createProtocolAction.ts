"use server";

import { db } from "@/lib/mongo";
import { addProtocol } from "@/services/protocol-service";
import { requireUser } from "@/services/user-service";
import { ProtocolInsertData } from "@/types/protocol";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { protocolFormSchema } from "@/lib/zodSchema/protocolFormSchema";
import { ValidationErrors } from "@/helpers/helpersValidation/handleFormErrors";

export async function createProtocolAction({
  branch,
  disputeReason,
  tradeUnionName,
  workplaceName,
  disputeStartDate,
}: ProtocolInsertData): Promise<void | { validationErrors: ValidationErrors }> {
  const user = await requireUser();

  const data = {
    branch,
    tradeUnionName,
    workplaceName,
    disputeStartDate,
    disputeReason,
  };

  const validationResult = protocolFormSchema.safeParse(data);

  if (!validationResult.success) {
    return { validationErrors: validationResult.error.flatten().fieldErrors };
  }

  let protocolId = "";
  try {
    protocolId = await addProtocol(db, user.id, {
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
    throw new Error("Invalid protocol data");
  }

  redirect(`/protocols/${protocolId}`);
}
