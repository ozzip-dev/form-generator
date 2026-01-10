import { UseFormRegister } from "react-hook-form";
import DataLoader from "../../loaders/DataLoader";
import InputError from "../InputError";
import FloatingLabel from "./FloatingLabel";

type Props = {
  inputData: {
    label?: string;
    name: string;
    type: string;
    required?: boolean;
    dataAttribut?: string;
    placeholder?: string;
    defaultValue?: string;
  };
  register?: UseFormRegister<any>;
  onChange?: (name: string, value: string) => void;
  isLoading?: Record<string, boolean>;
  isSubmitting?: boolean;
  default?: Record<string, string>;
  error?: any;
  variant?: string;
  floatingLabel?: string;
};

const InputField = (props: Props) => {
  const { name, label, type, required, placeholder, defaultValue } =
    props.inputData;

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={props.floatingLabel ? " " : placeholder}
        defaultValue={defaultValue ?? ""}
        disabled={props.isLoading?.[name] || props.isSubmitting}
        aria-required={required}
        aria-invalid={!!props.error}
        aria-describedby={props.error ? `${name}-error` : undefined}
        className={`
         peer  rounded-sm border
         p-2 w-full
         focus:outline-none focus:border-accent
          ${props.error ? "border-red" : "border-default"}
          ${
            props.isLoading?.[name] || props.isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : ""
          }
        

        `}
        {...(props.register && props.register(name))}
        onChange={(e) => {
          props.register?.(name).onChange(e);
          props.onChange?.(name, e.target.value);
        }}
      />
      {props.floatingLabel && (
        <FloatingLabel
          name={name}
          floatingLabel={props.floatingLabel}
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
      />
    </div>
  );
};

export default InputField;
