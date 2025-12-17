import { createProtocolAction } from "@/actions/protocol/createProtocolAction";
import { ProtocolFormSchema } from "@/lib/zodSchema/protocolFormSchema";

export const handleAddProtocol = async (data: ProtocolFormSchema) => {
  const {
    branch,
    tradeUnionName,
    workplaceName,
    disputeStartDate,
    disputeReason,
  } = data;

  await createProtocolAction({
    branch,
    disputeReason,
    tradeUnionName,
    workplaceName,
    disputeStartDate: disputeStartDate as string,
  });
};
