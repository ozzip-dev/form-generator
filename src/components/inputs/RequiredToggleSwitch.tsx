"use client";

import { ToggleRequired } from "@/actions/input/ToggleRequired";
import { FormInput } from "@/types/input";
import { useParams } from "next/navigation";
import { CheckboxField } from "./CheckboxField";
import { useFormContext } from "react-hook-form";

interface Props {
  input: FormInput;
}

export default function RequiredToggleSwitch(props: Props) {
  const { formId } = useParams();
  const { control, watch } = useFormContext();

  const selectedValues = watch("inputSettings");
  // console.log("", props.input);

  const dataChecboxOption = [
    {
      label: "Odpowiedż wymagana?",
      value: props.input.required,
      name: "required",
    },
  ];

  return (
    <div className="flex gap-2 items-center">
      <CheckboxField
        name={props.input.id!}
        control={control}
        options={[{ label: "Odpowiedż wymagana" }]}
        onChangeAction={async (vals) => {
          console.log("", props.input);
          console.log("Zmieniono:", vals);
          await ToggleRequired(formId as string, props.input.id!);
        }}
      />

      {/* <CheckboxField
        name={props.input.id!}
        control={control}
        options={dataChecboxOption}
        onChangeAction={(values) => {
          console.log("", props.input);
          console.log("Nowe:", values);
        }}
      /> */}

      {/* <div>Required</div>
      <input
        type="checkbox"
        checked={props.input.required}
        onChange={handleToggle}
      /> */}
    </div>
  );
}
