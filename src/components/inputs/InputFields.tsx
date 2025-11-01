"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import InputError from "./InputError";

type Props = {
  inputsData: {
    label?: string;
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

const InputFields = (props: Props) => {
  return (
    <>
      {props.inputsData.map(
        ({ label, name, placeholder, type, defaultValue }) => {
          return (
            // TODO: make a separate component for input field
            <div key={name}>
              {label && (
                <label htmlFor={name} className="text-lg  block">
                  {label}
                </label>
              )}

              <input
                type={type}
                id={name}
                className="w-full border-b-2 border-gray-300 focus:border-accent focus:outline-none px-2 py-1"
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...(props.register ? props.register(name as string) : {})}
              />

              <InputError
                errorMsg={props.errorMsg?.[name]?.message as string}
              />
            </div>
          );
        }
      )}
    </>
  );
};

export default InputFields;
