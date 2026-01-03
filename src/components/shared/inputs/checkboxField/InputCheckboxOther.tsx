import InputField from "../inputFields/InputField";

type Props = {
  label?: string;
  name: string;
  selectedValues: Record<string, boolean | string>;
  onChange: (value: Record<string, boolean | string>) => void;
};

const InputCheckboxOther = (props: Props) => {
  const rawValue = props.selectedValues[props.name];
  const inputValue = typeof rawValue === "string" ? rawValue : "";

  return (
    <>
      <label htmlFor={props.name} className="font-bold">
        {props.label ? props.label : props.name}
      </label>

      <input
        id={props.name}
        type="text"
        placeholder="Inna odpowiedź"
        value={inputValue}
        onChange={(e) => {
          props.onChange({
            ...props.selectedValues,
            [props.name]: e.target.value,
          });
        }}
        className="rounded-sm border p-3 focus:outline-none focus:border-accent"
      />
    </>
  );
};

export default InputCheckboxOther;
