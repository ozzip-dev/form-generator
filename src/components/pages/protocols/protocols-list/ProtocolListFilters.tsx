"use client";

import { Button, Card, InputFields } from "@/components/shared";
import { SelectFieldControler } from "@/components/shared/inputs/select-field/SelectFieldController";
import { FormProvider, useForm } from "react-hook-form";
import { filtersDefault, mapDisputeReason, ProtocolFilters } from "../utils";
import { useEffect } from "react";
import FloatingLabel from "@/components/shared/inputs/input-fields/FloatingLabel";

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

const disputeReasonOptions = Object.entries(mapDisputeReason).map(
  ([key, label]) => ({
    label,
    value: key,
  }),
);

type Props = {
  filters: ProtocolFilters;
  setFilters: (filters: ProtocolFilters) => void;
};

const ProtocolListFilters = ({ filters, setFilters }: Props) => {
  const methods = useForm({
    defaultValues: filters,
  });

  const { register, reset } = methods;

  useEffect(() => {
    reset(filters);
  }, [filters, reset]);

  const onFilterChange = (name: string, value: string): void => {
    console.log(name, value);
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
          <div className="gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center lg:gap-8">
            <InputFields
              inputsData={dataDatesInputs}
              register={register}
              onChange={onFilterChange}
            />{" "}
            <div className="relative w-[15rem]">
              <FloatingLabel
                name="disputeReason"
                floatingLabel="Przyczyna sporu"
                required={false}
              />
              <SelectFieldControler
                name="disputeReason"
                defaultValue=""
                options={[
                  { label: "Wybierz", value: "" },
                  ...disputeReasonOptions,
                ]}
                onChangeAction={onFilterChange}
                className="sm:!mt-0 sm:!pb-0"
              />
            </div>
            <div className="relative ml-0 sm:ml-sm sm:w-[15rem]">
              <FloatingLabel
                name="sortOrder"
                floatingLabel="Sortuj"
                required={false}
              />
              <SelectFieldControler
                name="sortOrder"
                defaultValue="ascending"
                options={dataSelectOptions}
                onChangeAction={onFilterChange}
                className="sm:!mt-0 sm:!pb-0"
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
