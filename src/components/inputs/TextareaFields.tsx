"use client";

import { FieldErrors, UseFormRegister, Path } from "react-hook-form";
import DataLoader from "../ui/loaders/DataLoader";
import InputError from "./InputError";

type Props = {
  inputsData: {
    label?: string;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    description?: string;
    required?: string;
  }[];
  errorMsg?: FieldErrors<any> & {
    server?: Record<string, { message: string }>;
  };
  register?: UseFormRegister<any>;
  onChange?: (name: string, value: string) => void | Promise<void>;
  isLoading?: Record<string, boolean>;
};

const TextareaFields = (props: Props) => {
  return (
    <>
      {props.inputsData.map(
        ({ label, name, placeholder, defaultValue, description, required }) => {
          return (
            // TODO: make a separate component for input field
            <div key={name}>
              {label && (
                <label
                  htmlFor={name}
                  className="text-lg block text-xl !important"
                >
                  {label} {required && <span className="text-red-600">*</span>}
                </label>
              )}

              {description && <div className="text-sm">{description}</div>}
              <div className="flex">
                <textarea
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
                  {...(props.register
                    ? props.register(name, {
                        onChange: (e) => props.onChange?.(name, e.target.value),
                      })
                    : {})}
                />

                {props.isLoading?.[name] && <DataLoader size="sm" />}
              </div>

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

export default TextareaFields;
