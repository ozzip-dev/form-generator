import InputField from "../input-fields/InputField";

type Props = {
  label?: string;
  name: string;
  selectedValues: Record<string, boolean | string>;
  onChange: (value: Record<string, boolean | string>) => void;
  isSubmitting?: boolean;
};

const InputCheckboxOther = (props: Props) => {
  const rawValue = props.selectedValues[props.name];
  const inputValue = typeof rawValue === "string" ? rawValue : "";

  return (
    <>
      {/* <label htmlFor={props.name} className="block">
        {props.label ? props.label : props.name}
      </label> */}

      <input
        id={props.name}
        type="text"
        placeholder="Inna odpowiedź"
        disabled={props.isSubmitting}
        value={inputValue}
        onChange={(e) => {
          props.onChange({
            ...props.selectedValues,
            [props.name]: e.target.value,
          });
        }}
        className={`rounded-sm border p-3 
        focus:outline-none focus:border-accent w-full   
        ${props.isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      />
    </>
  );
};

export default InputCheckboxOther;
