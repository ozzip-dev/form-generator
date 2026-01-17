"use client";

import { Icon } from "@/components/shared";
import CheckboxSwitch from "@/components/shared/inputs/checkboxField/CheckboxSwitch";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { FormInput } from "@/types/input";
import { useTransition } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  input: FormInput;
  formId: string;
  action: (formIdString: string, inputId: string) => Promise<void>;
  name: string;
  label: string;
  infoText?: string;
}

export default function InputDataToggleSwitch({
  input,
  formId,
  action,
  name,
  label,
  infoText,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const { control } = useFormContext();

  useAutoLoader(isPending);

  const handleSwitch = () => {
    startTransition(async () => {
      if (!formId || !input.id) return;
      await action(formId, input.id);
    });
  };

  return (
    <div className="text-sm flex items-center gap-2">
      <CheckboxSwitch
        {...{ name, label, control }}
        onChangeAction={handleSwitch}
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
            {infoText}
          </div>
        </div>
      </div>
    </div>
  );
}
