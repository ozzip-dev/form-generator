"use client";

import { ChangeEvent } from "react";
import { Button, InputFields } from "@/components/shared";
import { useForm } from "react-hook-form";
import Card from "@/components/shared/Card";

const dataSearchInput = [
  {
    floatingLabel: "Szukaj:",
    name: "text",
    type: "text",
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
    <Card>
      <InputFields
        inputsData={dataSearchInput}
        register={register}
        onChange={onFilterChange}
      />
    </Card>
  );
};

export default ContactFilters;
