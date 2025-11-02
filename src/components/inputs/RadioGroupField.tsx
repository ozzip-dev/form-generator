"use client";

import { useFormContext } from "react-hook-form";
import React from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  description?: string;
  required?: string;
  options: Option[];
  className?: string;
  optionClass?: string;
};

const RadioGroupField = (props: Props) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();

  const selected = watch(props.name);
  const errorMsg = (errors[props.name]?.message as string) || "";

  return (
    <div className="flex flex-col gap-2">
      {props.label && (
        <label className="font-semibold">
          {props.label}{" "}
          {props.required && <span className="text-red-600">*</span>}
        </label>
      )}
      {props.description && <div className="text-sm">{props.description} </div>}

      <div className={props.className}>
        {props.options.map((option) => {
          const isChecked = selected === option.value;

          return (
            <label
              key={option.value}
              className={props.optionClass}
              data-checked={isChecked}
              // onClick={() =>
              //   setValue(name, opt.value, { shouldValidate: true })
              // }
            >
              <input
                {...register(props.name)}
                type="radio"
                value={option.value}
                className="hidden"
                // readOnly
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </div>
  );
};

export default RadioGroupField;
