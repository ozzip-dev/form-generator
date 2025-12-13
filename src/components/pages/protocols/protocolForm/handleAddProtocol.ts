import { createProtocolAction } from "@/actions/protocol/createProtocol.Action";

export const handleAddProtocol = async (data: any) => {
  console.log("SUBMIT", data);

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
