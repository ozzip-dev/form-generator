import { editProtocolAction } from "@/actions/protocol";
import { setClientErrors } from "@/helpers/helpers-validation/handleFormErrors";
import { ProtocolFormSchema } from "@/lib/zod-schema/protocolFormSchema";
import { UseFormSetError } from "react-hook-form";

export const handleEditProtocol = async (
  protocolId: string,
  data: ProtocolFormSchema,
  setError: UseFormSetError<ProtocolFormSchema>,
) => {
  const {
    branch,
    demands = [],
    tradeUnionName,
    tradeUnionOrganization,
    workplaceName,
    disputeStartDate,
    disputeReason,
  } = data;

  try {
    const resp = await editProtocolAction(protocolId, {
      branch,
      demands,
      disputeReason,
      tradeUnionName,
      tradeUnionOrganization,
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
