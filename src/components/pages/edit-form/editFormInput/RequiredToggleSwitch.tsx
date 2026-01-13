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

      <div className="relative group">
        <Icon
          icon="info-circle"
          size={20}
          className="group"
          color="var(--color-accent)"
        />
        <div
          className="absolute text-sm right-[50%] bottom-[100%] p-2 
            w-[20rem]
         bg-bg_dark text-xs
         rounded rounted-sm border opacity-0 
         group-hover:opacity-100 transition-opacity"
        >
          Bez zaznaczenia tej odpowiedzi obublikowany formularz nie zostanie
          wysłany
        </div>
      </div>
    </div>
  );
}
