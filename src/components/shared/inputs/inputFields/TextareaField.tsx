import { UseFormRegister } from "react-hook-form";
import DataLoader from "../../loaders/DataLoader";
import InputError from "../InputError";
import FloatingLabel from "./FloatingLabel";
import { useState } from "react";

type Props = {
  inputData: {
    label?: string;
    name: string;
    placeholder?: string;
    type: string;
    description?: string;
    required?: boolean;
  };
  register?: UseFormRegister<any>;
  onChange?: (name: string, value: string, meta?: any) => void | Promise<void>;
  isLoading?: Record<string, boolean>;
  default?: Record<string, string>;
  error?: any;
  floatingLabel?: string;
};

const TextareaField = (props: Props) => {
  const { name, placeholder, type, required } = props.inputData;
  const [charCount, setCharCount] = useState(
    props.default?.[name]?.length ?? 0
  );

  return (
    <div className="">
      <textarea
        id={name}
        disabled={props.isLoading?.[name]}
        className={` peer  rounded-sm border
         p-3 
        text-sm w-full
         focus:outline-none focus:border-accent
          ${props.error ? "border-red" : "border-default"}
          ${props.isLoading?.[name] ? "opacity-50 cursor-not-allowed" : ""}
        
    `}
        placeholder=" "
        // placeholder={placeholder}
        {...(props.register
          ? props.register(name, {
              onChange: (e) => {
                const value = e.target.value;
                setCharCount(value.length);
                props.onChange?.(name, value);
              },
            })
          : {})}
      />
      {props.floatingLabel && (
        <FloatingLabel
          name={name}
          floatingLabel={props.floatingLabel}
          required={required || false}
        />
      )}

      {/* <div className="mt-1 text-xs text-right">{charCount} / 2000</div> */}

      <InputError
        errorMsg={
          (props.error?.[name]?.message as string) ||
          (props.error as any)?.message ||
          (props.error?.[name] && props.error?.[name][0])
        }
      />
      {/* {props.isLoading?.[name] && <DataLoader size="sm" />} */}
    </div>
  );
};

export default TextareaField;
