import InputIndicators from "./InputIndicators";
import InputDescription from "./FormDescription";

type Props = {
  label?: string;
  description?: string;
  name?: string;
  required?: boolean;
  unique?: boolean;
  hidden?: boolean;
};

const InputLabel = ({
  label,
  description,
  name,
  required,
  unique,
  hidden,
}: Props) => {
  const hasLabel = !!label;
  const hasDescription = !!description;

  return (
    <div>
      {hasLabel && (
        <label
          htmlFor={name}
          className="block pb-1 pl-3 transition-colors duration-200 group-focus-within:text-accent"
        >
          {label}
          <span className="inline-flex align-super text-sm">
            <InputIndicators {...{ required, unique, hidden }} />
          </span>
        </label>
      )}

      {hasDescription && (
        <InputDescription description={description} variant="published" />
      )}
    </div>
  );
};

export default InputLabel;
