"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { isAscending, ProtocolFilters } from "../utils";
import ProtocolListItem from "./ProtocolListItem";
import ListHeader from "@/components/shared/responsiveList/ListHeader";
const headers = ["Branża", "Nazwa związku", "Nazwa zakładu", "Początek sporu"];

type Props = {
  filters: ProtocolFilters;
  protocols: ProtocolSerialized[];
};

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
    <>
      <ListHeader headers={headers} />
      <div className="my-8 text-sm flex-1 flex flex-col gap-4 ">
        {filteredResults.map((protocol, idx) => {
          return <ProtocolListItem key={idx} protocol={protocol} />;
        })}
      </div>
    </>
  );
};

export default ProtocolList;
