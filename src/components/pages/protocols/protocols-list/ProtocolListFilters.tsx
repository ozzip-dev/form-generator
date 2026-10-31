"use client";

import {
  Button,
  Card,
  InputFields,
  SelectFieldController,
  label,
} from "@/components/shared";
import { FormProvider, useForm } from "react-hook-form";
import { filtersDefault, mapDisputeReason, ProtocolFilters } from "../utils";
import { Dispatch, SetStateAction, useEffect } from "react";
import { az } from "zod/v4/locales";
import { InputData, InputType } from "@/enums";

const dataSearchInput: InputData[] = [
  {
    label: "Szukaj:",
    name: "text",
    type: InputType.TEXT,
  },
];

const dataDatesInputs: InputData[] = [
  {
    label: "Spory od:",
    name: "fromDate",
    type: InputType.DATE,
  },
  {
    label: "Spory do:",
    name: "toDate",
    type: InputType.DATE,
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
  setAreOpenFilters?: Dispatch<SetStateAction<boolean>>;
};

const ProtocolListFilters = ({
  filters,
  setFilters,
  setAreOpenFilters,
}: Props) => {
  const methods = useForm({
    defaultValues: filters,
  });

  const { register, reset } = methods;

  const onFilterChange = (name: string, value: string): void => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const resetFilters = () => {
    reset(filtersDefault);
    setFilters(filtersDefault);
    setAreOpenFilters && setAreOpenFilters((prev) => !prev);
  };

  return (
    <Card className="mb-10 overflow-hidden !px-4">
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            resetFilters();
          }}
        >
          <InputFields
            inputsData={dataSearchInput}
            register={register}
            onChange={onFilterChange}
          />
          <InputFields
            inputsData={dataDatesInputs}
            register={register}
            onChange={onFilterChange}
          />{" "}
          <div className="relative mt-6">
            <label
              name="disputeReason"
              label="Przyczyna sporu"
              required={false}
            />
            <SelectFieldController
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
          <div className="relative mt-12">
            <label name="sortOrder" label="Sortuj" required={false} />
            <SelectFieldController
              name="sortOrder"
              defaultValue="ascending"
              options={dataSelectOptions}
              onChangeAction={onFilterChange}
              className="sm:!mt-0 sm:!pb-0"
            />
          </div>
          <Button
            type="submit"
            variant="primary-rounded"
            className="mb-[1.7rem] mt-12 w-full"
          >
            {" "}
            Resetuj filtry
          </Button>
        </form>
      </FormProvider>
    </Card>
  );
};

export default ProtocolListFilters;
