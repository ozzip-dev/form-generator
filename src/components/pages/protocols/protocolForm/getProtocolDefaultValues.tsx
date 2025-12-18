import { OPTION_OTHER } from "@/helpers/inputHelpers";
import { ProtocolSerialized } from "@/types/protocol";

export const getProtocolDefaultValues = (
  protocol?: Partial<ProtocolSerialized>
) => {
  return {
    branch: protocol?.branch ?? "",
    disputeStartDate: protocol?.disputeStartDate
      ? new Date(protocol.disputeStartDate).toISOString().split("T")[0]
      : "",
    tradeUnionName: protocol?.tradeUnionName ?? "",
    workplaceName: protocol?.workplaceName ?? "",
    disputeReason: protocol?.disputeReason ?? {
      workTime: "",
      safetyConditions: "",
      wages: "",
      workStandards: "",
      [OPTION_OTHER]: "",
    },
  };
};
