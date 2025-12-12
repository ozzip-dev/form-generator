"use client";

import { Control, Controller } from "react-hook-form";
import InputError from "../InputError";
import InputCheckboxOther from "./InputCheckboxOther";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import Checkbox from "./Checkbox";

type CheckboxOption = {
  name: string;
  optionId?: string;
  checkboxLabel?: string;
};

type Props = {
  groupLabel?: string;
  groupDescription?: string;
  required?: boolean;
  name: string;
  control: Control<any>;
  options: CheckboxOption[];
  className?: string;
  errorMsg?: any;
};

export default function CheckboxGroupField(props: Props) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={Object.fromEntries(
        props.options.map((option: any) => [option.name, ""])
      )}
      render={({ field, fieldState }) => {
        const selectedValues = field.value;

        const toggle = (name: any) => {
          const newValue = {
            ...selectedValues,
            [name]: selectedValues[name] === "" ? name : "",
          };

          field.onChange(newValue);
        };

        return (
          <div className="flex flex-col gap-3">
            {props.groupLabel && (
              <div className="text-xl">
                {props.groupLabel}
                {props.required && <span className="text-red-600">*</span>}
              </div>
            )}
            {props.groupDescription && (
              <div className="text-sm">{props.groupDescription}</div>
            )}

            {props.options.map(({ name, checkboxLabel, optionId = "" }) => {
              if (optionId === OPTION_OTHER) {
                return (
                  <InputCheckboxOther
                    key={name}
                    label={checkboxLabel}
                    name={name}
                    selectedValues={selectedValues}
                    onChange={field.onChange}
                  />
                );
              }

              return (
                <Checkbox
                  key={name}
                  checkboxLabel={checkboxLabel}
                  name={name}
                  onChange={() => toggle(name)}
                  checkedValue={selectedValues[name]}
                />
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
}
