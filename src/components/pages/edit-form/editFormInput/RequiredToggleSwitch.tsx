"use client";

import { toggleRequiredAction } from "@/actions/edit-form/editFormInput/toggleRequiredAction";
import { Icon } from "@/components/shared";
import CheckboxSwitch from "@/components/shared/inputs/checkboxField/CheckboxSwitch";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { useTransition } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  input: FormInput;
}

export default function RequiredToggleSwitch(props: Props) {
  const formId = useSafeURLParam("formId");
  const [isPending, startTransition] = useTransition();
  const { control } = useFormContext();

  useAutoLoader(isPending);

  const handleSwitch = () => {
    startTransition(async () => {
      if (!formId || !props.input.id) return;
      await toggleRequiredAction(formId, props.input.id);
    });
  };

  return (
    <div className="text-sm flex items-center gap-2">
      <CheckboxSwitch
        label="Odpowiedź wymagana"
        name={`required`}
        control={control}
        onChangeAction={async () => {
          handleSwitch();
        }}
      />

      <div className="relative">
        <div className="group inline-block">
          <Icon
            icon="info-circle"
            size={20}
            className="cursor-pointer"
            color="var(--color-accent)"
          />

          <div
            className="
          absolute 
          bottom-full sm:-bottom-1/2 lg:bottom-full
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
            Bez wypełnienia pola formularz nie zostanie wysłany
          </div>
        </div>
      </div>
    </div>
  );
}
