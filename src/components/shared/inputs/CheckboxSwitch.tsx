import { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import { az } from "zod/v4/locales";

type Props = {
  label?: string;
  name: string;
  control: any;
  onChangeAction?: (
    values?: { name: string; value: boolean | string }[],
  ) => void;
};

const CheckboxSwitch = (props: Props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => {
        console.log("field.value", field.value);

        const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
          field.onChange(e.target.checked);
          props.onChangeAction?.();
          return;
        };

        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={field.value}
                onChange={handleToggle}
                className="peer sr-only"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
            </div>

            <span className="text-sm">{props.label}</span>
          </label>
        );
      }}
    />
  );
};

export default CheckboxSwitch;
