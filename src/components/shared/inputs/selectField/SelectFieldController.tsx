"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import SelectField from "./SelectField";
import { useEffect, useState } from "react";
import { Loader } from "@/components/shared";

type Option = { label: string; value: string };

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  onChangeAction?: (name: string, value: string) => void | Promise<void>;
  variant?: "horizontal";
  className?: string;
};

export const SelectFieldControler = <T extends FieldValues>(
  props: Props<T>,
) => {
  const { control } = useFormContext();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState }) => (
        <SelectField
          name={props.name}
          value={field.value}
          defaultValue={props.defaultValue}
          label={props.label}
          options={props.options}
          placeholder={props.placeholder}
          errorMsg={fieldState.error?.message}
          className={props.className}
          onChange={(val: any) => {
            field.onChange(val);
            props.onChangeAction?.(props.name, val);
          }}
        />
      )}
    />
  );
};
