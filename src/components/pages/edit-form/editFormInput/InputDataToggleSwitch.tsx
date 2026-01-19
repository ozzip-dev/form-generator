"use client";

import { InfoIcon } from "@/components/shared";
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

      {infoText && (
        <InfoIcon>
          <div>{infoText}</div>
        </InfoIcon>
      )}
    </div>
  );
}
