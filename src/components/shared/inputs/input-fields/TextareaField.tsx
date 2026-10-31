import { UseFormRegister } from "react-hook-form";
import InputError from "../InputError";
import { InputData } from "@/enums";

type Props = {
  inputData: InputData;
  register?: UseFormRegister<any>;
  onChange?: (name: string, value: string, meta?: any) => void | Promise<void>;
  isLoading?: Record<string, boolean>;
  default?: Record<string, string>;
  error?: any;
  label?: string;
};

const TextareaField = (props: Props) => {
  const { name, placeholder, type, required, label } = props.inputData;
  const defaultValue = props.default?.[name] ?? "";

  return (
    <div className="relative flex-1">
      <textarea
        id={name}
        aria-label={`Wpisz ${label}`}
        aria-required={required}
        aria-invalid={!!props.error}
        aria-describedby={props.error ? `${name}-error` : undefined}
        disabled={props.isLoading?.[name]}
        className={`peer w-full rounded-sm border border-gray p-3 text-sm focus:border-accent focus:outline-none ${props.isLoading?.[name] ? "cursor-not-allowed opacity-50" : ""} `}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...(props.register
          ? props.register(name, {
              onChange: (e) => {
                const value = e.target.value;
                props.onChange?.(name, value);
              },
            })
          : {})}
      />

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

export default TextareaField;
