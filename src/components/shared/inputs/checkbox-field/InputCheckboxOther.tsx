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
    <div className="group gap-3 md:flex md:items-center">
      {props.label && (
        <label
          htmlFor={props.name}
          className="block pb-1 !text-base transition-colors duration-200 group-focus-within:text-accent md:pb-0"
        >
          {props.label}
        </label>
      )}

      <input
        id={props.name}
        type="text"
        aria-label={`Podaj inną odpowiedź ${props.label || props.name}`}
        placeholder="Inna odpowiedź"
        disabled={props.isSubmitting}
        value={inputValue}
        onChange={(e) => {
          props.onChange({
            ...props.selectedValues,
            [props.name]: e.target.value,
          });
        }}
        className="rounded-sm border border-gray p-3 focus:border-accent focus:outline-none"
      />
    </div>
  );
};

export default InputCheckboxOther;
