"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import InputError from "./InputError";
import { useRef } from "react";
import { useParams } from "next/navigation";

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
  register?: UseFormRegister<any>;
  onChange?: any;
};

const InputFields = (props: Props) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { formId } = useParams();
  console.log("inp", debounceRef);

  return (
    <>
      {props.inputsData.map(
        ({ label, name, placeholder, type, defaultValue }) => {
          return (
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
                // {...(props.register ? props.register(name as string) : {})}

                {...(props.register
                  ? props.register(name, {
                      onChange: props.onChange
                        ? (e) => props.onChange(formId, name, e.target.value)
                        : undefined,
                    })
                  : {})}
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
