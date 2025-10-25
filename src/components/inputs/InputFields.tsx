"use client";

import { useParams } from "next/navigation";
import { FieldErrors, UseFormRegister, useFormContext } from "react-hook-form";
import InputError from "./InputError";
import DataLoader from "../ui/loaders/DataLoader";

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
  // let trigger: ((name?: string | string[]) => Promise<boolean>) | undefined;
  // try {
  //   const formContext = useFormContext();
  //   trigger = formContext?.trigger;
  // } catch {
  //   trigger = undefined;
  // }

  // const handleChange = async (name: string, value: string) => {
  //   if (trigger) {
  //     const isValid = await trigger(name);
  //     if (!isValid) return;
  //   }

  //   if (props.onChange) {
  //     props.onChange(name, value);
  //   }
  // };

  const formContext = useFormContext();
  const trigger = formContext?.trigger;

  const handleChange = async (name: string, value: string) => {
    if (!trigger) return;

    // ✅ używamy walidacji react-hook-form
    const isValid = await trigger(name);
    if (!isValid) return; // ❌ jeśli walidacja nie przeszła, nie wysyłamy

    // ✅ tylko wtedy, gdy dane są poprawne
    props.onChange?.(name, value);
  };

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
                  {...props.register(name, {
                    onChange: (e) => {
                      const value = e.target.value;
                      const inputName = name;
                      handleChange(inputName, value);
                    },
                  })}
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

export default InputFields;
