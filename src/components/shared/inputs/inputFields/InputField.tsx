import { UseFormRegister } from "react-hook-form";
import DataLoader from "../../loaders/DataLoader";
import InputError from "../InputError";

type Props = {
  inputData: {
    label?: string;
    name: string;
    placeholder?: string;
    type: string;
    description?: string;
    required?: boolean;
    dataAttribut?: string;
  };
  register?: UseFormRegister<any>;
  onChange?: (name: string, value: string, meta?: any) => void | Promise<void>;
  isLoading?: Record<string, boolean>;
  default?: Record<string, string>;
};

const InputField = (props: Props) => {
  const { name, placeholder, type, dataAttribut } = props.inputData;

  return (
    <div>
      <div className="flex">
        <input
          type={type}
          defaultValue={props.default ? props.default[name] : ""}
          disabled={props.isLoading?.[name]}
          className={`w-full border-b-2 border-gray-300 focus:border-accent focus:outline-none px-2 py-1
          ${props.isLoading?.[name] ? "opacity-50 cursor-not-allowed" : ""}
        `}
          placeholder={placeholder}
          {...(props.register && props.register(name))}
          onChange={(e) => {
            props.register && props.register(name).onChange(e);
            props.onChange?.(name, e.target.value);
          }}
          // {...(props.register
          //   ? props.register(name, {
          //       // onChange: (e) => props.onChange?.(name, e.target.value),
          //       onChange: (e) =>
          //         props.onChange?.(name, e.target.value, props.default),
          //     })
          //   : {})}
          name={name}
          data-input={dataAttribut}
        />

        {props.isLoading?.[name] && <DataLoader size="sm" />}
      </div>
    </div>
  );
};

export default InputField;
