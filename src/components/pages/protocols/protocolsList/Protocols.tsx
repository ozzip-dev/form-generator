"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { useState } from "react";
import ProtocolList from "./ProtocolList";
import ProtocolListFilters from "../ProtocolListFilters";
import { filtersDefault, ProtocolFilters } from "../utils";

type Props = {
  protocols: ProtocolSerialized[];
};

const Protocols = ({ protocols }: Props) => {
  const [filters, setFilters] = useState<ProtocolFilters>(filtersDefault);

  return (
    <div className="p-8">
      <ProtocolListFilters filters={filters} setFilters={setFilters} />
      <ProtocolList filters={filters} protocols={protocols} />
    </div>
  );
};

export default Protocols;
