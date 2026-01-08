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
    <div className="container h-full flex flex-col">
      <div className="shrink-0">
        <ProtocolListFilters filters={filters} setFilters={setFilters} />
      </div>
      <div className="flex-1 min-h-0  overflow-y-scroll">
        <SuspenseErrorBoundary
          size="lg"
          errorMessage="Brak danych list protokołów"
        >
          <ProtocolList filters={filters} protocols={protocols} />
        </SuspenseErrorBoundary>{" "}
      </div>
    </div>
  );
};

export default Protocols;
