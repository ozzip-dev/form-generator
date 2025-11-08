"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import SelectField from "./SelectField";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loaders/Loader";

type Option = { label: string; value: string };

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  onChangeAction?: (name: string, value: string) => void | Promise<void>;
};

export const SelectFieldControler = <T extends FieldValues>(
  props: Props<T>
) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!isLoading) {
    return <Loader />;
  }

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <SelectField
          name={props.name}
          value={field.value}
          defaultValue={props.defaultValue}
          label={props.label}
          options={props.options}
          placeholder={props.placeholder}
          errorMsg={fieldState.error?.message}
          onChange={(val: any) => {
            field.onChange(val);
            props.onChangeAction?.(props.name, val);
          }}
        />
      )}
    />
  );
};
