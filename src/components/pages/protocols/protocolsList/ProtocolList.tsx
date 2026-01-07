"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { isAscending, ProtocolFilters } from "../utils";
import ProtocolListItem from "./ProtocolListItem";
import { FullscreenLoader } from "@/components/shared";
import { useState } from "react";

type Props = {
  filters: ProtocolFilters;
  protocols: ProtocolSerialized[];
};

const headers = ["Branża", "Nazwa związku", "Nazwa zakładu", "Data sporu"];

const ProtocolList = ({
  filters: { text = "", fromDate, toDate, sortOrder },
  protocols,
}: Props) => {
  const [isPending, setPending] = useState(false);

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
    <div className="text-sm">
      <div className="hidden md:flex md:w-4/6">
        {headers.map((header, idx) => (
          <div key={idx} className="font-bold flex-1">
            {header}
          </div>
        ))}
      </div>

      {filteredResults.map((protocol, idx) => {
        return <ProtocolListItem key={idx} protocol={protocol} />;
      })}
    </div>
  );
};

export default ProtocolList;
