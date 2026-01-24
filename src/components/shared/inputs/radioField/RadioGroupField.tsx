"use client";

import { OPTION_OTHER } from "@/helpers/inputHelpers";
import { useFormContext } from "react-hook-form";
import InputError from "../InputError";
import InputRadioOther from "./InputRadioOther";
import InputDescription from "../FormDescription";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  unique?: boolean;
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
    <div className="flex flex-col py-5  text-sm">
      {props.label && (
        <label className="font-bold mb-3">
          {props.label}
          {props.required && <span className="text-red-600">*</span>}
        </label>
      )}

      {props.description && (
        <InputDescription description={props.description} variant="published" />
      )}

      <div className={`relative ${props.className}`}>
        {props.options.map((option) => {
          const isOther = option.value === OPTION_OTHER;
          const isChecked = !isOther && value === option.label;

          return (
            <div key={option.value} className="">
              {isOther ? (
                <InputRadioOther
                  label={option.label}
                  name={props.name}
                  setValue={setValue}
                  isRadioValue={isRadioValue}
                  value={value}
                />
              ) : (


                <label
                  className="flex items-center gap-3 mb-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={option.label}
                    checked={isChecked}
                    className="peer hidden"
                    onChange={() =>
                      setValue(props.name, option.label, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  />

                  <span
                    className="
                        w-6 h-6 rounded-full border
                        flex items-center justify-center
                        transition
                        peer-checked:border-accent
                        peer-checked:bg-accent 
                        peer-checked:shadow-[inset_0_0_0_2px_white]
                        ">

                  </span>
                  <div className="block w-full text-sm">
                    {option.label}
                  </div>
                </label>
              )}
            </div>
          );
        })}

        <InputError
          errorMsg={
            props.errorMsg?.[props.name]?.message ||
            (props.errorMsg as any)?.message ||
            errorMsg
          }
        />
      </div>
    </div>
  );
};

export default RadioGroupField;
