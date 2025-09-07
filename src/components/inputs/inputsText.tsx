"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";

type Props = {
  inputsData: {
    label: string;
    name: string;
    placeholder: string;
    type: string;
    defaultValue?: string;
  }[];
  errorMsg?: FieldErrors<any> & {
    server?: Record<string, { message: string }>;
  };
  register?: UseFormRegister<any>;
};

const InputsText = ({ inputsData, register, errorMsg }: Props) => {
  return (
    <>
      {inputsData.map(({ label, name, placeholder, type }) => {
        return (
          <div key={name}>
            <label htmlFor={name} className="text-lg  block">
              {label}
            </label>
            <input
              type={type}
              id={name}
              className="w-full max-w-xs border-b-2 border-gray-300 focus:border-accent focus:outline-none px-2 py-1"
              placeholder={placeholder}
              // defaultValue={defaultValue}
              {...(register ? register(name as string) : {})}
            />
            <div className="text-xs text-danger h-4">
              {errorMsg?.[name]?.message as string}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default InputsText;
