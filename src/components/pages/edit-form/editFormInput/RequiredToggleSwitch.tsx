"use client";

import { toggleRequiredAction } from "@/actions/edit-form/editFormInput/toggleRequiredAction";
import { FullscreenLoader } from "@/components/shared";
import CheckboxSwitch from "@/components/shared/inputs/checkboxField/CheckboxSwitch";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { startTransition, useActionState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  input: FormInput;
}

export default function RequiredToggleSwitch(props: Props) {
  const formId = useSafeURLParam("formId");
  const { control } = useFormContext();

  const [_, switchToggle, isPending] = useActionState(async () => {
    if (!formId || !props.input.id) return;
    await toggleRequiredAction(formId, props.input.id);
  }, null);

  useAutoLoader(isPending);

  const handleSwitch = () => {
    startTransition(switchToggle);
  };

  return (
    <div className="text-sm">
      <CheckboxSwitch
        label="Odpowiedź wymagana"
        name={`required`}
        control={control}
        onChangeAction={async () => {
          handleSwitch();
        }}
      />
    </div>
  );
}
