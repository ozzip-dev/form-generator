"use client";

import { ChangeEvent } from "react";
import ButtonClick from "@/components/ui/buttons/ButtonClick";
import { fileExtensionMap, filtersDefault, ProtocolFilters } from "./utils";

type Props = {
  filters: ProtocolFilters,
  setFilters: (filters: ProtocolFilters) => void
}

const ProtocolListFilters = ({filters, setFilters} : Props) => {
  const onFilterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    key: 'type' | 'name'
  ): void => {
    setFilters({
      ...filters,
      [key]: e.target.value
    })
  }

  const extensions = Object.values(fileExtensionMap)

  return (
    <div className="
      grid grid-rows-[30px_auto] grid-cols-[8rem_17rem_10rem] gap-3 items-center
      p-2 mb-5
      bg-slate-200
    ">
      <div className="text-center font-black" style={{gridColumn: '1 / 4'}}>Filtry</div>

      <label htmlFor={filters.type}>
        <span>typ: </span>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange(e, 'type')}
          >
          <option value="">---</option>
          {extensions.map((item, i) => (
            <option value={item} key={i}>{item}</option>
          ))}
        </select>
      </label>

      <label className="block" htmlFor={filters.name}>
        <span>nazwa: </span>
        <input
          type="text"
          value={filters.name}
          onChange={(e) => onFilterChange(e, 'name')}
        />
      </label>

      <ButtonClick
        message="Resetuj filtry"
        onClickAction={() => setFilters(filtersDefault)}>
      </ButtonClick>
    </div>
  );
};

export default ProtocolListFilters;
