import { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import Checkbox from "./Checkbox";

type Props = {
  label?: string;
  name: string;
  control: any;
  onChangeAction?: () => void;
};

const CheckboxSwitch = (props: Props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => {
        const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
          field.onChange(e.target.checked);
          props.onChangeAction?.();
          return;
        };

        return (
          <Checkbox
            checkboxLabel={props.label}
            name={props.name}
            checkedValue={field.value}
            onChange={handleToggle}
          />
        );
      }}
    />
  );
};

export default CheckboxSwitch;
