"use client";

import { ChangeEvent } from "react";
import { Button } from "@/components/shared";

type Props = {
  filterText: string;
  setFilterText: (filter: string) => void;
};

const ContactFilters = ({ filterText, setFilterText }: Props) => {
  const onFilterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ): void => {
    setFilterText(e.target.value);
  };

  return (
    <div
      className="
      flex items-center gap-8
      p-2 mb-5
      bg-slate-200
    "
    >
      <label htmlFor={filterText}>
        <span>Szukaj: </span>
        <input
          type="text"
          value={filterText}
          onChange={onFilterChange}
        />
      </label>

      <Button
        className="w-40"
        message="Wyczyść"
        onClickAction={() => setFilterText('')}
      ></Button>
    </div>
  );
};

export default ContactFilters;
