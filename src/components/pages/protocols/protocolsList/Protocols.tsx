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
  const headers = [
    "Branża",
    "Nazwa związku",
    "Nazwa zakładu",
    "Początek sporu",
  ];

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
          <div className="hidden md:flex md:w-4/5 sticky top-0 bg-white">
            {headers.map((header, idx) => (
              <div key={idx} className="font-bold flex-1">
                {header}
              </div>
            ))}
          </div>
          <ProtocolList filters={filters} protocols={protocols} />
        </SuspenseErrorBoundary>{" "}
      </div>
    </div>
  );
};

export default Protocols;
