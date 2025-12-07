"use client";

import { OPTION_OTHER } from "@/helpers/inputHelpers";
import { useFormContext } from "react-hook-form";
import InputError from "../InputError";
import InputRadioOther from "./InputRadioOther";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  options: Option[];
  className?: string;
  optionClass?: string;
  errorMsg?: any;
};

const RadioGroupField = (props: Props) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const value = watch(props.name);
  const errorMsg = (errors[props.name]?.message as string) || "";

  const radioLabels = props.options
    .filter((o) => o.value !== OPTION_OTHER)
    .map((o) => o.label);

  const isRadioValue = radioLabels.includes(value);

  return (
    <div className="flex flex-col py-5">
      {props.label && (
        <label className="text-xl">
          {props.label}
          {props.required && <span className="text-red-600">*</span>}
        </label>
      )}

      {props.description && <div className="text-sm">{props.description}</div>}

      <div className={props.className}>
        {props.options.map((option) => {
          const isOther = option.value === OPTION_OTHER;
          const isChecked = !isOther && value === option.label;

          return (
            <div key={option.value} className="flex gap-4 items-center">
              {isOther ? (
                <InputRadioOther
                  label={option.label}
                  name={props.name}
                  setValue={setValue}
                  isRadioValue={isRadioValue}
                  value={value}
                />
              ) : (
                <label className={props.optionClass} data-checked={isChecked}>
                  <input
                    type="radio"
                    value={option.label}
                    checked={isChecked}
                    className="hidden"
                    onChange={() => {
                      setValue(props.name, option.label, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                  />
                  <span>{option.label}</span>
                </label>
              )}
            </div>
          );
        })}
      </div>

      <InputError
        errorMsg={
          props.errorMsg?.[props.name]?.message ||
          (props.errorMsg as any)?.message ||
          errorMsg
        }
      />
    </div>
  );
};

export default RadioGroupField;
