"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useMemo } from "react";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import InputError from "../InputError";
import InputCheckboxOther from "./InputCheckboxOther";

type CheckboxOption = {
  label: string;
  name: string;
  value?: boolean;
  optionId?: string;
};

type Props<T extends FieldValues> = {
  groupLabel?: string;
  groupDescription?: string;
  required?: boolean;
  name: Path<T>;
  control: Control<T>;
  options: CheckboxOption[];
  className?: string;
  errorMsg?: any;
  onChangeAction?: (
    values: { name: string; value: boolean | string }[]
  ) => void;
};

const CheckboxGroupField = <T extends FieldValues>(props: Props<T>) => {
  const defaultValues = useMemo(
    () =>
      Object.fromEntries(
        props.options.map((opt) => [opt.name, opt.value ?? false])
      ),
    [props.options]
  );

  if (!props.options.length) return null;

  // console.log("props.options", props.options);

  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={defaultValues as any}
      shouldUnregister={false}
      render={({ field, fieldState }) => {
        const selectedValues = (field.value ?? defaultValues) as Record<
          string,
          boolean | string
        >;

        const handleToggle = (name: string) => {
          const newValue = {
            ...selectedValues,
            [name]: !selectedValues[name],
          };

          const arrayValues = Object.entries(newValue).map(([name, val]) => ({
            name,
            value: val,
          }));
          props.onChangeAction?.(arrayValues);

          field.onChange(newValue);
        };

        return (
          <div className={`flex flex-col gap-2 py-5 ${props.className ?? ""}`}>
            {props.groupLabel && (
              <div className="text-xl">
                {props.groupLabel}{" "}
                {props.required && <span className="text-red-600">*</span>}
              </div>
            )}
            {props.groupDescription && (
              <div className="text-sm">{props.groupDescription}</div>
            )}
            {props.options.map(({ name, label, optionId = "" }) => {
              if (optionId === OPTION_OTHER) {
                return (
                  <InputCheckboxOther
                    key={name}
                    name={name}
                    selectedValues={selectedValues}
                    onChange={field.onChange}
                  />
                );
              }

              return (
                <label
                  key={name}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      checked={!!selectedValues[name]}
                      onChange={() => handleToggle(name)}
                      className="peer sr-only"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                  </div>
                  <span className="text-sm">{label}</span>
                </label>
              );
            })}
            <InputError
              errorMsg={
                fieldState.error?.message ||
                (props.errorMsg?.[props.name]?.message as string) ||
                (props.errorMsg as any)?.message
              }
            />
          </div>
        );
      }}
    />
  );
};

export default CheckboxGroupField;
