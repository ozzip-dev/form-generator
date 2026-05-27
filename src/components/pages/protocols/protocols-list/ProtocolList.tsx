"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { isAscending, ProtocolFilters } from "../utils";
import ProtocolListItem from "./ProtocolListItem";
import ResponsiveListHeader from "@/components/shared/responsive-list/ResponsiveListHeader";

const headers = ["Branża", "Związek", "Zakład", "Rozpoczęcie", "Przyczyna"];

type Props = {
  filters: ProtocolFilters;
  protocols: ProtocolSerialized[];
};

const ProtocolList = ({
  filters: { text = "", fromDate, toDate, sortOrder, disputeReason = "" },
  protocols,
}: Props) => {
  const getDisputeTime = (protocol: ProtocolSerialized) =>
    new Date(protocol.disputeStartDate).getTime();

  const isSearchTextEqual = (
    searchText: string,
    branch: string = "",
    tradeUnionName: string = "",
    workplaceName: string = "",
  ) =>
    [branch, tradeUnionName, workplaceName]
      .map((protocolText) => protocolText.toLowerCase())
      .some((protocolText) => protocolText.includes(searchText.toLowerCase()));

  const filteredResults = protocols
    .filter(
      ({
        branch,
        tradeUnionName,
        workplaceName,
        disputeStartDate,
        disputeReason: protocolDisputeReason,
      }) =>
        isSearchTextEqual(text, branch, tradeUnionName, workplaceName) &&
        (fromDate ? new Date(disputeStartDate) >= new Date(fromDate) : true) &&
        (toDate ? new Date(disputeStartDate) <= new Date(toDate) : true) &&
        (disputeReason ? protocolDisputeReason[disputeReason] : true),
    )
    .sort((a, b) =>
      isAscending(sortOrder)
        ? getDisputeTime(a) - getDisputeTime(b)
        : getDisputeTime(b) - getDisputeTime(a),
    );

  return (
    <>
      <div className="sticky top-0 z-10 w-full bg-white">
        <div className="md:flex">
          <ResponsiveListHeader headers={headers} />
          <div className="md:w-[15%]"></div>
        </div>
      </div>

      <div className="my-8 flex flex-1 flex-col gap-4 text-sm">
        {filteredResults.length === 0 ? (
          <div className="mt-10 text-center">
            Brak protokołów spełniających kryteria wyszukiwania
          </div>
        ) : (
          filteredResults.map((protocol, idx) => (
            <ProtocolListItem key={idx} protocol={protocol} />
          ))
        )}
      </div>
    </>
  );
};

export default ProtocolList;
