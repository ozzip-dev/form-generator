import { createProtocolAction } from "@/actions/protocol/createProtocolAction";
import { setClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { ProtocolFormSchema } from "@/lib/zodSchema/protocolFormSchema";

export const handleAddProtocol = async (
  data: ProtocolFormSchema,
  setError: any
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

    console.log("resp", resp);

    if (resp?.validationErrors) {
      setClientErrors(resp.validationErrors, setError);
      return;
    }
  } catch (error) {}
};
