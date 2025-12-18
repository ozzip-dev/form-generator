"use server";

import { ValidationErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { protocolFormSchema } from "@/lib/zodSchema/protocolFormSchema";
import { requireUser } from "@/services/user-service";
import { ProtocolInsertData } from "@/types/protocol";

export const editProtocolAction = async ({
  branch,
  disputeReason,
  tradeUnionName,
  workplaceName,
  disputeStartDate,
}: ProtocolInsertData): Promise<void | {
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

  return;
};
