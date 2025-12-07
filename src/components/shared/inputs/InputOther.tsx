"use client";

import { FieldValues, UseFormSetValue } from "react-hook-form";

type Props = {
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  isRadioValue: boolean;
  value: string;
  label?: string;
};

const InputOther = (props: Props) => {
  return (
    <div>
      <label className="text-lg block text-xl !important">{props.label}</label>
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
        className="border px-2 py-1"
      />
    </div>
  );
};

export default InputOther;
