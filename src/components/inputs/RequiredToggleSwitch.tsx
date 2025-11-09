"use client";

import { ToggleRequiredAction } from "@/actions/edit-form/ToggleRequiredAction";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { useFormContext } from "react-hook-form";
import { CheckboxGroupField } from "./CheckboxGroupField";
import { FullscreenLoader } from "../shared";

interface Props {
  input: FormInput;
}

export default function RequiredToggleSwitch(props: Props) {
  const formId = useSafeURLParam("formId");
  const { control, trigger } = useFormContext();

  const dataCheckboxOption = [
    {
      label: "Odpowiedż wymagana",
      value: props.input.required,
      name: "inputReqired",
    },
  ];

  const { handleEdit, isLoading } = useEditForm({
    formId,
    inputId: props.input.id!,
    trigger,
    action: ToggleRequiredAction,
    mode: "inputReqired",
  });

  const loadingForm = [...Object.values(isLoading ?? {})].some(Boolean);

  return (
    <div className="flex gap-2 items-center mb-auto">
      {loadingForm && <FullscreenLoader />}
      <CheckboxGroupField
        name={`inputSettings.${props.input.id}.required`}
        control={control}
        options={dataCheckboxOption}
        onChangeAction={async (values) => {
          const requiredState = values.find(
            (value) => value.name === "inputReqired"
          )?.value;

          if (requiredState !== undefined) {
            handleEdit("required", "true");
          }
        }}
      />
    </div>
  );
}
