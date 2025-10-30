"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import DataLoader from "../ui/loaders/DataLoader";
import InputError from "./InputError";

type Props = {
  inputsData: {
    label?: string;
    name: string;
    placeholder?: string;
    type: string;
    defaultValue?: string;
  }[];
  errorMsg?: FieldErrors<any> & {
    server?: Record<string, { message: string }>;
  };
  register: UseFormRegister<any>;
  onChange?: any;
  isLoading?: Record<string, boolean>;
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
              <div className="flex">
                <input
                  type={type}
                  id={name}
                  disabled={props.isLoading?.[name]}
                  className={`w-full border-b-2 border-gray-300 focus:border-accent focus:outline-none px-2 py-1
                    ${
                      props.isLoading?.[name]
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  `}
                  placeholder={placeholder}
                  {...props.register(
                    name,
                    props.onChange && {
                      onChange: (e) => props.onChange(name, e.target.value),
                    }
                  )}
                />

                {props.isLoading?.[name] && <DataLoader size="sm" />}
              </div>

              {/* {JSON.stringify(props.errorMsg)} */}

              <InputError
                errorMsg={
                  (props.errorMsg?.[name]?.message as string) ||
                  (props.errorMsg as any)?.message
                }
              />
            </div>
          );
        }
      )}
    </>
  );
};

export default InputFields;
