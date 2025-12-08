"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { mapFileExtensionName, ProtocolFilters } from "../utils";
import ProtocolListItem from "./ProtocolListItem";

type Props = {
  filters: ProtocolFilters;
  protocols: ProtocolSerialized[];
};

const ProtocolList = ({ filters, protocols }: Props) => {
  const filteredResults = protocols.filter(
    ({ name, type }) =>
      name.includes(filters.name) &&
      mapFileExtensionName(type).includes(filters.type)
  );

  return (
    <>
      {filteredResults.map((protocol, i) => (
        <ProtocolListItem {...protocol} key={i} />
      ))}
    </>
  );
};

export default ProtocolList;
