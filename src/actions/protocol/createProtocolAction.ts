"use server";

import { db } from "@/lib/mongo";
import { addProtocol } from "@/services/protocol-service";
import { requireUser } from "@/services/user-service";
import {
  ProtocolAttachmentCategory,
  ProtocolInsertData,
} from "@/types/protocol";
import { revalidateTag } from "next/cache";
import { protocolFormSchema } from "@/lib/zod-schema/protocolFormSchema";
import { ValidationErrors } from "@/helpers/helpers-validation/handleFormErrors";
import { defaultAttachments } from "@/helpers/protocolHelpers";

export async function createProtocolAction({
  branch,
  disputeReason,
  demands,
  tradeUnionName,
  tradeUnionOrganization,
  workplaceName,
  disputeStartDate,
}: ProtocolInsertData): Promise<{
  validationErrors?: ValidationErrors;
  protocolId?: string;
}> {
  const user = await requireUser();

  const data = {
    branch,
    demands,
    tradeUnionName,
    tradeUnionOrganization,
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
      demands,
      tradeUnionName,
      tradeUnionOrganization,
      workplaceName,
      disputeStartDate,
      fileIds: defaultAttachments as Record<
        ProtocolAttachmentCategory,
        string[]
      >,
      links: defaultAttachments as Record<ProtocolAttachmentCategory, string[]>,
    });

    revalidateTag("protocols");
  } catch (_) {
    throw new Error("Invalid protocol data");
  }
  return { protocolId };
}
