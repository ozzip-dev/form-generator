"use client";

import { createProtocolAction } from "@/actions/protocol";
import { setClientErrors } from "@/helpers/helpers-validation/handleFormErrors";
import { ProtocolFormSchema } from "@/lib/zod-schema/protocolFormSchema";
import { UseFormSetError } from "react-hook-form";

export const handleAddProtocol = async (
  data: ProtocolFormSchema,
  setError: UseFormSetError<ProtocolFormSchema>
) => {
  const {
    branch,
    tradeUnionName,
    workplaceName,
    disputeStartDate,
    disputeReason,
  } = data;

  try {
    const resp = await createProtocolAction({
      branch,
      disputeReason,
      tradeUnionName,
      workplaceName,
      disputeStartDate: disputeStartDate as string,
    });

    if (resp?.validationErrors) {
      setClientErrors(resp.validationErrors, setError);
      return;
    }
  } catch (err) {
    console.error("createProtocol failed", err);
  }
};
