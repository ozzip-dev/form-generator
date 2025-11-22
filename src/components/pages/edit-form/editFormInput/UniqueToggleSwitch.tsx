"use client";

import { toggleUniqueAction } from "@/actions/edit-form/editFormInput/toggleUniqueAction";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { startTransition, useActionState } from "react";
import { useFormContext } from "react-hook-form";
import { CheckboxGroupField, FullscreenLoader } from "../../../shared/index";

// TODO: zrobic wspolny komponent z RequiredToggleSwitch

interface Props {
  input: FormInput;
}

export default function UniqueToggleSwitch(props: Props) {
  const formId = useSafeURLParam("formId");
  const { control } = useFormContext();

  const dataCheckboxOption = [
    {
      label: "Unikalna wartość",
      value: props.input.unique,
      name: "inputUnique",
    },
  ];

  const [state, switchToggle, isPending] = useActionState(async () => {
    if (!formId || !props.input.id) return;
    await toggleUniqueAction(formId, props.input.id);
  }, null);

  const handleSwitch = () => {
    startTransition(switchToggle);
  };

  return (
    <div className="flex gap-2 items-center mb-auto">
      {isPending && <FullscreenLoader />}
      <CheckboxGroupField
        name={`unique`}
        control={control}
        options={dataCheckboxOption}
        onChangeAction={async (values) => {
          const uniqueState = values.find(
            (value) => value.name === "inputUnique"
          )?.value;

          if (uniqueState !== undefined) {
            handleSwitch();
          }
        }}
      />
    </div>
  );
}
