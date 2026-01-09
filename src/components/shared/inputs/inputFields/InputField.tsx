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
  };
  register?: UseFormRegister<any>;
  onChange?: (name: string, value: string) => void;
  isLoading?: Record<string, boolean>;
  default?: Record<string, string>;
  error?: any;
  variant?: string;
  floatingLabel?: string;
};

const InputField = ({
  inputData,
  register,
  onChange,
  isLoading,
  default: defaultValues,
  error,
  variant,
  floatingLabel,
}: Props) => {
  const { name, label, type, required, placeholder } = inputData;

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={floatingLabel ? " " : placeholder}
        defaultValue={defaultValues?.[name] ?? ""}
        disabled={isLoading?.[name]}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`
         peer  rounded-sm border
         p-2 w-full
         focus:outline-none focus:border-accent
          ${error ? "border-red" : "border-default"}
          ${isLoading?.[name] ? "opacity-50 cursor-not-allowed" : ""}
        

        `}
        {...(register && register(name))}
        onChange={(e) => {
          register?.(name).onChange(e);
          onChange?.(name, e.target.value);
        }}
      />
      {floatingLabel && (
        <FloatingLabel
          name={name}
          floatingLabel={floatingLabel}
          required={required || false}
        />
      )}

      {isLoading?.[name] && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <DataLoader size="sm" />
        </div>
      )}
      <InputError
        errorMsg={
          (error?.[name]?.message as string) ||
          (error as any)?.message ||
          (error?.[name] && error?.[name][0])
        }
      />
    </div>
  );
};

export default InputField;
