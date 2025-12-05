"use client";

import { useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";
import InputError from "./InputError";
import { isOptionOther, OPTION_OTHER } from "@/helpers/inputHelpers";
import OtherOptionInput from "./selectField/OtherOptionInput";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  value?: string;
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
    setValue,
  } = useFormContext();
  // TODO: jakos prosciej
  const [optionClicked, setOptionClicked] = useState<string>('')

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
          const isOtherSelected = optionClicked == OPTION_OTHER;
          const isChecked = isOptionOther(option) ? optionClicked == OPTION_OTHER : selected === option.label;

          return (
            <div
              key={option.value}
              className="flex gap-4 items-center"
            >
              <label
                className={props.optionClass}
                data-checked={isChecked}
              >
                <input
                  {...register(props.name)}
                  type="radio"
                  value={option.label}
                  className="hidden"
                  onClick={() => setOptionClicked(option.value)}
                />
                <span>{option.label}</span>
              </label>

              {isOptionOther(option) &&   
                <OtherOptionInput
                  name={props.name}
                  setValue={setValue}
                  disabled={!isOtherSelected}  
                />
              }
            </div>
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
