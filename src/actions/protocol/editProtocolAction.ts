"use server";

import { ValidationErrors } from "@/helpers/helpers-validation/handleFormErrors";
import { protocolFormSchema } from "@/lib/zod-schema/protocolFormSchema";
import { editProtocol } from "@/services/protocol-service";
import { requireUser } from "@/services/user-service";
import { ProtocolInsertData } from "@/types/protocol";
import { revalidateTag } from "next/cache";

export const editProtocolAction = async (
  protocolId: string,
  {
    branch,
    disputeReason,
    tradeUnionName,
    workplaceName,
    disputeStartDate,
  }: ProtocolInsertData
): Promise<void | {
  validationErrors: ValidationErrors;
}> => {
  requireUser();
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

  await editProtocol(protocolId, data)

  revalidateTag("protocols")
};
