"use client";

import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { useFormContext } from "react-hook-form";
import { CheckboxGroupField, FullscreenLoader } from "../index";
import { toggleUniqueAction } from "@/actions/edit-form/editInput/toggleUniqueAction";

// TODO: zrobic wspolny komponent z RequiredToggleSwitch

interface Props {
  input: FormInput;
}

export default function UniqueToggleSwitch(props: Props) {
  const formId = useSafeURLParam("formId");
  const { control, trigger } = useFormContext();

  const dataCheckboxOption = [
    {
      label: "Unikalna wartość",
      value: props.input.unique,
      name: "inputUnique",
    },
  ];

  const { handleEdit, isLoading } = useEditForm({
    formId,
    inputId: props.input.id!,
    trigger,
    action: toggleUniqueAction,
    mode: "inputUnique",
  });

  const loadingForm = [...Object.values(isLoading ?? {})].some(Boolean);

  return (
    <div className="flex gap-2 items-center mb-auto">
      {loadingForm && <FullscreenLoader />}
      <CheckboxGroupField
        name={`unique`}
        control={control}
        options={dataCheckboxOption}
        onChangeAction={async (values) => {
          const uniqueState = values.find(
            (value) => value.name === "inputUnique"
          )?.value;

          if (uniqueState !== undefined) {
            handleEdit("unique", "true");
          }
        }}
      />
    </div>
  );
}
