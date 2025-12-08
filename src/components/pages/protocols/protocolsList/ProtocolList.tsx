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
    <>
  {/* //     {filteredResults.map((protocol, i) => (
  //       <ProtocolListItem {...protocol} key={i} />
  //     ))} */}

      {protocols.map(({ _id, branch, tradeUnionName, workplaceName, uploadedAt }, i) => (
        <div key={i}>
          <span>
            {branch} {tradeUnionName} {workplaceName} {formatDateAndTime(uploadedAt)}
          </span>
          {" "}
          <Link href={`/protocols/${_id}`}><b>Edytuj</b></Link>      
        </div>
      ))}
    </>
  );
};

export default ProtocolList;
