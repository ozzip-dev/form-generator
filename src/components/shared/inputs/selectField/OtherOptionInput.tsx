"use client";

import { FieldValues, UseFormSetValue } from "react-hook-form";

type Props = {
  name: string
  setValue: UseFormSetValue<FieldValues>
  disabled: boolean
}

const OtherOptionInput = (props: Props) => {
  return (
    <input 
      type="text"
      onChange={(e) => props.setValue(props.name, e.target.value)}
      disabled={props.disabled}
    />
  );
};
export default OtherOptionInput;
