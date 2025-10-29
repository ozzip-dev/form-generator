"use client";

import { useController, Control, FieldValues, Path } from "react-hook-form";

type CheckboxOption = {
  label: string;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: CheckboxOption[];
  className?: string;
  onChangeAction?: (values: boolean[]) => void;
};

export const CheckboxField = <T extends FieldValues>(props: Props<T>) => {
  const {
    field: { value = [], onChange },
  } = useController({
    name: props.name,
    control: props.control,
  });

  const selectedValues = (value as boolean[]) || [];

  const handleToggle = (index: number) => {
    const updated = [...selectedValues];
    updated[index] = !updated[index];
    onChange(updated);
    props.onChangeAction?.(updated);
  };

  return (
    <div className={`flex flex-col gap-3 ${props.className ?? ""}`}>
      {props.options.map((option, index) => (
        <label key={index} className="flex items-center gap-3 cursor-pointer">
          <div className="relative inline-block w-12 h-6">
            <input
              type="checkbox"
              checked={selectedValues[index] || false}
              onChange={() => handleToggle(index)}
              className="peer sr-only"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
          </div>
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
