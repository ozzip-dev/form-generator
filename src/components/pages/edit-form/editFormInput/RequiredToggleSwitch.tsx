"use client";

import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { useFormContext } from "react-hook-form";
import { toggleRequiredAction } from "@/actions/edit-form/editFormInput/toggleRequiredAction";
import { CheckboxGroupField, FullscreenLoader } from "@/components/shared";
import { startTransition, useActionState } from "react";

interface Props {
  input: FormInput;
}

export default function RequiredToggleSwitch(props: Props) {
  const formId = useSafeURLParam("formId");
  const { control } = useFormContext();

  const dataCheckboxOption = [
    {
      label: "Odpowiedż wymagana",
      value: props.input.required,
      name: "inputReqired",
    },
  ];

  const [state, switchToggle, isPending] = useActionState(async () => {
    if (!formId || !props.input.id) return;
    await toggleRequiredAction(formId, props.input.id);
  }, null);

  const handleSwitch = () => {
    startTransition(switchToggle);
  };

  return (
    <div className="flex gap-2 items-center mb-auto">
      {isPending && <FullscreenLoader />}
      <CheckboxGroupField
        name={`required`}
        control={control}
        options={dataCheckboxOption}
        onChangeAction={async (values) => {
          const requiredState = values.find(
            (value) => value.name === "inputReqired"
          )?.value;

          if (requiredState !== undefined) {
            handleSwitch();
          }
        }}
      />
    </div>
  );
}
