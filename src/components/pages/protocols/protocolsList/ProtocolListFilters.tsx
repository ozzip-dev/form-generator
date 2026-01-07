"use client";

import { Button, InputFields } from "@/components/shared";
import Card from "@/components/shared/Card";
import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { FormProvider, useForm } from "react-hook-form";
import { filtersDefault, ProtocolFilters } from "../utils";
import InputField from "@/components/shared/inputs/inputFields/InputField";

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
    <Card>
      <div className="text-center font-bold mb-6">Filtry</div>
      <FormProvider {...methods}>
        <form>
          <InputFields
            inputsData={dataSearchInput}
            register={register}
            onChange={onFilterChange}
          />
          <div className="sm:flex sm:flex-wrap gap-2 sm:items-center sm:justify-center">
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
              className="w-full sm:w-fit sm:mt-3 sm:mb-auto"
            />
          </div>{" "}
          {/* <div className="sm:flex sm:flex-wrap gap-2 md:items-center"></div> */}
        </form>
      </FormProvider>
    </Card>
  );
};

export default ProtocolListFilters;
