"use client";

import { useParams } from "next/navigation";
import { FieldErrors, UseFormRegister, useFormContext } from "react-hook-form";
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
};

const InputFields = (props: Props) => {
  const { formId } = useParams();

  let trigger: ((name?: string | string[]) => Promise<boolean>) | undefined;
  try {
    const formContext = useFormContext();
    trigger = formContext?.trigger;
  } catch {
    trigger = undefined;
  }

  const handleChange = async (name: string, value: string) => {
    if (trigger) {
      const isValid = await trigger(name);
      if (!isValid) return;
    }

    if (props.onChange) {
      props.onChange(formId, name, value);
    }
  };

  console.log("props.errorMsg?", props.errorMsg);

  return (
    <>
      {props.inputsData.map(
        ({ label, name, placeholder, type, defaultValue }) => {
          console.log("name", name);
          console.log("prop", props.errorMsg?.[name]?.message as string);

          const registerField = props.register(name);
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
                defaultValue={defaultValue ?? ""}
                {...props.register(name, {
                  onChange: (e) => handleChange(name, e.target.value),
                })}
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
