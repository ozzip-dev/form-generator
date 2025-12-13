"use client";

import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { useFormContext } from "react-hook-form";
import { toggleRequiredAction } from "@/actions/edit-form/editFormInput/toggleRequiredAction";
import { CheckboxGroupField, FullscreenLoader } from "@/components/shared";
import { startTransition, useActionState } from "react";
import CheckboxSwitch from "@/components/shared/inputs/CheckboxSwitch";

interface Props {
  input: FormInput;
}

export default function RequiredToggleSwitch(props: Props) {
  const formId = useSafeURLParam("formId");
  const { control } = useFormContext();

  const dataCheckboxOption = [
    {
      checkboxLabel: "Odpowiedż wymagana",
      value: props.input.required,
      name: "inputReqired",
    },
  ];

  const [_, switchToggle, isPending] = useActionState(async () => {
    if (!formId || !props.input.id) return;

    await toggleRequiredAction(formId, props.input.id);
  }, null);

  const handleSwitch = () => {
    startTransition(switchToggle);
  };

  return (
    <div className="flex gap-2 items-center mb-auto">
      {isPending && <FullscreenLoader />}

      <CheckboxSwitch
        label={"Odpowiedż wymagana"}
        name={`required`}
        control={control}
        onChangeAction={async () => {
          handleSwitch();
        }}
      />
    </div>
  );
}
