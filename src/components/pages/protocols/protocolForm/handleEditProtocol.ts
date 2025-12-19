import { editProtocolAction } from "@/actions/protocol/editProtocolAction";
import { setClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { ProtocolFormSchema } from "@/lib/zodSchema/protocolFormSchema";
import { UseFormSetError } from "react-hook-form";

export const handleEditProtocol = async (
  protocolId: string,
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
    const resp = await editProtocolAction(protocolId,
      {
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
    throw new Error(`edit Protocol failed: ${err}`);
  }
};
