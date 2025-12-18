"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { isAscending, ProtocolFilters } from "../utils";
import ProtocolListItem from "./ProtocolListItem";

type Props = {
  filters: ProtocolFilters;
  protocols: ProtocolSerialized[];
};

const headers = ["Branza", "Nazwa związku", "Nazwa zakładu", "Data sporu"];

const ProtocolList = ({
  filters: { text = "", fromDate, toDate, sortOrder },
  protocols,
}: Props) => {
  const getDisputeTime = (protocol: ProtocolSerialized) =>
    new Date(protocol.disputeStartDate).getTime();
  const filteredResults = protocols
    .filter(
      ({ branch, tradeUnionName, workplaceName, disputeStartDate }) =>
        (branch.includes(text) ||
          tradeUnionName.includes(text) ||
          workplaceName.includes(text)) &&
        (fromDate ? new Date(disputeStartDate) >= new Date(fromDate) : true) &&
        (toDate ? new Date(disputeStartDate) <= new Date(toDate) : true)
    )
    .sort((a, b) =>
      isAscending(sortOrder)
        ? getDisputeTime(a) - getDisputeTime(b)
        : getDisputeTime(b) - getDisputeTime(a)
    );

  return (
    <div className="grid grid-cols-5 items-center">
      {headers.map((header, idx) => (
        <div key={idx} className="font-black">
          {header}
        </div>
      ))}
      <div></div>

      {filteredResults.map((protocol, idx) => (
        <ProtocolListItem {...protocol} key={idx} />
      ))}
    </div>
  );
};

export default ProtocolList;
