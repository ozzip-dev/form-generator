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
      <label htmlFor={props.name}>
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
        className="border px-2 py-1"
      />
    </>
  );
};

export default InputCheckboxOther;
