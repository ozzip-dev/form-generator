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
    <div>
      {props.label && (
        <label htmlFor={props.name} className="block">
          {props.label}
        </label>
      )}

      <input
        id={props.name}
        type="text"
        aria-label={`Enter other ${props.label || props.name}: e.g. 'Other option', 'Custom response'`}
        placeholder="Inna odpowiedź"
        disabled={props.isSubmitting}
        value={inputValue}
        onChange={(e) => {
          props.onChange({
            ...props.selectedValues,
            [props.name]: e.target.value,
          });
        }}
        className={`w-full rounded-sm border p-3 focus:border-accent focus:outline-none ${props.isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
      />
    </div>
  );
};

export default InputCheckboxOther;
