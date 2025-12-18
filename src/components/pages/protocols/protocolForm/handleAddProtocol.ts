import { createProtocolAction } from "@/actions/protocol/createProtocolAction";

export const handleAddProtocol = async (data: any) => {
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
