"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { mapFileExtensionName, ProtocolFilters } from "../utils";
import ProtocolListItem from "./ProtocolListItem";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import Link from "next/link";

type Props = {
  filters: ProtocolFilters;
  protocols: ProtocolSerialized[];
};

// TODO Pawel: wroc do tego

const ProtocolList = ({ filters, protocols }: Props) => {
  // const filteredResults = protocols.filter(
  //   ({ name, type }) =>
  //     name.includes(filters.name) &&
  //     mapFileExtensionName(type).includes(filters.type)
  // );

  return (
    <div className="grid grid-cols-5">
  {/* //     {filteredResults.map((protocol, i) => (
  //       <ProtocolListItem {...protocol} key={i} />
  //     ))} */}
      <div className="font-black">Branza</div>
      <div className="font-black">Nazwa związku</div>
      <div className="font-black">Nazwa zakładu</div>
      <div className="font-black">Data sporu</div>
      <div></div>
      {protocols.map(({ _id, branch, tradeUnionName, workplaceName, disputeStartDate }, i) => (
        <div key={i} className="contents">
          <div>{branch}</div>
          <div>{tradeUnionName}</div>
          <div>{workplaceName}</div>
          <div>{formatDateAndTime(disputeStartDate)}</div>
          <Link href={`/protocols/${_id}`}><b>Edytuj</b></Link>      
        </div>
      ))}
    </div>
  );
};

export default ProtocolList;
