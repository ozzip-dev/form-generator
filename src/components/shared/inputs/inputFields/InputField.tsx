// import { UseFormRegister } from "react-hook-form";
// import DataLoader from "../../loaders/DataLoader";

// type Props = {
//   inputData: {
//     label?: string;
//     name: string;
//     placeholder?: string;
//     type: string;
//     description?: string;
//     required?: boolean;
//     dataAttribut?: string;
//   };
//   register?: UseFormRegister<any>;
//   onChange?: (name: string, value: string, meta?: any) => void | Promise<void>;
//   isLoading?: Record<string, boolean>;
//   default?: Record<string, string>;
// };

// const InputField = (props: Props) => {
//   const { name, placeholder, type, dataAttribut } = props.inputData;

//   return (
//     <div>
//       <div className="flex">
//         <input
//           is={name}
//           type={type}
//           defaultValue={props.default ? props.default[name] : ""}
//           disabled={props.isLoading?.[name]}
//           className={`text-sm w-full border rounded-sm focus:border-accent focus:outline-none p-3
//           ${props.isLoading?.[name] ? "opacity-50 cursor-not-allowed" : ""}

//         `}
//           // placeholder={placeholder}
//           placeholder=""
//           {...(props.register && props.register(name))}
//           onChange={(e) => {
//             props.register && props.register(name).onChange(e);
//             props.onChange?.(name, e.target.value);
//           }}
//           // {...(props.register
//           //   ? props.register(name, {
//           //       // onChange: (e) => props.onChange?.(name, e.target.value),
//           //       onChange: (e) =>
//           //         props.onChange?.(name, e.target.value, props.default),
//           //     })
//           //   : {})}
//           name={name}
//           data-input={dataAttribut}
//         />

//         <label
//           htmlFor={name}
//           className={`
//           pointer-events-none absolute left-3 top-4
//           origin-left text-base text-font_light
//           transition-all duration-200

//           peer-placeholder-shown:top-4
//           peer-placeholder-shown:text-base

//           peer-focus:top-1
//           peer-focus:text-xs
//           peer-focus:text-accent

//           peer-not-placeholder-shown:top-1
//           peer-not-placeholder-shown:text-xs
//         `}
//         >
//           aaaa
//         </label>

//         {props.isLoading?.[name] && <DataLoader size="sm" />}
//       </div>
//     </div>
//   );
// };

// export default InputField;

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
  const { name, label, type, required } = inputData;

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        placeholder=" "
        defaultValue={defaultValues?.[name] ?? ""}
        disabled={isLoading?.[name]}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`
         peer  rounded-sm border
         p-3 
      w-full
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
