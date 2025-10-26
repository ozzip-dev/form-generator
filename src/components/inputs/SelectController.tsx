"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import Select from "./Select";

type Option = { label: string; value: string };

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
  defaultValue?: string;
};

export const SelectControler = <T extends FieldValues>(props: Props<T>) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          options={props.options}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          errorMsg={fieldState.error?.message}
        />
      )}
    />
  );
};
