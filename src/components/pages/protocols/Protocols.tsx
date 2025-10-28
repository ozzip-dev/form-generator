"use client";

import { ProtocolSerialized } from "@/types/protocol";
import AddProtocolForm from "./AddProtocolForm";
import ProtocolListFilters from "./ProtocolListFilters";
import { useState } from "react";
import { filtersDefault, ProtocolFilters } from "./utils";
import ProtocolList from "./ProtocolList";

type Props = {
  protocols: ProtocolSerialized[];
};

const Protocols = ({ protocols }: Props) => {
  const [filters, setFilters] = useState<ProtocolFilters>(filtersDefault);

  return (
    <div className="p-8">
      <ProtocolListFilters filters={filters} setFilters={setFilters} />
      <ProtocolList filters={filters} protocols={protocols} />
      <AddProtocolForm />
    </div>
  );
};

export default Protocols;
