import { UseFormRegister } from "react-hook-form";
import DataLoader from "../../loaders/DataLoader";
import InputError from "../InputError";
import FloatingLabel from "./FloatingLabel";
import { InputData } from "@/enums";

type Props = {
  inputData: InputData;
  register?: UseFormRegister<any>;
  onChange?: (name: string, value: string) => void;
  isLoading?: Record<string, boolean>;
  isSubmitting?: boolean;
  default?: Record<string, string>;
  error?: any;
  variant?: string;
};

const InputField = (props: Props) => {
  const { name, floatingLabel, type, required, placeholder, defaultValue } =
    props.inputData;
  const inputDefaultValue = props.default?.[name] ?? defaultValue ?? "";

  return (
    <div className={`relative flex-1`}>
      <input
        id={name}
        name={name}
        type={type}
        aria-label={`${floatingLabel || name}`}
        placeholder={floatingLabel ? " " : placeholder}
        defaultValue={inputDefaultValue}
        disabled={props.isLoading?.[name] || props.isSubmitting}
        aria-required={required}
        aria-invalid={!!props.error}
        aria-describedby={props.error ? `${name}-error` : undefined}
        className={`peer w-full rounded-sm border p-2 focus:border-accent focus:outline-none ${props.error ? "border-red" : "border-default"} ${
          props.isLoading?.[name] || props.isSubmitting
            ? "cursor-not-allowed opacity-50"
            : ""
        } `}
        {...(props.register && props.register(name))}
        onChange={(e) => {
          props.register?.(name).onChange(e);
          props.onChange?.(name, e.target.value);
        }}
      />
      {floatingLabel && (
        <FloatingLabel
          name={name}
          floatingLabel={floatingLabel}
          required={required || false}
        />
      )}

      {props.isLoading?.[name] && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <DataLoader size="sm" />
        </div>
      )}
      <InputError
        errorMsg={
          (props.error?.[name]?.message as string) ||
          (props.error as any)?.message ||
          (props.error?.[name] && props.error?.[name][0])
        }
        nameId={name}
      />
    </div>
  );
};

export default InputField;
