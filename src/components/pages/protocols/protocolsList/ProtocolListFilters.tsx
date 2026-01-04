"use client";

import { ChangeEvent } from "react";
import {
  filtersDefault,
  mapSortOrder,
  ProtocolFilters,
  SortOrder,
} from "../utils";
import { Button } from "@/components/shared";

type Props = {
  filters: ProtocolFilters;
  setFilters: (filters: ProtocolFilters) => void;
};

const dateFilters: { key: "fromDate" | "toDate"; staticLabel: string }[] = [
  {
    key: "fromDate",
    staticLabel: "Spory od:",
  },
  {
    key: "toDate",
    staticLabel: "Spory do:",
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
        shadow-border-box p-md
        mb-md
      "
    >
      <div className="text-center">Filtry</div>

      <label className="flex w-full" htmlFor={filters.text}>
        <div>Szukaj</div>
        <input
          className="w-full"
          type="text"
          value={filters.text}
          onChange={(e) => onFilterChange(e, "text")}
        />
      </label>

      <div className="grid grid-cols-[repeat(2,1fr)_150px_1fr] gap-6 items-center">
        {dateFilters.map(({ key, staticLabel }, i) => (
          <div key={i}>
            <div>
              {staticLabel} {filters[key]}
            </div>
            <input type="date" onChange={(e) => onFilterChange(e, key)} />
          </div>
        ))}

        <Button
          message="Resetuj filtry"
          className="btn btn-primary-rounded !py-3 !px-6"
          onClickAction={() => setFilters(filtersDefault)}
        ></Button>

        <label className="block" htmlFor="sortOrder">
          <select
            name="sortOrder"
            id="sortOrder"
            onChange={(e) => onFilterChange(e, "sortOrder")}
          >
            {[SortOrder.Ascending, SortOrder.Descending].map((order, i) => (
              <option value={order} key={i}>
                {mapSortOrder[order]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default ProtocolListFilters;
