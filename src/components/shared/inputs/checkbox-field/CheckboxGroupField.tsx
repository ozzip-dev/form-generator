"use client";

import { Control, Controller } from "react-hook-form";
import InputError from "../InputError";
import InputCheckboxOther from "./InputCheckboxOther";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import Checkbox from "./Checkbox";
import InputDescription from "../FormDescription";
import InputIndicators from "../InputIndicators";

type CheckboxOption = {
  name: string;
  optionId?: string;
  checkboxLabel?: string;
};

type Props = {
  groupLabel?: string;
  groupDescription?: string;
  required?: boolean;
  unique?: boolean;
  name: string;
  control: Control<any>;
  options: CheckboxOption[];
  className?: string;
  errorMsg?: any;
  isSubmitting?: boolean;
  mode?: "horizontal";
  hidden?: boolean;
};

export default function CheckboxGroupField(props: Props) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={Object.fromEntries(
        props.options.map((option) => [option.name, ""]),
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
          <fieldset
            className={`flex w-fit gap-4 flex-col text-sm ${props.mode === "horizontal" ? "md:flex-row" : ""}`}
          >
            {props.groupLabel && (
              <legend className="mb-6 mr-6 font-semibold [display:contents]">

                <div className="flex">
                  {props.groupLabel}
                <InputIndicators
                  required={props.required}
                  unique={props.unique}
                  hidden={props.hidden}
                />
                </div>
                
              </legend>
            )}

            {props.groupDescription && (
              <InputDescription
                description={props.groupDescription}
                variant="published"
              />
            )}
            <div className="relative flex flex-col gap-6">
              {props.options.map(({ name, checkboxLabel, optionId = "" }) => {
                if (optionId === OPTION_OTHER) {
                  return (
                    <InputCheckboxOther
                      key={name}
                      label={checkboxLabel}
                      name={name}
                      selectedValues={selectedValues}
                      onChange={field.onChange}
                      isSubmitting={props.isSubmitting}
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
                    isSubmitting={props.isSubmitting}
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
          </fieldset>
        );
      }}
    />
  );
}
