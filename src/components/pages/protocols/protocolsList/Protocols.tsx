"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { useState } from "react";
import ProtocolList from "./ProtocolList";
import ProtocolListFilters from "./ProtocolListFilters";
import { filtersDefault, ProtocolFilters } from "../utils";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";

type Props = {
  protocols: ProtocolSerialized[];
};

const Protocols = ({ protocols }: Props) => {
  const [filters, setFilters] = useState<ProtocolFilters>(filtersDefault);

  return (
    <div className="container">
      <ProtocolListFilters filters={filters} setFilters={setFilters} />
      <SuspenseErrorBoundary
        size="lg"
        errorMessage="Brak danych list protokołów"
      >
        <ProtocolList filters={filters} protocols={protocols} />
      </SuspenseErrorBoundary>
    </div>
  );
};

export default Protocols;
