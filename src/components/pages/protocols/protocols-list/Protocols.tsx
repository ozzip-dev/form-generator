"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { useState } from "react";
import ProtocolList from "./ProtocolList";
import ProtocolListFilters from "./ProtocolListFilters";
import { filtersDefault, ProtocolFilters } from "../utils";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";
import { Button } from "@/components/shared";

type Props = {
  protocols: ProtocolSerialized[];
};

const Protocols = ({ protocols }: Props) => {
  const [filters, setFilters] = useState<ProtocolFilters>(filtersDefault);
  const [areOpenFilters, setAreOpenFilters] = useState(false);

  const areActiveFilters = Object.values(filters).filter(
    (item) => item !== "",
  ).length;

  if (!protocols || protocols.length == 0)
    return (
      <div className="container text-center text-error">
        Brak zapisanych protokołów
      </div>
    );

  return (
    <div className="container relative flex h-full overflow-y-hidden">
      <Button
        message={areActiveFilters > 1 ? "Filtry aktywne" : "Filtruj"}
        variant="primary-rounded"
        className="!absolute right-12 !z-20 h-fit !text-xs lg:hidden"
        onClickAction={() => setAreOpenFilters((prev) => !prev)}
      />

      <div
        className={`fixed left-4 top-[6.9rem] z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${areOpenFilters ? "translate-x-0" : "-translate-x-[150%]"} `}
      >
        <ProtocolListFilters
          filters={filters}
          setFilters={setFilters}
          setAreOpenFilters={setAreOpenFilters}
        />
      </div>

      {areOpenFilters && (
        <div
          className="fixed inset-0 z-30 backdrop-blur-sm lg:hidden"
          onClick={() => setAreOpenFilters(false)}
        />
      )}

      <div className="mr-14 hidden overflow-y-auto lg:block">
        <ProtocolListFilters filters={filters} setFilters={setFilters} />
      </div>
      <div className="min-h-0 flex-1 overflow-y-scroll">
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
