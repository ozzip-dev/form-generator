"use client";

import { InputFields } from "@/components/shared";
import { InputData, InputType } from "@/enums";
import { useForm } from "react-hook-form";

const dataSearchInput: InputData[] = [
  {
    floatingLabel: "Szukaj:",
    name: "text",
    type: InputType.TEXT,
  },
];

type Props = {
  setFilterText: (filter: string) => void;
};

const ContactFilters = (props: Props) => {
  const { register } = useForm();

  const onFilterChange = (_: string, value: string): void => {
    props.setFilterText(value);
  };

  return (
    <div className="my-md">
      <InputFields
        inputsData={dataSearchInput}
        register={register}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default ContactFilters;
