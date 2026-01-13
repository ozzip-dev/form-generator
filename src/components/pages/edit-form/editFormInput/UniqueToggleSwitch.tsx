"use client";

import { toggleUniqueAction } from "@/actions/edit-form/editFormInput/toggleUniqueAction";
import CheckboxSwitch from "@/components/shared/inputs/checkboxField/CheckboxSwitch";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { useTransition } from "react";
import { useFormContext } from "react-hook-form";

// TODO: zrobic wspolny komponent z RequiredToggleSwitch

interface Props {
  input: FormInput;
}

export default function UniqueToggleSwitch(props: Props) {
  const formId = useSafeURLParam("formId");
  const [isPending, startTransition] = useTransition();
  const { control } = useFormContext();

  useAutoLoader(isPending);

  const handleSwitch = () => {
    startTransition(async () => {
      if (!formId || !props.input.id) return;
      await toggleUniqueAction(formId, props.input.id);
    });
  };

  return (
    <div className="text-sm">
      <CheckboxSwitch
        label="Odpowiedź jednorazowa"
        name={`unique`}
        control={control}
        onChangeAction={async () => {
          handleSwitch();
        }}
      />
    </div>
  );
}
