"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { isAscending, ProtocolFilters } from "../utils";
import ProtocolListItem from "./ProtocolListItem";
import ResponsiveListHeader from "@/components/shared/responsiveList/ResponsiveListHeader";
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
      <div className="bg-white w-full sticky top-0 z-10">
        <div className="md:flex">
          <ResponsiveListHeader headers={headers} />
          <div className="md:w-[27rem]"></div>
        </div>
      </div>

      <div className="my-8 text-sm flex-1 flex flex-col gap-4 ">
        {filteredResults.map((protocol, idx) => {
          return <ProtocolListItem key={idx} protocol={protocol} />;
        })}
      </div>
    </>
  );
};

export default ProtocolList;
