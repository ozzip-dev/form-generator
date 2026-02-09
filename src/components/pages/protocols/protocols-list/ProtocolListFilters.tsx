"use client";

import { Button, InputFields } from "@/components/shared";
import Card from "@/components/shared/Card";
import { SelectFieldControler } from "@/components/shared/inputs/select-field/SelectFieldController";
import { FormProvider, useForm } from "react-hook-form";
import { filtersDefault, ProtocolFilters } from "../utils";

const dataSearchInput = [
  {
    floatingLabel: "Szukaj:",
    name: "text",
    type: "text",
  },
];

const dataDatesInputs = [
  {
    floatingLabel: "Spory od:",
    name: "fromDate",
    type: "date",
  },
  {
    floatingLabel: "Spory do:",
    name: "toDate",
    type: "date",
  },
];

const dataSelectOptions = [
  { label: "Od najstarszych", value: "ascending" },
  { label: "Od najnowszych", value: "descending" },
];

type Props = {
  filters: ProtocolFilters;
  setFilters: (filters: ProtocolFilters) => void;
};

const ProtocolListFilters = ({ filters, setFilters }: Props) => {
  const methods = useForm({
    defaultValues: {},
  });

  const { register } = methods;

  const onFilterChange = (name: string, value: string): void => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <Card className="mb-10">
      <FormProvider {...methods}>
        <form>
          <InputFields
            inputsData={dataSearchInput}
            register={register}
            onChange={onFilterChange}
          />
          <div className="sm:flex sm:flex-wrap gap-2 lg:gap-8 sm:items-center sm:justify-center">
            <InputFields
              inputsData={dataDatesInputs}
              register={register}
              onChange={onFilterChange}
            />{" "}
            <div className="sm:w-[15rem]">
              <SelectFieldControler
                name="sortOrder"
                defaultValue="ascending"
                options={dataSelectOptions}
                onChangeAction={onFilterChange}
              />
            </div>
            <Button
              message="Resetuj filtry"
              variant="primary-rounded"
              onClickAction={() => setFilters(filtersDefault)}
              className="w-full sm:w-fit"
            />
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

export default ProtocolListFilters;
