"use client";

import { toggleUniqueAction } from "@/actions/edit-form/editFormInput/toggleUniqueAction";
import { Icon } from "@/components/shared";
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
    <div className="text-sm flex items-center gap-2">
      <CheckboxSwitch
        label="Odpowiedź jednorazowa"
        name={`unique`}
        control={control}
        onChangeAction={async () => {
          handleSwitch();
        }}
      />

      <div className="relative group">
        <Icon
          icon="info-circle"
          size={20}
          className="group"
          color="var(--color-accent)"
        />
        <div
          className="absolute text-sm right-[50%] top-[100%] p-2 
            w-[20rem]
         bg-bg_dark text-xs
         rounded rounted-sm border opacity-0 
         group-hover:opacity-100 transition-opacity"
        >
          Taką samą odpowiedź będzie można wysłać tylko raz
        </div>
      </div>
    </div>
  );
}
