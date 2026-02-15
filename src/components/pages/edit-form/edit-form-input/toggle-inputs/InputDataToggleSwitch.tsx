"use client";

import { InfoIcon } from "@/components/shared";
import CheckboxSwitch from "@/components/shared/inputs/checkbox-field/CheckboxSwitch";
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
  disabled?: boolean;
}

export default function InputDataToggleSwitch({
  input,
  formId,
  action,
  name,
  label,
  infoText,
  disabled,
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
    <div className="flex items-center text-sm">
      <CheckboxSwitch
        {...{ name, label, control, disabled }}
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
