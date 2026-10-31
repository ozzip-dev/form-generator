"use client";

import { FieldValues, UseFormSetValue } from "react-hook-form";

type Props = {
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  isRadioValue: boolean;
  value: string;
  label?: string;
};

const InputRadioOther = (props: Props) => {
  return (
    <div className="group gap-3 md:flex md:items-center">
      {props.label && (
        <label
          htmlFor={props.name}
          className="block pb-1 !text-base transition-colors duration-200 group-focus-within:text-accent md:pb-0"
        >
          {props.label}
        </label>
      )}
      <input
        id={props.name}
        aria-label={`Podaj inną odpowiedź ${props.label || props.name}`}
        type="text"
        value={props.isRadioValue ? "" : props.value || ""}
        placeholder="Inna odpowiedź"
        onChange={(e) => {
          props.setValue(props.name, e.target.value, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
        className="rounded-sm border border-gray p-3 focus:border-accent focus:outline-none"
      />
    </div>
  );
};

export default InputRadioOther;
