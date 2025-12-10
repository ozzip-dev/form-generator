"use client";

import { ChangeEvent } from "react";
import { filtersDefault, ProtocolFilters } from "../utils";
import { Button } from "@/components/shared";

type Props = {
  filters: ProtocolFilters;
  setFilters: (filters: ProtocolFilters) => void;
};

const dateFilters: { key: "fromDate" | "toDate"; label: string }[] = [
  {
    key: "fromDate",
    label: "Spory od:",
  },
  {
    key: "toDate",
    label: "Spory do:",
  },
];

const ProtocolListFilters = ({ filters, setFilters }: Props) => {
  const onFilterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    key: keyof ProtocolFilters
  ): void => {
    setFilters({
      ...filters,
      [key]: e.target.value,
    });
  };

  return (
    <div
      className="
      grid grid-rows-[30px_auto] grid-cols-[repeat(4,13rem)] gap-3 items-center
      p-2 mb-5
      bg-slate-200
    "
    >
      <div className="text-center font-black" style={{ gridColumn: "1 / 5" }}>
        Filtry
      </div>

      <label className="block" htmlFor={filters.text}>
        <span>Szukaj</span>
        <input
          type="text"
          value={filters.text}
          onChange={(e) => onFilterChange(e, "text")}
        />
      </label>

      {dateFilters.map(({ key, label }, i) => (
        <div key={i} className="  ">
          <div>
            {label} {filters[key]}
          </div>
          <input type="date" onChange={(e) => onFilterChange(e, key)} />
        </div>
      ))}

      <Button
        message="Resetuj filtry"
        onClickAction={() => setFilters(filtersDefault)}
      ></Button>
    </div>
  );
};

export default ProtocolListFilters;
