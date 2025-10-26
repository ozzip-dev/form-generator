"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import SelectField from "./SelectField";

type Option = { label: string; value: string };

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
  defaultValue?: string;
};

export const SelectFieldControler = <T extends FieldValues>(
  props: Props<T>
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <SelectField
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
