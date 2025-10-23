"use client";

import React from "react";
import { FormType } from "@/enums/form";
import { UseFormRegister } from "react-hook-form";

type Props = {
  register?: UseFormRegister<any>;
};

const formTypeOptionsCheck: { value: FormType; label: string }[] = [
  { value: FormType.Inspector, label: "Wybór inspektora pracy" },
  { value: FormType.Strike, label: "Referendum strajkowe" },
  { value: FormType.Other, label: "Inne" },
];

const FormTypeSelect: React.FC<Props> = (props: Props) => {
  return (
    <fieldset aria-label="Form type">
      <div className="block mb-2 text-lg">Typ formularza</div>
      {formTypeOptionsCheck.map(({ value, label }) => (
        <label key={value} className="block mb-2">
          <input
            type="radio"
            value={value}
            className="mr-2"
            {...(props.register
              ? props.register("type", {
                  required: true,
                  value: value,
                })
              : {})}
          />{" "}
          {label}
        </label>
      ))}
    </fieldset>
  );
};

export default FormTypeSelect;
