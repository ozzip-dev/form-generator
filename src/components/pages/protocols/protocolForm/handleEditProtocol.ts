import { editProtocolAction } from "@/actions/protocol/editProtocolAction";
import { setClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { ProtocolFormSchema } from "@/lib/zodSchema/protocolFormSchema";
import { UseFormSetError } from "react-hook-form";

export const handleEditProtocol = async (
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
    const resp = await editProtocolAction({
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
    console.error("edit Protocol failed", err);
  }
};
