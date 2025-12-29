import { UseFormRegister } from "react-hook-form";
import DataLoader from "../../loaders/DataLoader";

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
};

const TextareaField = (props: Props) => {
  const { name, placeholder, type } = props.inputData;
  return (
    <div className="flex">
      <textarea
        id={name}
        disabled={props.isLoading?.[name]}
        className={`w-full border-b-2 border-gray-300 focus:border-accent focus:outline-none px-2 py-1
      ${props.isLoading?.[name] ? "opacity-50 cursor-not-allowed" : ""}
    `}
        placeholder={placeholder}
        {...(props.register
          ? props.register(name, {
              onChange: (e) => props.onChange?.(name, e.target.value),
            })
          : {})}
      />
      {/* {props.isLoading?.[name] && <DataLoader size="sm" />} */}
    </div>
  );
};

export default TextareaField;
