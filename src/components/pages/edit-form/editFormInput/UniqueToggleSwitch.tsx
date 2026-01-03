"use client";

import { toggleUniqueAction } from "@/actions/edit-form/editFormInput/toggleUniqueAction";
import CheckboxSwitch from "@/components/shared/inputs/checkboxField/CheckboxSwitch";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { startTransition, useActionState } from "react";
import { useFormContext } from "react-hook-form";
import { FullscreenLoader } from "../../../shared/index";

// TODO: zrobic wspolny komponent z RequiredToggleSwitch

interface Props {
  input: FormInput;
}

export default function UniqueToggleSwitch(props: Props) {
  const formId = useSafeURLParam("formId");
  const { control } = useFormContext();

  const [_, switchToggle, isPending] = useActionState(async () => {
    if (!formId || !props.input.id) return;
    await toggleUniqueAction(formId, props.input.id);
  }, null);

  const handleSwitch = () => {
    startTransition(switchToggle);
  };

  return (
    <div className="flex gap-2 items-center mb-auto text-sm">
      {isPending && <FullscreenLoader />}

      <CheckboxSwitch
        label="Odpowiedź unikalna"
        name={`unique`}
        control={control}
        onChangeAction={async () => {
          handleSwitch();
        }}
      />
    </div>
  );
}
