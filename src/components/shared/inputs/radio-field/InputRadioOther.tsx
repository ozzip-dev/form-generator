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
    <div className="w-full">
      {props.label && <label className="block">{props.label}</label>}
      <input
        type="text"
        value={props.isRadioValue ? "" : props.value || ""}
        placeholder="Inna odpowiedź"
        onChange={(e) => {
          props.setValue(props.name, e.target.value, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
        className="w-full rounded-sm border p-3 focus:border-accent focus:outline-none"
      />
    </div>
  );
};

export default InputRadioOther;
