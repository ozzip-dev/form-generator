"use client";

import { useFormContext } from "react-hook-form";
import React from "react";
import InputError from "./InputError";

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
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const selected = watch(props.name);
  const errorMsg = (errors[props.name]?.message as string) || "";

  return (
    <div className="flex flex-col py-5">
      {props.label && (
        <label className="text-xl">
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
            >
              <input
                {...register(props.name)}
                type="radio"
                value={option.value}
                className="hidden"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>

      <InputError
        errorMsg={
          (props.errorMsg?.[props.name]?.message as string) ||
          (props.errorMsg as any)?.message
        }
      />
    </div>
  );
};

export default RadioGroupField;
