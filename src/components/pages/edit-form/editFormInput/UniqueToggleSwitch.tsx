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
          className="
           absolute 
           top-full sm:-top-1/2 lg:top-full
           left-1/2 sm:left-[120%] lg:left-1/2
           -translate-x-1/2 sm:translate-x-0 lg:-translate-x-1/2
           w-[20rem]
           bg-bg_dark  text-xs
           p-2 rounded-sm border
           transition-opacity
           pointer-events-none
           z-50
            opacity-0 group-hover:opacity-100 
         "
        >
          Odpowiedź może zostać wysłana tylko jeden raz
        </div>
      </div>
    </div>
  );
}
