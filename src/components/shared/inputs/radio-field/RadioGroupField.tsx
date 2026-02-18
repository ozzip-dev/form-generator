"use client";

import { OPTION_OTHER } from "@/helpers/inputHelpers";
import { useFormContext } from "react-hook-form";
import InputError from "../InputError";
import InputRadioOther from "./InputRadioOther";
import InputDescription from "../FormDescription";
import InputIndicators from "../InputIndicators";

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
  hidden: boolean;
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
    <div className="flex flex-col gap-6 text-sm">
      {props.label && (
        <label className="font-bold">
          <span>{props.label}</span>
          <InputIndicators
            required={props.required}
            unique={props.unique}
            hidden={props.hidden}
          />
        </label>
      )}

      {props.description && (
        <InputDescription description={props.description} variant="published" />
      )}

      <div className={`relative flex flex-col gap-6 ${props.className ?? ""}`}>
        {props.options.map((option) => {
          const isOther = option.value === OPTION_OTHER;
          const isChecked = !isOther && value === option.label;

          return (
            <div key={option.value} className="flex flex-col">
              {isOther ? (
                <InputRadioOther
                  label={option.label}
                  name={props.name}
                  setValue={setValue}
                  isRadioValue={isRadioValue}
                  value={value}
                />
              ) : (
                <label className="flex cursor-pointer items-center gap-3">
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

                  <span className="flex h-7 w-7 items-center justify-center rounded-full border transition peer-checked:border-accent peer-checked:bg-accent peer-checked:shadow-[inset_0_0_0_2px_white]"></span>
                  <div className="block w-full text-sm">{option.label}</div>
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
