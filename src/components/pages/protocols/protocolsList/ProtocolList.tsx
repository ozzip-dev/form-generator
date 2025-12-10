"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { ProtocolFilters } from "../utils";
import ProtocolListItem from "./ProtocolListItem";

type Props = {
  filters: ProtocolFilters;
  protocols: ProtocolSerialized[];
};

const headers = ["Branza", "Nazwa związku", "Nazwa zakładu", "Data sporu"];

const ProtocolList = ({
  filters: { text = "", fromDate, toDate },
  protocols,
}: Props) => {
  const filteredResults = protocols.filter(
    ({ branch, tradeUnionName, workplaceName, disputeStartDate }) =>
      (branch.includes(text) ||
        tradeUnionName.includes(text) ||
        workplaceName.includes(text)) &&
      (fromDate ? new Date(disputeStartDate) >= new Date(fromDate) : true) &&
      (toDate ? new Date(disputeStartDate) <= new Date(toDate) : true)
  );

  return (
    <div className="grid grid-cols-5">
      {headers.map((header, i) => (
        <div key={i} className="font-black">
          {header}
        </div>
      ))}
      <div></div>

      {filteredResults.map((protocol, i) => (
        <ProtocolListItem {...protocol} key={i} />
      ))}
    </div>
  );
};

export default ProtocolList;
